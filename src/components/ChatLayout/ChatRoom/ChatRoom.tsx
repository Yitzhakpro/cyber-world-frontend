import React, { useState, useEffect } from 'react';
import Message from './Message';
import MessagingInput from './MessagingInput';
import { ClientMessageSocket, MessageData } from '../../../types';

interface IChatRoomProps {
    socketClient: ClientMessageSocket;
}

function ChatRoom(props: IChatRoomProps): JSX.Element {
    const { socketClient } = props;
    const [messages, setMessages] = useState<MessageData[]>([]);

    // recieve messages logic
    useEffect(() => {
        socketClient.on('message_recieved', (newMessage) => {
            const formatedMessage: MessageData = {
                ...newMessage,
                timestamp: new Date(newMessage.timestamp),
            };

            const copyMessages = [...messages, formatedMessage];
            setMessages(copyMessages);
        });

        return () => {
            // TODO: fix unable to know when user disconnected
            socketClient.off('message_recieved');
        };
    }, [socketClient, messages]);

    const sendMessage = (message: string): void => {
        socketClient.emit('message', message);
    };

    return (
        <div>
            <h1>chat room</h1>

            <div>
                {messages.length > 0 &&
                    messages.map((userMessage) => {
                        const { id, username, rank, text, timestamp } = userMessage;

                        return <Message key={id} author={username} rank={rank} text={text} timestamp={timestamp} />;
                    })}
            </div>
            <MessagingInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;
