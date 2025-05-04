import { createSlice } from '@reduxjs/toolkit';

export const ready = createSlice({
  name: 'ready',
  initialState: false as boolean,
  reducers: {
    ready() {
      return true;
    },
    notReady() {
      return false;
    },
  },
});