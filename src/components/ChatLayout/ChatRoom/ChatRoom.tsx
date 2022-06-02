import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import MessagingInput from './MessagingInput';
import { ClientMessageSocket, JoinStatus, MessageData } from '../../../types';

interface IChatRoomProps {
    socketClient: ClientMessageSocket;
    joinStatus: JoinStatus;
    setJoinStatus: React.Dispatch<React.SetStateAction<JoinStatus>>;
}

function ChatRoom(props: IChatRoomProps): JSX.Element {
    const { socketClient, joinStatus, setJoinStatus } = props;
    const params = useParams();
    const [messages, setMessages] = useState<MessageData[]>([]);
    const readyToLeave = useRef(false);

    // used to leave the room after exiting from chat page
    useEffect(() => {
        if (!joinStatus.joined) {
            const roomId = params.roomID || '';
            socketClient.emit('enter_room', roomId, 'join');
        }
        return () => {
            if (readyToLeave.current) {
                socketClient.emit('leave_room');
            } else {
                readyToLeave.current = true;
            }
        };
    }, [socketClient, joinStatus.joined, params.roomID]);

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
