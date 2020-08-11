import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import Input from '../../comonents/Input';
import { setAuthenticated } from '../../auth';


function Login() {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, []);

    function doLogin() {
        if (userName === 'admin' && password === 'root') {
            setAuthenticated(true);
            history.push('/dragon-list');
        } else {
            alert('Usuário ou Senha inválidos!')
        }
    }

    return (
        <div id="login-form" className="container">
            <main>
                <form onSubmit={doLogin}>

                    <Input
                        inputName="userName"
                        inputLabel="Usuário"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    ></Input>
                    <Input
                        inputName="password"
                        inputLabel="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></Input>

                    <footer>
                        <button type="submit">
                            Login
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default Login;