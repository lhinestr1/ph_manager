import { IBuilding, IPaginator } from '../types/common';
import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export type Response = IPaginator<IBuilding>;
interface Params {
    page?: number; // default 1
    size?: number; // default 50
    //sort?: string;
    //filter?: string;
}

export const url = 'buildings';
export default serviceBuilder<Params | None, Response>('get', {
    url,
    auth: true,
});
