import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum UserType {
    SU = "SU",
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    UNAUTHORIZED = "UNAUTHORIZED",
}

type User = {
    id: string;
    pic: string;
    email: string;
    students: {
        id: string;
        name: string;
        rollNo: string;
        class: {
            id: string;
            grade: string;
            section: string;
        };
    }[];
    teacher: {
        class: {
            id: string;
            grade: string;
            section: string;
        } | null;
    } | null;
    authSess: {
        id: string;
        ua: string;
    }[];
    name: string;
    type: UserType;
};

type AuthPayload = {
    user: User;
};

const initialState: AuthPayload = {
    user: {
        id: "",
        pic: "",
        name: "",
        email: "",
        students: [],
        teacher: null,
        authSess: [],
        type: UserType.UNAUTHORIZED,
    },
};

type State = typeof initialState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: State, action: PayloadAction<AuthPayload>) => {
            state.user = action.payload.user;
        },
        logout: (state: State) => {
            state.user = initialState.user;
        },
    },
});
