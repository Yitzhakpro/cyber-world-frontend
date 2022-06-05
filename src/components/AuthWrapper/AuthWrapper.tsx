import React from 'react';
import { AuthPage } from '../Auth';
import { useAuthentication } from '../../hooks';
import { UserContext } from '../../context';

interface IAuthWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}

function AuthWrapper(props: IAuthWrapperProps): JSX.Element {
    const { children } = props;

    const { loading, loggedIn, setLoggedIn, userInfo } = useAuthentication();

    if (loading) {
        return <p>loading...</p>;
    }
    if (loggedIn) {
        return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>;
    }

    return <AuthPage setLoggedIn={setLoggedIn} />;
}

export default AuthWrapper;
