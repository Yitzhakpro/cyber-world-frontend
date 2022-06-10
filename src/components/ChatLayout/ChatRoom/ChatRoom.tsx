import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import MessagingInput from './MessagingInput';
import { UserContext } from '../../../context';
import { ClientMessageSocket, JoinStatus, MessageData } from '../../../types';

interface IChatRoomProps {
    socketClient: ClientMessageSocket;
    joinStatus: JoinStatus;
    setJoinStatus: React.Dispatch<React.SetStateAction<JoinStatus>>;
}

function ChatRoom(props: IChatRoomProps): JSX.Element {
    const { socketClient, joinStatus, setJoinStatus } = props;
    const params = useParams();
    const { username } = useContext(UserContext);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const readyToLeave = useRef(false);

    // used to leave the room after exiting from chat page
    useEffect(() => {
        if (!joinStatus.joined) {
            const roomId = params.roomID || '';
            socketClient.emit('enter_room', roomId, 'join');
            socketClient.on('join_failed', (reason) => {
                setJoinStatus({ joined: false, errorMessage: reason });
            });
        }
        return () => {
            socketClient.off('join_failed');

            if (readyToLeave.current) {
                socketClient.emit('leave_room');
            } else {
                readyToLeave.current = true;
            }
        };
    }, [socketClient, joinStatus.joined, setJoinStatus, params.roomID]);

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

    const testing = (): void => {
        socketClient.emit('kick', 'testing');
    };

    return (
        <div>
            {joinStatus.joined ? (
                <>
                    <h1>chat room</h1>

                    <div>
                        {messages.length > 0 &&
                            messages.map((userMessage) => {
                                const { id, username: usernameSent, rank, text, timestamp } = userMessage;
                                const messageAuthor = usernameSent === username ? 'You' : usernameSent;

                                return (
                                    <Message
                                        key={id}
                                        author={messageAuthor}
                                        rank={rank}
                                        text={text}
                                        timestamp={timestamp}
                                    />
                                );
                            })}
                    </div>
                    <button type="button" onClick={testing}>
                        kick testing
                    </button>
                    <MessagingInput sendMessage={sendMessage} />
                </>
            ) : (
                <p>{joinStatus.errorMessage}</p>
            )}
        </div>
    );
}

export default ChatRoom;
