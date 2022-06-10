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
            socketClient.on('joined_successfully', (roomInfo) => {
                setJoinStatus({ joined: true, roomInfo, errorMessage: '' });
            });
            socketClient.on('join_failed', (reason) => {
                setJoinStatus({ joined: false, errorMessage: reason });
            });
        }
        return () => {
            socketClient.off('joined_successfully');
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

    return (
        <div>
            {joinStatus.joined ? (
                <>
                    <h1>chat room</h1>

                    <div>
                        <h1>Users:</h1>
                        {joinStatus.roomInfo &&
                            joinStatus.roomInfo.map((userObject) => {
                                return (
                                    <div>
                                        <h2>username: {userObject.username}</h2>
                                        <h2>rank: {userObject.rank}</h2>
                                    </div>
                                );
                            })}
                    </div>

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
                    <MessagingInput sendMessage={sendMessage} />
                </>
            ) : (
                <p>{joinStatus.errorMessage}</p>
            )}
        </div>
    );
}

export default ChatRoom;
