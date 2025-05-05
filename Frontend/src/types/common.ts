
export type vehicleType = 'Automóvil' | 'Motocicleta' | '';

export const vehicleTypes: vehicleType[] = ['Automóvil', 'Motocicleta'];

export interface IBuilding {
    name: string;
    description: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApartment {
    id: string,
    number: string,
    buildingName: string,
    createdAt: string,
    updatedAt: string
}

export interface IVehicle {
    brand: string,
    color: string,
    id: string,
    model: string,
    plate: string,
    vehicleType: vehicleType,
    updatedAt?: string
    createdAt?: string,
}

export interface IOptionSelector {
    label: string;
    value: string;
}

export interface IPaginator<T> {
    items: T[];
    page: number;
    pages: number;
    size: number;
    total: number;
}