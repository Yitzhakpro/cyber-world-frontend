import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from '../config';
import { IsAuthenticatedResponse, RegisterResponse, LoginResponse } from './types';

/*
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

    async activity(): Promise<AxiosResponse<any>> {
        const activityResponse = await this.client.get('/activity');

        return activityResponse;
    }

    async isAuthenticated(): Promise<AxiosResponse<IsAuthenticatedResponse>> {
        const isAuthenticatedResponse = await this.client.get<IsAuthenticatedResponse>('/isAuthenticated');

        return isAuthenticatedResponse;
    }

    async register(
        email: string,
        username: string,
        birthDate: string, // iso string
        password: string
    ): Promise<AxiosResponse<RegisterResponse>> {
        const registerResponse = await this.client.post<RegisterResponse>('/register', {
            email,
            username,
            birthDate,
            password,
        });

        return registerResponse;
    }

    async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const loginResponse = await this.client.post<LoginResponse>('/login', { email, password });

        return loginResponse;
    }
}

const Auth = new AuthClient();
export default Auth;
