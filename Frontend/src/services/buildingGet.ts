import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Response {
    name: string,
    description: string,
    id: string,
}

export const url = 'buildings';
export default serviceBuilder<None, Response[]>('get', {
    url,
    auth: true,
});
