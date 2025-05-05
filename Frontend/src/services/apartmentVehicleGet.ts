import { IVehicle } from '../types/common';
import serviceBuilder from './serviceBuilder';

interface Params {
    apartment_id: string
}

export const url = 'apartments/:apartment_id/vehicles';
export default serviceBuilder<Params, IVehicle[]>('get', {
    url,
    auth: true,
});
