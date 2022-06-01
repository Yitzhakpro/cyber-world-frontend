import React, { useState, useEffect } from 'react';
import SocketIoClient, { Socket } from 'socket.io-client';

function ChatRoom(): JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [msg, setMessage] = useState('');

    useEffect(() => {
        const socketInstance = SocketIoClient('http://localhost:8080', { withCredentials: true });
        setSocket(socketInstance);
        return () => {
            socketInstance.close();
        };
    }, []);

    const sendMsg = (): void => {
        socket?.emit('message', msg);
        setMessage('');
    };

    return (
        <div>
            <h1>chat here</h1>
            <input value={msg} onChange={(e) => setMessage(e.target.value)} />
            <button type="button" onClick={sendMsg}>
                send
            </button>
        </div>
    );
}

export default ChatRoom;
