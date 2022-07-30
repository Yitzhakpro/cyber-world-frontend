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
        <table>
            <tr>
                <th>Room Name</th>
                <th>Users Count</th>
                <th>Action</th>
            </tr>
            {roomsList.length ? (
                roomsList.map((roomObject) => {
                    const { name, usersCount } = roomObject;
                    return (
                        <tr>
                            <td>{name}</td>
                            <td>{usersCount}</td>
                            <td>
                                <button type="button" onClick={() => handleJoinRoom(name, 'join')}>
                                    JOIN
                                </button>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr>
                    <td>No rooms</td>
                    <td>0</td>
                    <td>{}</td>
                </tr>
            )}
        </table>
    );
}

export default RoomsList;
