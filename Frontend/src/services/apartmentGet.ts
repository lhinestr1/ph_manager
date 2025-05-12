import { IApartment } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
    apartment_id: string;
}

const url = `apartments/:apartment_id/`;
export default serviceBuilder<Params, IApartment>('get', {
  url,
  auth: true,
}); 

