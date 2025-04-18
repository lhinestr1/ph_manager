import serviceBuilder from './serviceBuilder';

export interface Response {
  plate: string,
  building_name: string,
  apartment_number: string,
  is_in_arrears: boolean,
  vehicle_type: "Automóvil" | "Motocicleta",
  brand: string,
  model: string,
  color: string
}

interface Params {
  plate: string
}

export const url = 'vehicles/:plate/status';
export default serviceBuilder<Params, Response>('get', {
  url,
  auth: true,
});
