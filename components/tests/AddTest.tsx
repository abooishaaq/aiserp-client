import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SelectSubject from "../select/SelectSubject";
import { Button } from "../ui";
import { useSuccess, useError } from "../../lib/message";
import { useState } from "react";
import { numToGrade } from "../../lib/grade";
import { post } from "../../lib/fetch";
import Space from "../Space";

const AddTest = () => {
    const [date, setDate] = useState<Date | null>(
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const [type, setType] = useState<string>("ASSESSMENT");
    const [subject, setSubject] = useState<string>("");
    const [totalMarks, setTotalMarks] = useState<number>(10);
    const [grade, setGrade] = useState<string>("1");
    const { setSuccess } = useSuccess();
    const { setError } = useError();

    const handleClick = () => {
        const data = {
            date: date?.toDateString(),
            type,
            subject,
            total: totalMarks,
            grade: numToGrade(grade),
        };

        post("/api/create/test", data).then((res) => {
            if (res.status === 200) {
                setSuccess("Test created successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <div className="md:w-1/2 w-full">
                <h2 className="text-3xl my-6">Add Test</h2>
                <h3 className="text-2xl my-4">Date</h3>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => (
                            <TextField fullWidth {...params} />
                        )}
                    />
                </LocalizationProvider>
                <h3 className="text-2xl my-4">Type</h3>
                <TextField
                    select
                    label="type"
                    fullWidth
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="MIDTERM">MIDTERM</MenuItem>
                    <MenuItem value="FINAL">FINAL</MenuItem>
                    <MenuItem value="ASSESSMENT">ASSESSMENT</MenuItem>
                </TextField>
                <h3 className="text-2xl my-4">Subject</h3>
                <SelectSubject
                    selectSubject={setSubject}
                    selectedSubject={subject}
                />
                <h3 className="text-2xl my-4">Total Marks</h3>
                <TextField
                    label="total marks"
                    fullWidth
                    value={totalMarks}
                    type="number"
                    onChange={(e) => setTotalMarks(parseInt(e.target.value))}
                />
                <h3 className="text-2xl my-4">Grade</h3>
                <TextField
                    select
                    value={grade}
                    fullWidth
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
                    <MenuItem value={"9"}>9</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"11"}>11</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                </TextField>
            </div>
            <Space size={2} />
            <div className="flex justify-center w-full my-4">
                <Button onClick={handleClick}>CREATE TEST</Button>
            </div>
        </>
    );
};

export default AddTest;
