import React, { useState } from 'react';
import { Input } from '../../../utilComponents';

function Login(): JSX.Element {
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
        console.log(email, password);
    };

    return (
        <form onSubmit={handleLogin}>
            <span>email:</span>
            <Input value={email} onChange={handleEmailChange} />
            <span>password:</span>
            <Input value={password} onChange={handlePasswordChange} />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
