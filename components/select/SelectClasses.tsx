import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import { gradeToRoman } from "../../lib/grade";

interface ISelectClassProps {
    selectClasses: (_: string[]) => void;
    selectedClasses: string[];
}

const SelectClasses = (props: ISelectClassProps) => {
    const {
        data: { classes },
        refresh,
    } = useFetch("/api/get/classes");
    const refreshed = useRef(false);

    useEffect(() => {
        if (!refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        props.selectClasses(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <FormControl>
            <InputLabel>Class</InputLabel>
            <Select
                multiple
                value={props.selectedClasses}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
            >
                {classes
                    ? classes.map((class_: any) => {
                          return (
                              <MenuItem
                                  key={class_.id}
                                  value={class_.id}
                              >
                                  {gradeToRoman(class_.grade)}-{class_.section}
                              </MenuItem>
                          );
                      })
                    : []}
            </Select>
        </FormControl>
    );
};

export default SelectClasses;
