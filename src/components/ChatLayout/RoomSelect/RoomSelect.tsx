import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoomID } from '../../../utils';
import { ClientMessageSocket, JoinStatus } from '../../../types';

interface IRoomSelectProps {
    socketClient: ClientMessageSocket;
    joinStatus: JoinStatus;
    setJoinStatus: React.Dispatch<React.SetStateAction<JoinStatus>>;
}

function RoomSelect(props: IRoomSelectProps): JSX.Element {
    const { socketClient, joinStatus, setJoinStatus } = props;

    const navigate = useNavigate();

    const [roomSelectMode, setRoomSelectMode] = useState<'join' | 'create'>('create');
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        socketClient.on('joined_successfully', () => {
            setJoinStatus({ joined: true, errorMessage: '' });
            navigate(`/${roomId}`);
        });
        socketClient.on('join_failed', (reason: string) => {
            setJoinStatus({ joined: false, errorMessage: reason });
        });

        return () => {
            socketClient.off('joined_successfully');
            socketClient.off('join_failed');
        };
    }, [socketClient, setJoinStatus, roomId, navigate]);

    const handleRoomSelectModeChange = (): void => {
        if (roomSelectMode === 'create') {
            setRoomSelectMode('join');
        } else {
            setRoomSelectMode('create');
        }
    };

    const joinRoom = (id?: string): void => {
        const roomIDToJoin = id || roomId;
        setRoomId(roomIDToJoin);
        setJoinStatus({ joined: false, errorMessage: '' });
        socketClient.emit('enter_room', roomIDToJoin, roomSelectMode);
    };

    const handleRoomSelect = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        joinRoom();
    };

    const handleRandRoomCreate = (): void => {
        const randomRoomID = generateRoomID();
        joinRoom(randomRoomID);
    };

    return (
        <div>
            <button type="button" onClick={handleRoomSelectModeChange}>
                {roomSelectMode}
            </button>

            <form onSubmit={handleRoomSelect}>
                <input required value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                <button type="submit">{roomSelectMode}</button>
                {roomSelectMode === 'create' && (
                    <button type="button" onClick={handleRandRoomCreate}>
                        Generate Random Room ID
                    </button>
                )}
            </form>

            {joinStatus.errorMessage}
        </div>
    );
}

export default RoomSelect;
