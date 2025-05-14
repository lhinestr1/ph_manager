
export type vehicleType = 'Automóvil' | 'Motocicleta' | '';

export type rolesType = 'Administrador' | 'Propietario' | 'Inquilino' | 'Guardia' | '';

export const vehicleTypes: vehicleType[] = ['Automóvil', 'Motocicleta'];

export const roles = ['Administrador', 'Propietario', 'Guardia', 'Inquilino'];

export interface IBuilding {
    name: string;
    description: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApartment {
    number: string,
    buildingId: string,
    id: string,
    buildingName: string,
    isInArrears: boolean,
    ownerName: string,
    createdAt: string,
    updatedAt: string,
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

export interface IUser {
    firstName: string,
    lastName: string,
    documentNumber: string,
    mainPhoneNumber: string,
    secondaryPhoneNumber: string,
    email: string,
    role: rolesType,
    id: string,
    isActive: boolean
}