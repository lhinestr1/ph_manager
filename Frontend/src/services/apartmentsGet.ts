import { IApartment, IPaginator } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
    pagination: {
        page: number;
        size: number;
    }
    params: {
        building_id: string;
    }

}
export type Response = IPaginator<IApartment>;

export default ({ building_id }: Params["params"]) => {
    const url = `buildings/${building_id}/apartments?size=:size&page=:page`;
    return serviceBuilder<Params["pagination"], Response>('get', {
        url,
        auth: true,
    });
}
