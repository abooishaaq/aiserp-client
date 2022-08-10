import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { msgSlice, MsgType } from "./redux/reducers/message";

export const useSuccess = () => {
    const dispatch = useAppDispatch();
    const msg = useAppSelector((state) => state.msg.msg);

    const setSuccess = (message: string) => {
        dispatch(
            msgSlice.actions.message({
                msg: { message, type: MsgType.SUCCESS },
            })
        );
    };

    return {
        success: msg.type === "SUCCESS" ? msg.message : "",
        setSuccess,
    };
};

export const useError = () => {
    const dispatch = useAppDispatch();
    const msg = useAppSelector((state) => state.msg.msg);

    const setError = (message: string) => {
        dispatch(
            msgSlice.actions.message({
                msg: { message, type: MsgType.ERROR },
            })
        );
    };

    return {
        error: msg.type === "ERROR" ? msg.message : "",
        setError,
    };
};

export const useInfo = () => {
    const dispatch = useAppDispatch();
    const msg = useAppSelector((state) => state.msg.msg);

    const setInfo = (message: string) => {
        dispatch(
            msgSlice.actions.message({
                msg: { message, type: MsgType.INFO },
            })
        );
    };

    return {
        info: msg.type === "INFO" ? msg.message : "",
        setInfo,
    };
};
