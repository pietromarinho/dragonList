import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import addDragon from '../../assets/images/icons/add-dragon.svg';
import pencilOutline from '../../assets/images/icons/pencil-outline.svg';
import trash from '../../assets/images/icons/trash.svg';
import eye from '../../assets/images/icons/eye.svg';
import api from '../../services/api';
import './style.css';
import { isAuthenticated } from '../../auth';

interface DragonsData {
    id: number;
    name: string;
    type: string;
}

function DragonsList() {

    const [dragons, setDragons] = useState([]);
    const history = useHistory();

    function deleteDragon(id: Number) {
        isAuthenticated &&
            api.delete(`${id}`).then(
                () => {
                    alert('Dragão deletado');
                    getDragons();
                }).catch(() => {
                    alert('Algo deu errado');
                })
    }

    function getDragons() {
        api.get('').then(
            success => {
                const orderedList = success.data.sort((dA: DragonsData, dB: DragonsData) => (dA.name.toLowerCase() < dB.name.toLowerCase()) ? -1 : 1);
                setDragons(orderedList);
            })
    }

    function goToForm(id?: number, detail?: boolean) {
        if (id && detail) {
            history.push(`/dragon-form/details/${id}`);
        } else if (id && !detail) {
            history.push(`/dragon-form/${id}`);
        } else {
            history.push(`/dragon-form`);
        }
    }

    useEffect(() => {
        getDragons();
    }, []);

    return (
        <div id="dragon-list" className="container">
            <header className="page-header">
                <div className="header-content">
                    <strong> Lista de Dragões </strong>

                    <button type="button" title="Adicionar dragão" onClick={() => goToForm()}>
                        <img src={addDragon} alt="+ Dragão" />
                    </button>
                </div>
            </header>

            <main>
                {dragons.length > 0 ? (
                    <ul>
                        <li className="li-header">
                            <h5> Nome </h5>

                            <h5> Tipo </h5>

                            <h5> Ações </h5>
                        </li>
                        {dragons.map((dragon: DragonsData) => (
                            <li key={dragon.id}>
                                <h2>
                                    {dragon.name}
                                </h2>
                                <h2>
                                    {dragon.type}
                                </h2>
                                <div className="acoes">
                                    <button type="button" title="Editar" onClick={() => goToForm(dragon.id)}>
                                        <img src={pencilOutline} alt="Editar" />
                                    </button>

                                    <button type="button" title="Detalhes" onClick={() => goToForm(dragon.id, true)}>
                                        <img src={eye} alt="Editar" />
                                    </button>

                                    <button type="button" title="Excluir" onClick={() => deleteDragon(dragon.id)}>
                                        <img src={trash} alt="Excluir" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                        <h1 className="empty-list"> Não há registros</h1>
                    )
                }
            </main>
        </div>
    );
}

export default DragonsList;