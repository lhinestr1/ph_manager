import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { readToken, removeToken, saveToken, TokenAttrs } from '../../helpers/tokenHelpers';
import ApiError from '../../types/ApiError';

const attrs = readToken();

const initialState = {
    attrs: attrs,
    loggedIn: attrs.valid,
    error: undefined as ApiError | undefined,
};

export const session = createSlice({
    name: 'session',
    initialState,
    reducers: {
        loginSuccess: {
            reducer: (_, { payload }: PayloadAction<TokenAttrs>) => {
                return {
                    attrs: payload,
                    loggedIn: payload.valid,
                    error: undefined
                }
            },
            prepare: (token: string) => ({
                payload: saveToken(token),
            })
        },
        loginError(_, action: PayloadAction<ApiError>) {
            return { ...initialState, error: action.payload };
        },
        logout: {
            reducer: (_, { payload }: PayloadAction<TokenAttrs>) => {
                return { attrs: payload, loggedIn: payload.valid, error: undefined };
            },
            prepare: () => {
                return { payload: removeToken() };
            }
        }
    }
})