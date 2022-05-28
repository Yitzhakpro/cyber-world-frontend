import React, { useState, useEffect } from 'react';
import { AuthPage } from '../Auth';
import { Auth } from '../../services';
import { useActivity } from '../../hooks';

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
    }, []);
    useActivity({ loggedIn, setLoggedIn });

    if (loggedIn) {
        return <div>{children}</div>;
    }

    return <AuthPage setLoggedIn={setLoggedIn} />;
}

export default AuthWrapper;
