export const generateRoomID = (): string => {
    let result = '';
    const RAND_ID_LENGTH = 6;
    const POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < RAND_ID_LENGTH; i++) {
        result += POSSIBLE_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_CHARS.length));
    }

    return result;
};
