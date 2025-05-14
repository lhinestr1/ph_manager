import { IPaginator, IUser } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
    page: number;
    size: number;
}
export type Response = IPaginator<IUser>;

const url = `users?size=:size&page=:page`;
export default serviceBuilder<Params, Response>('get', {
    url,
    auth: true,
});
