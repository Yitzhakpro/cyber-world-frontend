import { Socket } from 'socket.io-client';

// socket related
export type ClientMessageSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export type EnterMode = 'create' | 'join';

export interface JoinStatus {
    joined: boolean;
    errorMessage?: string;
}

export interface MessageData {
    id: string;
    username: string;
    rank: string;
    text: string;
    timestamp: Date;
}

interface ServerToClientEvents {
    all_rooms: (allRooms: string[]) => void;
    // join logic
    join_failed: (reason: string) => void;
    joined_successfully: () => void;
    // message logic
    message_recieved: (message: MessageData) => void;
}

interface ClientToServerEvents {
    get_all_rooms: () => void;
    enter_room: (roomID: string, enterMode: EnterMode) => void;
    leave_room: () => void;
    message: (message: string) => void;
}
