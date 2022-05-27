import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';

interface IAuthPageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthPage(props: IAuthPageProps): JSX.Element {
    const { setLoggedIn } = props;
    const [inRegister, setInRegister] = useState(false);

    const handleChangeRegisterMode = (): void => {
        setInRegister((prevRegMode) => !prevRegMode);
    };

    return (
        <div>
            Auth Page
            {inRegister ? <Register setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />}
            <button type="button" onClick={handleChangeRegisterMode}>
                {inRegister ? 'If you have an account, click here to login' : 'Click here to create an account'}
            </button>
        </div>
    );
}

export default AuthPage;
