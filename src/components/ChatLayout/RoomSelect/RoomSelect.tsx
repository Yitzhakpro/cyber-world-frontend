import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomsList from '../RoomsList';
import { generateRoomID } from '../../../utils';
import { ClientMessageSocket, RoomSummeryInfo, JoinStatus, EnterMode } from '../../../types';
import './roomSelect.css';

interface IRoomSelectProps {
    socketClient: ClientMessageSocket;
    joinStatus: JoinStatus;
    setJoinStatus: React.Dispatch<React.SetStateAction<JoinStatus>>;
}

function RoomSelect(props: IRoomSelectProps): JSX.Element {
    const { socketClient, joinStatus, setJoinStatus } = props;

    const navigate = useNavigate();

    const [roomsList, setRoomsList] = useState<RoomSummeryInfo[]>([]);
    const [roomSelectMode, setRoomSelectMode] = useState<EnterMode>('create');
    const [roomId, setRoomId] = useState('');

    // getting all available rooms
    useEffect(() => {
        socketClient.emit('get_all_rooms');
        socketClient.on('all_rooms', (allRooms) => {
            setRoomsList(allRooms);
        });

        return () => {
            socketClient.off('all_rooms');
        };
    }, [socketClient]);

    useEffect(() => {
        socketClient.on('joined_successfully', (roomInfo) => {
            setJoinStatus({ joined: true, roomInfo, errorMessage: '' });
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

    const joinRoom = (id?: string, enterMode?: EnterMode): void => {
        const roomIDToJoin = id || roomId;
        const selectedEnterMode = enterMode || roomSelectMode;

        setRoomId(roomIDToJoin);
        setJoinStatus({ joined: false, errorMessage: '' });
        socketClient.emit('enter_room', roomIDToJoin, selectedEnterMode);
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
        <div className="room-select-page">
            <div className="room-select-container">
                <RoomsList roomsList={roomsList} joinRoom={joinRoom} />
            </div>

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
