import { MenuItem, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import { gradeToRoman } from "../../lib/grade";

interface ISelectClassProps {
    selectClass: (_: any) => void;
    selectedClass: any;
}

const SelectClass = (props: ISelectClassProps) => {
    const {
        data: { classes },
        refresh,
    } = useFetch("/api/get/classes");
    const refreshed = useRef(false);

    useEffect(() => {
        if (refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });

    return (
        <TextField
            select
            required
            value={
                props.selectedClass ? JSON.stringify(props.selectedClass) : ""
            }
            onChange={(e) => props.selectClass(JSON.parse(e.target.value))}
            label="class"
        >
            {classes
                ? classes.map((class_: any) => {
                      return (
                          <MenuItem
                              key={class_.id}
                              value={JSON.stringify(class_)}
                          >
                              {gradeToRoman(class_.grade)}-{class_.section}
                          </MenuItem>
                      );
                  })
                : []}
        </TextField>
    );
};

export default SelectClass;
