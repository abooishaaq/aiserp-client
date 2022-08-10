import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

interface IPropsSelectSubjects {
    selectSubject: (_: string) => void;
    selectedSubject: string;
}

const SelectSubject = ({
    selectSubject,
    selectedSubject,
}: IPropsSelectSubjects) => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/subjects");
    const refreshed = useRef(false);

    useEffect(() => {
        if (refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });
    useEffect(() => {
        if (data?.subjects) {
            setSubjects(data.subjects);
        }
    }, [data, selectSubject]);

    return (
        <>
            <TextField
                select
                value={selectedSubject}
                onChange={(e) => selectSubject(e.target.value)}
                label="subject"
                fullWidth
            >
                {subjects.map((subject) => (
                    <MenuItem key={subject.name} value={subject.name}>
                        {subject.name}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
};

export default SelectSubject;
