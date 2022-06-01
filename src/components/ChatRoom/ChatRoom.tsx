import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIoClient, { Socket } from 'socket.io-client';
import config from '../../config';

const { serverUrl } = config;

function ChatRoom(): JSX.Element {
    const params = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);

    const [joinStatus, setJoinStatus] = useState<{ joined: boolean; message?: string }>({ joined: false, message: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const socketInstance = SocketIoClient(serverUrl, { withCredentials: true });
        setSocket(socketInstance);

        socketInstance.emit('join_room', params.roomID);
        socketInstance.on('joined_successfully', () => {
            setJoinStatus({ joined: true });
        });
        socketInstance.on('join_failed', (reason: string) => {
            setJoinStatus({ joined: false, message: reason });
        });

        return () => {
            socketInstance.close();
        };
    }, [params.roomID]);

    const sendMsg = (): void => {
        socket?.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <h1>chat here</h1>

            {joinStatus.joined ? (
                <>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="button" onClick={sendMsg}>
                        send
                    </button>
                </>
            ) : (
                <p>{joinStatus.message}</p>
            )}
        </div>
    );
}

export default ChatRoom;
