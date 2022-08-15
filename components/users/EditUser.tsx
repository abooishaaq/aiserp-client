import { FormEvent, useEffect, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { IUser } from "../../lib/types";
import { Input, Button } from "../ui";

const EditUser = ({ user }: IUser) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { setError } = useError();
    const { setSuccess } = useSuccess();

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            id: user.id,
            name,
            email,
        };

        post("/api/update/user", data).then((res) => {
            if (res.status === 200) {
                setSuccess("User updated successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <h2 className="text-3xl my-6">Edit </h2>
            <form onSubmit={onFormSubmit}>
                <div>
                    <label>Name</label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button type="submit">Update</Button>
            </form>
        </>
    );
};

export default EditUser;
