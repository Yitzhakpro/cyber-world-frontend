import React, { useState, useEffect } from 'react';
import { AuthPage } from '../Auth';
import { Auth } from '../../services';
import { useIsAuthenticated, useActivity } from '../../hooks';

interface IAuthWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}

function AuthWrapper(props: IAuthWrapperProps): JSX.Element {
    const { children } = props;
    const [loggedIn, setLoggedIn] = useState(false);

    useIsAuthenticated({ setLoggedIn });
    useActivity({ loggedIn, setLoggedIn });

    if (loggedIn) {
        return <div>{children}</div>;
    }

    return <AuthPage setLoggedIn={setLoggedIn} />;
}

export default AuthWrapper;
