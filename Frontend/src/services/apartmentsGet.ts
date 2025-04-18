import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Params {
    building_id: string;
}

export const url = 'buildings/:building_id/apartments';
export default serviceBuilder<Params, None[]>('get', {
    url,
    auth: true,
});
