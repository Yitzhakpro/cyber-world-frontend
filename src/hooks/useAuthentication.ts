import React, { useState, useEffect } from 'react';
import { Auth } from '../services';
import { UserInfo } from '../types';

interface UseAuthenticationReturn {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserInfo;
}

const useAuthentication = (): UseAuthenticationReturn => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: '',
        above18: false,
        rank: 'user',
        memberSince: new Date(),
    });

    useEffect(() => {
        Auth.isAuthenticated()
            .then(({ data }) => {
                const { loggedIn: isLoggedIn, userInfo: userData } = data;

                if (isLoggedIn && userData) {
                    setLoggedIn(true);
                    setUserInfo(userData);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                // TODO: add toast error
                setLoggedIn(false);
            });
    }, []);

    useEffect(() => {
        if (!loggedIn) return undefined;

        const intervalId = setInterval(async () => {
            try {
                const res = await Auth.activity();
            } catch (err) {
                setLoggedIn(false);
            }
        }, 240_000);

        return () => clearInterval(intervalId);
    }, [loggedIn]);

    return { loggedIn, setLoggedIn, userInfo };
};

export default useAuthentication;
