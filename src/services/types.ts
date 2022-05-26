// general
type Rank = 'owner' | 'mod' | 'helper' | 'user';

interface UserInfo {
    username: string;
    rank: Rank;
    above18: boolean;
    memberSince: Date;
}

// auth service
export interface IsAuthenticatedResponse {
    loggedIn: boolean;
    userInfo?: UserInfo;
}

export interface RegisterResponse {
    userInfo: UserInfo;
}

export interface LoginResponse {
    success: boolean;
    userInfo?: UserInfo;
}
