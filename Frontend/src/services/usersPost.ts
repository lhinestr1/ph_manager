import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface ParamsUserPost {
    firstName: string,
    lastName: string,
    documentNumber: string,
    mainPhoneNumber: string,
    secondaryPhoneNumber: string,
    email: string,
    role: string,
    password: string,
    confirmPassword: string,
    apartmentId?: string 
}

const url = 'users';
export const usersPost = serviceBuilder<ParamsUserPost, None>('post', {
    url,
    auth: true,
});
