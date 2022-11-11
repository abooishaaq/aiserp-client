import { FormEvent, useEffect, useState } from "react";
import { post, useFetch } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Input } from "../ui";
import { Button } from "../ui";
import SelectClass from "../select/SelectClass";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const AddStudent = () => {
    const [class_, setClass] = useState<any>({});
    const [group, setGroup] = useState<any>({});
    const [groups, setGroups] = useState<any[]>([]);
    const [srNo, setSrNo] = useState("");
    const [rollNo, setRollNo] = useState("");
    const { setSuccess } = useSuccess();
    const { setError } = useError();
    const { data } = useFetch("/api/get/groups");

    const setGroupGen = (x: any) => () => setGroup(x); 

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            students: [
                {
                    srNo,
                    rollNo,
                    class: { grade: class_.grade, section: class_.section },
                    group: group.name,
                },
            ],
        };

        post("/api/add/students", data).then((res) => {
            if (res.status === 200) {
                setSuccess("Students added successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    useEffect(() => {
        if (data?.groups) {
            setGroups(data.groups);
            if (data.groups.length) {
                setGroup(data.groups[0]);
            }
        }
    }, [data]);

    return (
        <>
            <div>
                <h2 className="text-3xl my-6">Add Students</h2>
                <form>
                    <div>
                        <h3 className="text-2xl my-4">Serial Number</h3>
                        <Input
                            required
                            label="serial number"
                            onChange={(e) => setSrNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Roll Number </h3>
                        <Input
                            required
                            type="number"
                            label="roll number"
                            onChange={(e) => setRollNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Class</h3>
                        <FormControl>
                            <SelectClass
                                selectedClass={class_}
                                selectClass={setClass}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Group</h3>
                        <FormControl>
                            <TextField
                                required
                                select
                                value={group}
                                label="group"
                            >
                                {groups.map((group) => {
                                    return (
                                        <MenuItem
                                            key={group.id}
                                            value={group}
                                            onClick={setGroupGen(group)}
                                        >
                                            {group.name}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="w-full flex justify-center items-center my-8">
                        <Button onClick={onFormSubmit}>ADD</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddStudent;
