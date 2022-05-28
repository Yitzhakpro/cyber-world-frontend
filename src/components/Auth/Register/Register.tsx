import React, { useState } from 'react';
import { Input } from '../../../utilComponents';
import { Auth } from '../../../services';

interface IRegisterProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register(props: IRegisterProps): JSX.Element {
    const { setLoggedIn } = props;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(new Date().toISOString().slice(0, 10));

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBirthDate(e.target.value);
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Auth.register(email, username, birthDate, password)
            .then((res) => setLoggedIn(true))
            .catch((err) => setLoggedIn(false)); // TODO: add toast error
    };

    return (
        <form autoComplete="off" onSubmit={handleRegister}>
            <span>email:</span>
            <Input type="email" required value={email} onChange={handleEmailChange} />

            <span>username:</span>
            <Input value={username} required onChange={handleUsernameChange} />

            <span>password:</span>
            <Input type="password" required value={password} onChange={handlePasswordChange} />

            <span>Birth Date:</span>
            <Input type="date" required value={birthDate} onChange={handleBirthDateChange} />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
