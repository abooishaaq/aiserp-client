import { FormEvent, useState } from "react";
import { useError, useSuccess } from "../../lib/message";
import { post } from "../../lib/fetch";
import { Input, Button } from "../ui";

const AddSubject = () => {
    const [name, setName] = useState<string>("");
    const { setError } = useError();
    const { setSuccess } = useSuccess();

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter a subject name");
            return;
        }

        const data = {
            name,
        };

        post("/api/add/subject", data).then((res) => {
            if (res.status === 200) {
                setError("");
                setSuccess("Subject added successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <div className="flex justify-center items-center my-8">
                <form
                    onSubmit={onFormSubmit}
                    className="flex justify-center items-center flex-col"
                >
                    <Input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        label="name"
                    />
                    <div className="w-full flex justify-center items-center my-8">
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddSubject;
