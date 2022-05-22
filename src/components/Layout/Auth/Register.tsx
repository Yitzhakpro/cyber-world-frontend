import React, { useState } from 'react';
import { Input } from '../../../utilComponents';

function Register(): JSX.Element {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(email, username, password);
    };

    return (
        <form onSubmit={handleRegister}>
            <span>email:</span>
            <Input value={email} onChange={handleEmailChange} />

            <span>username:</span>
            <Input value={username} onChange={handleUsernameChange} />

            <span>password:</span>
            <Input value={password} onChange={handlePasswordChange} />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
