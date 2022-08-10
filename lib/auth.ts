import { useEffect } from "react";
import { useFetch } from "./fetch";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { authSlice } from "./redux/reducers/auth";

export const useUser = () => {
    const { data, error, loading } = useFetch("/api/me");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user.type === "UNAUTHORIZED") {
            if (error) {
                dispatch(
                    authSlice.actions.login({
                        user: JSON.parse(localStorage.getItem("user") || "{}"),
                    })
                );
            }

            if (data.user) {
                dispatch(
                    authSlice.actions.login({
                        user: data.user,
                    })
                );
            }
        }
    }, [user, data, error, dispatch]);

    return { user, loading };
};
