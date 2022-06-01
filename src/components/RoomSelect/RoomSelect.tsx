import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomSelect(): JSX.Element {
    const navigate = useNavigate();
    const [roomSelectMode, setRoomSelectMode] = useState<'join' | 'create'>('create');
    const [roomId, setRoomId] = useState('');

    const handleRoomSelectModeChange = (): void => {
        if (roomSelectMode === 'create') {
            setRoomSelectMode('join');
        } else {
            setRoomSelectMode('create');
        }
    };

    const handleRoomSelect = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // TODO: maybe have socket object here
        navigate(`/${roomId}`);
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
        </div>
    );
}

export default RoomSelect;
