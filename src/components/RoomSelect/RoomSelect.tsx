import React, { useState } from 'react';

function RoomSelect(): JSX.Element {
    const [roomSelectMode, setRoomSelectMode] = useState<'join' | 'create'>('create');
    const [roomId, setRoomId] = useState('');

    const handleRoomSelectModeChange = (): void => {
        if (roomSelectMode === 'create') {
            setRoomSelectMode('join');
        } else {
            setRoomSelectMode('create');
        }
    };

    const handleRoomSelect = (): void => {
        console.log(roomId);
    };

    return (
        <div>
            <button type="button" onClick={handleRoomSelectModeChange}>
                {roomSelectMode}
            </button>

            <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <button type="button" onClick={handleRoomSelect}>
                {roomSelectMode}
            </button>
        </div>
    );
}

export default RoomSelect;
