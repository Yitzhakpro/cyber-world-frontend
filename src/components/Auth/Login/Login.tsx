import React, { useState } from 'react';
import { Input } from '../../../utilComponents';
import { Auth } from '../../../services';

interface ILoginProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login(props: ILoginProps): JSX.Element {
    const { setLoggedIn } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Auth.login(email, password)
            .then((res) => setLoggedIn(true))
            .catch((err) => setLoggedIn(false)); // TODO: add toast error
    };

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-section">
                <span>Email:</span>
                <Input type="email" required value={email} onChange={handleEmailChange} />
            </div>

            <div className="auth-section">
                <span>Password:</span>
                <Input type="password" required value={password} onChange={handlePasswordChange} />
            </div>

            <button className="auth-submit" type="submit">
                Login
            </button>
        </form>
    );
}

export default Login;
