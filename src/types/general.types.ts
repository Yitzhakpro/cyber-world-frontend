export type Rank = 'owner' | 'mod' | 'helper' | 'user';

export interface UserInfo {
    username: string;
    rank: Rank;
    above18: boolean;
    memberSince: Date;
}
