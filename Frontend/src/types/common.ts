
export interface IBuilding {
    name: string;
    description: string;
    id: string;
}

export interface IApartment {
    id: string,
    number: string,
    building_name: string,
    created_at: string,
    updated_at: string
}

export interface IOptionSelector {
    label: string;
    value: string;
}