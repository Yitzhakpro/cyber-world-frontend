import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from '../config';

/*
    TODO: add return type to functions
    TODO: add logic for return url
*/

const { serverUrl } = config;

class AuthClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `${serverUrl}/api/auth`,
            withCredentials: true,
        });
    }

    async isAuthenticated(): Promise<AxiosResponse<any, any>> {
        const isAuthenticatedResponse = await this.client.get('/isAuthenticated');

        return isAuthenticatedResponse;
    }

    async register(
        email: string,
        username: string,
        birthDate: string, // iso string
        password: string,
        rememberMe: boolean
    ): Promise<AxiosResponse<any, any>> {
        const registerResponse = await this.client.post('/register', {
            email,
            username,
            birthDate,
            password,
            rememberMe,
        });

        return registerResponse;
    }

    async login(email: string, password: string, rememberMe: boolean): Promise<AxiosResponse<any, any>> {
        const loginResponse = await this.client.post('/login', { email, password, rememberMe });

        return loginResponse;
    }
}

const Auth = new AuthClient();
export default Auth;
