// room status
export interface JoinStatus {
    joined: boolean;
    message?: string;
}

// socket related
export interface MessageData {
    id: string;
    username: string;
    rank: string;
    text: string;
    timestamp: Date;
}

export interface ServerToClientEvents {
    // join logic
    join_failed: (reason: string) => void;
    joined_successfully: () => void;
    // message logic
    message_recieved: (message: MessageData) => void;
}

export interface ClientToServerEvents {
    join_room: (roomID: string) => void;
    message: (message: string) => void;
}
