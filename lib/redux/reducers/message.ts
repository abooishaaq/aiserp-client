import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum MsgType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

type Msg = {
    type: MsgType;
    message: string;
};

type MsgPayload = {
    msg: Msg;
};

const initialState = {
    msg: {
        type: MsgType.INFO,
        message: "",
    },
};

type State = typeof initialState;

export const msgSlice = createSlice({
    name: "msg",
    initialState,
    reducers: {
        message: (state: State, action: PayloadAction<MsgPayload>) => {
            state.msg = action.payload.msg;
        },
    },
});
