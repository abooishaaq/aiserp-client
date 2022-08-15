import { useState, FormEvent } from "react";
import  MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "../ui";
import SelectTeacher from "../select/SelectTeacher";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";

const AddClass = () => {
    const [grade, setGrade] = useState("1");
    const [section, setSection] = useState("A");
    const [teacherId, setTeacherId] = useState("");
    const { setError } = useError();
    const { setSuccess } = useSuccess();

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!teacherId) {
            return;
        }

        const data = {
            grade,
            section,
            teacherId,
        };

        post("/api/create/class", data).then((res) => {
            if (res.status === 200) {
                setSuccess("Class created successfully");
            } else {
                res.json().then((err: { message: string }) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <h2 className="text-3xl my-6">Add Class</h2>
            <form>
                <label>Grade</label>
                <Select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    <MenuItem value={"NURSERY"}>NURSERY</MenuItem>
                    <MenuItem value={"SR_NURSERY"}>SR_NURSERY</MenuItem>
                    <MenuItem value={"KINDERGARDEN"}>KG</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                </Select>
                <label>Section</label>
                <Select
                    value={section}
                    onChange={(e) => setSection(e.target.value as string)}
                >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                </Select>
                <SelectTeacher setTeacher={setTeacherId} />
                <div className="flex justify-center w-full">
                    <Button type="submit" onClick={onFormSubmit}>
                        ADD
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddClass;
