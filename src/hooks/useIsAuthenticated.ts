import React, { useEffect } from 'react';
import { Auth } from '../services';

interface IUseIsAuthenticated {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const useIsAuthenticated = (props: IUseIsAuthenticated): void => {
    const { setLoggedIn } = props;

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
    }, [setLoggedIn]);
};

export default useIsAuthenticated;
