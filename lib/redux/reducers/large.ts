import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LargePayload = {
    large: boolean;
};

const initialState = {
    large: true,
};

type State = typeof initialState;

export const largeSlice = createSlice({
    name: "large",
    initialState,
    reducers: {
        set: (state: State, action: PayloadAction<LargePayload>) => {
            state.large = action.payload.large;
        },
    },
});
