import { FormEvent, useEffect, useState } from "react";
import { post, useFetch } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Button, Input } from "../neumorphic";
import SelectClass from "../select/SelectClass";
import { FormControl, MenuItem, TextField } from "@mui/material";

const AddStudent = () => {
  const [class_, setClass] = useState<any>({});
  const [group, setGroup] = useState<any>({});
  const [groups, setGroups] = useState<any[]>([]);
  const [srNo, setSrNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const { setSuccess } = useSuccess();
  const { setError } = useError();
  const { data } = useFetch("/api/get/groups");

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
        <h2>Add Students</h2>
        <p>
          Select class and subject group and then upload an xlsx containing
          name, emails(spearated by space if their are multiple), roll number
        </p>
        <form>
          <div>
            <h3>Serial Number</h3>
            <Input
              required
              placeholder="serial number"
              onChange={(e) => setSrNo(e.target.value)}
            />
          </div>
          <div>
            <h3>Roll Number </h3>
            <Input
              required
              type="number"
              placeholder="25"
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>

          <FormControl fullWidth>
            <h3>Class</h3>
            <SelectClass selectedClass={class_} selectClass={setClass} />
          </FormControl>
          <FormControl fullWidth>
            <h3>Group</h3>
            <TextField required select value={group} label="group">
              {groups.map((group) => {
                return (
                  <MenuItem
                    key={group.id}
                    value={group}
                    onClick={() => setGroup(group)}
                  >
                    {group.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
          <Button onClick={onFormSubmit}>ADD</Button>
        </form>
      </div>
    </>
  );
};

export default AddStudent;
