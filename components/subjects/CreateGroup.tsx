import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Input } from "../ui";
import { Button } from "../ui";
import SelectSubjects from "../select/SelectSubjects";

const CreateGroup = () => {
    const [name, setName] = useState<string>("");
    const [subjects, setSubjects] = useState<string[]>([]);

    const { setError } = useError();
    const { setSuccess } = useSuccess();

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter a name");
            return;
        }

        if (!subjects.length) {
            setError("Please select at least one subject");
            return;
        }

        const data = {
            name,
            subjects,
        };

        post("/api/create/group", data).then((res) => {
            if (res.status === 200) {
                setError("");
                setSuccess("Group created successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <h2 className="text-3xl my-8">Create Group</h2>
            <div className="flex justify-center items-center flex-col max-h-screen bg-beige/95">
                <form className="flex flex-col jusitfy-center items-center">
                    <div>
                        <label>Name</label>
                        <Input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value.toLowerCase())
                            }
                        />
                    </div>
                    <SelectSubjects
                        selectSubjects={setSubjects}
                        selectedSubjects={subjects}
                    />
                    <div className="w-full flex justify-center items-center my-8">
                        <Button onClick={onFormSubmit}>Add</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateGroup;
