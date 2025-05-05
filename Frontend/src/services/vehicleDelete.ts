import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Params {
    vehicle_id: string;
}

const url = 'vehicles/:vehicle_id';
export const vehicleDelete = serviceBuilder<Params, None>('delete', {
    url,
    auth: true,
    query: true
});
