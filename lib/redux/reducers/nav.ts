import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavPayload = {
    open: boolean;
};

const initialState = {
    open: false,
};

type State = typeof initialState;

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        open: (state: State, action: PayloadAction<NavPayload>) => {
            state.open = action.payload.open;
        }
    },
});
