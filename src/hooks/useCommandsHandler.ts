import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientMessageSocket } from '../types';

const useCommandsHandler = (socketClient: ClientMessageSocket): void => {
    const navigate = useNavigate();

    // kick command
    useEffect(() => {
        socketClient.on('got_kicked', (reason) => {
            // TODO: display kicked modal
            console.log(`Reason for kick: ${reason}`);
            navigate('/');
        });
        socketClient.on('kick_failed', (reason) => console.log(reason));

        return () => {
            socketClient.off('got_kicked');
            socketClient.off('kick_failed');
        };
    }, [socketClient, navigate]);
};

export default useCommandsHandler;
