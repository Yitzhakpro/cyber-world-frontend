import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import RoomSelect from './RoomSelect';
import ChatRoom from './ChatRoom';
import config from '../../config';
import { ClientMessageSocket, JoinStatus } from '../../types';

const { serverUrl } = config;

function ChatLayout(): JSX.Element {
    const [socket, setSocket] = useState<ClientMessageSocket | null>(null);
    const [joinStatus, setJoinStatus] = useState<JoinStatus>({ joined: false });

    useEffect(() => {
        const socketInstance = io(serverUrl, { withCredentials: true });
        setSocket(socketInstance);

        return () => {
            socketInstance.close();
        };
    }, []);

    return (
        <div>
            {socket ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RoomSelect socketClient={socket} joinStatus={joinStatus} setJoinStatus={setJoinStatus} />
                        }
                    />
                    <Route
                        path=":roomID"
                        element={
                            <ChatRoom socketClient={socket} joinStatus={joinStatus} setJoinStatus={setJoinStatus} />
                        }
                    />
                </Routes>
            ) : (
                <p>Could not init socket</p>
            )}
        </div>
    );
}

export default ChatLayout;
