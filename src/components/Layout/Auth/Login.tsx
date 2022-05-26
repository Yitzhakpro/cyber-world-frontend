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
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (): void => {
        setRememberMe((prevCheck) => !prevCheck);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Auth.login(email, password, rememberMe)
            .then((res) => setLoggedIn(true))
            .catch((err) => setLoggedIn(false)); // TODO: add toast error
    };

    return (
        <form onSubmit={handleLogin}>
            <span>email:</span>
            <Input value={email} onChange={handleEmailChange} />

            <span>password:</span>
            <Input value={password} onChange={handlePasswordChange} />

            <span>Remember me</span>
            <Input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
