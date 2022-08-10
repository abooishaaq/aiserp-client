import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Button, Input } from "../neumorphic";
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
            <h1>Create Group</h1>
            <div className="container">
                <form>
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
                    <Button onClick={onFormSubmit}>Add</Button>
                </form>
            </div>
            <style jsx>{`
                form > div {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    align-items: center;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </>
    );
};

export default CreateGroup;
