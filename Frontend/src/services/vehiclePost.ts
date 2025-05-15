import { vehicleType } from '../types/common';
import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Params {
    vehicleType: vehicleType,
    brand: string,
    model: string,
    color: string,
    plate: string,
    apartmentId: string
}

const url = 'vehicles';
export const vehiclePost = serviceBuilder<Params, None>('post', {
    url,
    auth: true,
});
