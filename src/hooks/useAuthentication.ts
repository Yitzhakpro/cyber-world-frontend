import React, { useState, useEffect } from 'react';
import { Auth } from '../services';
import { UserInfo } from '../types';

interface UseAuthenticationReturn {
    loading: boolean;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserInfo;
}

const useAuthentication = (): UseAuthenticationReturn => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: '',
        above18: false,
        rank: 'user',
        memberSince: new Date(),
    });

    useEffect(() => {
        setLoading(true);

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
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loggedIn) return undefined;

        const intervalId = setInterval(async () => {
            try {
                const { data: newUserInfo } = await Auth.activity();
                if (JSON.stringify(userInfo) !== JSON.stringify(newUserInfo)) {
                    setUserInfo(newUserInfo);
                }
            } catch (err) {
                setLoggedIn(false);
            }
        }, 240_000);

        return () => clearInterval(intervalId);
    }, [userInfo, loggedIn]);

    return { loading, loggedIn, setLoggedIn, userInfo };
};

export default useAuthentication;
