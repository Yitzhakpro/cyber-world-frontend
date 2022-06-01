import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientMessageSocket } from '../../../types';

interface IRoomSelectProps {
    socketClient: ClientMessageSocket;
}

function RoomSelect(props: IRoomSelectProps): JSX.Element {
    const { socketClient } = props;

    const navigate = useNavigate();

    const [roomSelectMode, setRoomSelectMode] = useState<'join' | 'create'>('create');
    const [roomId, setRoomId] = useState('');
    const [enterError, setEnterError] = useState('');

    useEffect(() => {
        socketClient.on('joined_successfully', () => {
            setEnterError('');
            navigate(`/${roomId}`);
        });
        socketClient.on('join_failed', (reason: string) => {
            setEnterError(reason);
        });

        return () => {
            socketClient.off('joined_successfully');
            socketClient.off('join_failed');
        };
    }, [socketClient, roomId, navigate]);

    const handleRoomSelectModeChange = (): void => {
        if (roomSelectMode === 'create') {
            setRoomSelectMode('join');
        } else {
            setRoomSelectMode('create');
        }
    };

    const handleRoomSelect = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setEnterError('');
        socketClient.emit('enter_room', roomId, roomSelectMode);
    };

    return (
        <div>
            <button type="button" onClick={handleRoomSelectModeChange}>
                {roomSelectMode}
            </button>

            <form onSubmit={handleRoomSelect}>
                <input required value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                <button type="submit">{roomSelectMode}</button>
            </form>

            {enterError}
        </div>
    );
}

export default RoomSelect;
