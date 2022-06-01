import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocketIoClient, { Socket } from 'socket.io-client';
import Message from './Message';
import MessagingInput from './MessagingInput';
import config from '../../config';
import { ServerToClientEvents, ClientToServerEvents, JoinStatus, MessageData } from './types';

const { serverUrl } = config;

function ChatRoom(): JSX.Element {
    const params = useParams();
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    const [joinStatus, setJoinStatus] = useState<JoinStatus>({ joined: false, message: '' });
    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        const socketInstance: Socket<ServerToClientEvents, ClientToServerEvents> = SocketIoClient(serverUrl, {
            withCredentials: true,
        });
        setSocket(socketInstance);

        if (params.roomID) {
            // join room logic
            socketInstance.emit('join_room', params.roomID);
            socketInstance.on('joined_successfully', () => {
                setJoinStatus({ joined: true });
            });
            socketInstance.on('join_failed', (reason: string) => {
                setJoinStatus({ joined: false, message: reason });
            });
        }

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
        socket?.on('message_recieved', (newMessage) => {
            const formatedMessage: MessageData = {
                ...newMessage,
                timestamp: new Date(newMessage.timestamp),
            };

            const copyMessages = [...messages, formatedMessage];
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
            <h1>chat room</h1>

            {joinStatus.joined ? (
                <>
                    <div>
                        {messages.length > 0 &&
                            messages.map((userMessage) => {
                                const { id, username, rank, text, timestamp } = userMessage;

                                return (
                                    <Message key={id} author={username} rank={rank} text={text} timestamp={timestamp} />
                                );
                            })}
                    </div>
                    <MessagingInput sendMessage={sendMessage} />
                </>
            ) : (
                <p>{joinStatus.message}</p>
            )}
        </div>
    );
}

export default ChatRoom;
