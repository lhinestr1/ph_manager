import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Params {
  number: string,
  building_id: string
}

const url = 'apartments/';
export const apartmentsPost = serviceBuilder<Params, None>('post', {
  url,
  auth: true,
});
