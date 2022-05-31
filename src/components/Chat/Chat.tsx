import React, { useEffect } from 'react';
import SocketIoClient from 'socket.io-client';

function Chat(): JSX.Element {
    useEffect(() => {
        const socket = SocketIoClient('http://localhost:8080', { withCredentials: true });

        return () => {
            socket.disconnect();
        };
    }, []);
    return <div>chat here</div>;
}

export default Chat;
