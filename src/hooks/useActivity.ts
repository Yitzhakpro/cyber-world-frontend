import React, { useEffect } from 'react';
import { Auth } from '../services';

interface IUseActivityProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const useActivity = (props: IUseActivityProps): void => {
    const { loggedIn, setLoggedIn } = props;

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
    }, [loggedIn, setLoggedIn]);
};

export default useActivity;
