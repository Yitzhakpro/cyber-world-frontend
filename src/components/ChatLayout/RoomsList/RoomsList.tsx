import React from 'react';
import { RoomSummeryInfo, EnterMode } from '../../../types';

interface IRoomsListProps {
    roomsList: RoomSummeryInfo[];
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

            {roomsList.map((roomObject) => {
                const { name, usersCount } = roomObject;
                return (
                    <div>
                        <p>{name}</p>
                        <p>users: {usersCount}</p>
                        <button type="button" onClick={() => handleJoinRoom(name, 'join')}>
                            JOIN
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default RoomsList;
