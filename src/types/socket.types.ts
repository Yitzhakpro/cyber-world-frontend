import { Socket } from 'socket.io-client';

// socket related
export type ClientMessageSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type EnterMode = 'create' | 'join';

export interface MessageData {
    id: string;
    username: string;
    rank: string;
    text: string;
    timestamp: Date;
}

interface ServerToClientEvents {
    // join logic
    join_failed: (reason: string) => void;
    joined_successfully: () => void;
    // message logic
    message_recieved: (message: MessageData) => void;
}

interface ClientToServerEvents {
    enter_room: (roomID: string, enterMode: EnterMode) => void;
    message: (message: string) => void;
}
