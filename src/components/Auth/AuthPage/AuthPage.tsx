import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import './authPage.css';

interface IAuthPageProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthPage(props: IAuthPageProps): JSX.Element {
    const { setLoggedIn } = props;
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    const handleLoginSelect = (): void => {
        setAuthMode('login');
    };

    const handleRegisterSelect = (): void => {
        setAuthMode('register');
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <div className="auth-form-modes-select">
                    <button
                        type="button"
                        className="auth-mode-button left"
                        disabled={authMode === 'login'}
                        onClick={handleLoginSelect}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="auth-mode-button right"
                        disabled={authMode === 'register'}
                        onClick={handleRegisterSelect}
                    >
                        Register
                    </button>
                </div>

                {authMode === 'register' ? <Register setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />}
            </div>
        </div>
    );
}

export default AuthPage;
