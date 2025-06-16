import { IApartment, IPaginator } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
    pagination: {
        page: number;
        size: number;
    }
    filters: {
        isInArrears?: boolean,
        buildingId?: string
    }
}

const url = `apartments/all`;
export default serviceBuilder<Params, IPaginator<IApartment>>('post', {
    url,
    auth: true,
});

