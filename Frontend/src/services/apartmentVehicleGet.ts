import serviceBuilder from './serviceBuilder';

export interface Response {

}

interface Params {
    apartment_number: string
}

export const url = 'apartments/:apartment_number/vehicles';
export default serviceBuilder<Params, Response>('get', {
    url,
    auth: true,
});
