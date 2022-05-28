import React from 'react';
import { AuthPage } from '../Auth';
import { useAuthentication } from '../../hooks';

interface IAuthWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}

function AuthWrapper(props: IAuthWrapperProps): JSX.Element {
    const { children } = props;

    const { loggedIn, setLoggedIn, userInfo } = useAuthentication();

    if (loggedIn) {
        return <div>{children}</div>;
    }

    return <AuthPage setLoggedIn={setLoggedIn} />;
}

export default AuthWrapper;
