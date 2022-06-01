import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIoClient, { Socket } from 'socket.io-client';
import MessageInput from './MessageInput';
import config from '../../config';

const { serverUrl } = config;

function ChatRoom(): JSX.Element {
    const params = useParams();
    const [socket, setSocket] = useState<Socket | null>(null);

    const [joinStatus, setJoinStatus] = useState<{ joined: boolean; message?: string }>({ joined: false, message: '' });
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socketInstance = SocketIoClient(serverUrl, { withCredentials: true });
        setSocket(socketInstance);

        // join room logic
        socketInstance.emit('join_room', params.roomID);
        socketInstance.on('joined_successfully', () => {
            setJoinStatus({ joined: true });
        });
        socketInstance.on('join_failed', (reason: string) => {
            setJoinStatus({ joined: false, message: reason });
        });

        return () => {
            socketInstance.close();
            // join logic
            socketInstance.off('joined_successfully');
            socketInstance.off('join_failed');
            // messages logic
            socketInstance.off('message_recieved');
        };
    }, [params.roomID]);

    // recieve messages logic
    useEffect(() => {
        socket?.on('message_recieved', (newMessage: string) => {
            const copyMessages = [...messages, newMessage];
            setMessages(copyMessages);
        });

        return () => {
            socket?.off('message_recieved');
        };
    }, [socket, messages]);

    const sendMessage = (message: string): void => {
        socket?.emit('message', message);
    };

    return (
        <div>
            <h1>chat here</h1>

            {joinStatus.joined ? (
                <>
                    <div>
                        {messages.length > 0 &&
                            messages.map((userMessage) => {
                                return <p>{userMessage}</p>;
                            })}
                    </div>
                    <MessageInput sendMessage={sendMessage} />
                </>
            ) : (
                <p>{joinStatus.message}</p>
            )}
        </div>
    );
}

export default ChatRoom;
