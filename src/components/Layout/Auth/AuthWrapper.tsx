import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';

interface IAuthWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}

function AuthWrapper(props: IAuthWrapperProps): JSX.Element {
    const { children } = props;
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // TODO: add fetching user info logic
        setLoggedIn(false);
    }, []);

    if (loggedIn) {
        return <div>{children}</div>;
    }

    return (
        <>
            <Login />
            <Register />
        </>
    );
}

export default AuthWrapper;
