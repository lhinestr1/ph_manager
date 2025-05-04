
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