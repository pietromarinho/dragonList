import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../comonents/Input';
import api from '../../services/api';
import './style.css';
import moment from 'moment';
import 'moment/locale/pt-br';


function DragonsForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [title, setTitle] = useState('Cadastro');

    function creatOrUpdate(e: FormEvent): void {
        e.preventDefault();
        if (!edit) {
            api.post('', {
                name,
                type
            }).then(() => {
                alert('Dragão cadastrado com sucesso');
                history.push('/');
            }).catch(() => {
                alert('Erro ao realizar cadastro');
            })
        } else {
            api.put(`${id}`, {
                name,
                type
            }).then(() => {
                alert('Dragão alterado com sucesso');
                history.push('/');
            }).catch(() => {
                alert('Erro ao realizar alteração');
            })
        }
    }

    function returnScreen(): void {
        history.push('/')
    }

    function getDragon(id: number): void {
        api.get(`${id}`).then(
            success => {
                setName(success.data.name);
                setType(success.data.type);
                setCreationDate(success.data.createdAt);
            })
    }

    useEffect(() => {
        const last = window.location.href.split('/');
        const id: any = window.location.href.split('/')[last.length - 1];
        const details: boolean = window.location.href.split('/')[last.length - 2] === 'details';
        if (details && id) {
            setShowDetails(details);
            getDragon(id);
            setTitle('Detalhes');
        } else if (id && !isNaN(id)) {
            setEdit(true);
            setId(id);
            getDragon(id);
            setTitle('Edição');
        }
    }, []);

    return (
        <div id="dragon-form" className="container">
            <header className="page-header">
                <div className="header-content">
                    <strong>  {title} </strong>
                </div>
            </header>

            <main>
                <form onSubmit={creatOrUpdate}>
                    <fieldset>
                        <legend> Dados do dragão </legend>

                        <Input
                            inputName="name"
                            inputLabel="Nome"
                            readOnly={showDetails}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        ></Input>
                        <Input
                            inputName="type"
                            inputLabel="Tipo"
                            readOnly={showDetails}
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value)
                            }}
                        ></Input>
                        {showDetails &&
                            <Input
                                inputName="creationDate"
                                inputLabel="Data de criação"
                                readOnly={showDetails}
                                value={moment(creationDate).format('LLLL')}
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}
                            ></Input>
                            // <Moment date={creationDate}></Moment>
                        }
                    </fieldset>

                    <footer>
                        <button className="btn-cancelar" type="button" onClick={() => returnScreen()}>
                            {showDetails ? 'Voltar' : 'Cancelar'}
                        </button>
                        {!showDetails &&
                            <button type="submit">
                                {edit ? 'Alterar' : 'Salvar'}
                            </button>
                        }

                    </footer>
                </form>
            </main>
        </div>
    );
}

export default DragonsForm;