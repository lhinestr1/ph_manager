/* eslint react-hooks/exhaustive-deps: 0 */
import None from '../types/None';
import serviceBuilder from './serviceBuilder';

export interface Params {
  name: string;
  description: string;
}

const url = 'buildings';
export const buildingsPost = serviceBuilder<Params, None>('post', {
  url,
  auth: true,
});
