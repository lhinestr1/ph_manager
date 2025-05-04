
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBuilding } from '../../types/common';

const initialState: IBuilding[] = []

export const buildings = createSlice({
    name: 'buildings',
    initialState,
    reducers: {
        updateBuildings(_, { payload }: PayloadAction<IBuilding[]>) {
            return (payload || []).sort((a: IBuilding, b: IBuilding) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        },
        clear() {
            return initialState
        }
    }
})