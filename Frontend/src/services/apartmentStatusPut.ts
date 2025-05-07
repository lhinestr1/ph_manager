import { IApartment } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
  params: {
    apartment_id: string;
  }
  payload: {
    isArrears: boolean;
  }
}

export default ({ apartment_id }: Params["params"]) => {
    const url = `apartments/${apartment_id}/status`;
    return serviceBuilder<Params["payload"], IApartment>('put', {
        url,
        auth: true,
    });
}
