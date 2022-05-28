import { createContext } from 'react';
import { UserInfo } from '../types';

const defaultUserInfo: UserInfo = {
    username: '',
    above18: false,
    rank: 'user',
    memberSince: new Date(),
};

const UserContext = createContext<UserInfo>(defaultUserInfo);

export default UserContext;
