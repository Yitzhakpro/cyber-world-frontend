import React from 'react';
import { EnterMode } from '../../../types';

interface IRoomsListProps {
    roomsList: string[];
    joinRoom: (id?: string, enterMode?: EnterMode) => void;
}

function RoomsList(props: IRoomsListProps): JSX.Element {
    const { roomsList, joinRoom } = props;

    const handleJoinRoom = (id: string, enterMode?: EnterMode): void => {
        joinRoom(id, enterMode);
    };

    return (
        <div>
            <h1>Rooms List</h1>

            {roomsList.map((roomID) => {
                return (
                    <div>
                        <p>{roomID}</p>
                        <button type="button" onClick={() => handleJoinRoom(roomID, 'join')}>
                            JOIN
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default RoomsList;
