import serviceBuilder from './serviceBuilder';

export interface Response {
  apartmentInfo:{
    buildingName: string,
    isInArrears: boolean,
    number: string,
    ownerName: string
  },
  vehicleInfo:{
    brand: string,
    color: string
    model: string,
    plate: string,
    vehicleType: "Automóvil" | "Motocicleta",
  },
  tenants: string[],
}

interface Params {
  plate: string
}

export const url = 'vehicles/:plate/status';
export default serviceBuilder<Params, Response>('get', {
  url,
  auth: true,
});
