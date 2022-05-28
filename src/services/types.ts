import { UserInfo } from '../types';

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
