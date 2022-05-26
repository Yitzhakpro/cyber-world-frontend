import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import { Auth } from '../../../services';

interface IAuthWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}

function AuthWrapper(props: IAuthWrapperProps): JSX.Element {
    const { children } = props;
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        Auth.isAuthenticated()
            .then(({ data }) => {
                const { loggedIn: isLoggedIn } = data;

                if (isLoggedIn) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                // TODO: add toast error
                setLoggedIn(false);
            });
        setLoggedIn(false);
    }, []);

    if (loggedIn) {
        return <div>{children}</div>;
    }

    return (
        <>
            <Login setLoggedIn={setLoggedIn} />
            <Register setLoggedIn={setLoggedIn} />
        </>
    );
}

export default AuthWrapper;
