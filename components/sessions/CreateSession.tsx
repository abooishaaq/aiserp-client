import { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import enIN from "date-fns/locale/en-IN";
import { useError, useSuccess } from "../../lib/message";
import { post } from "../../lib/fetch";
import { Button } from "../ui";

const CreateSession = () => {
    const [start, setStart] = useState<Date | null>(new Date());
    const [end, setEnd] = useState<Date | null>(
        new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
    );

    const { setError } = useError();
    const { setSuccess } = useSuccess();

    const createSession = () => {
        post("/api/create/session", {
            start,
            end,
        }).then((res) => {
            if (res.status === 200) {
                setSuccess("Session created successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <h3 className="text-2xl my-4">Start</h3>

            <LocalizationProvider locale={enIN} dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={start}
                    onChange={setStart}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
            <h3 className="text-2xl my-4">End</h3>

            <LocalizationProvider locale={enIN} dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={end}
                    onChange={setEnd}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
            <div>
                <Button onClick={createSession}>Create</Button>
            </div>
            <style jsx>{`
                div {
                    margin-top: 1rem;
                }
            `}</style>
        </>
    );
};

export default CreateSession;
