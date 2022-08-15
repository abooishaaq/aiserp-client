import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { validateEmail } from "../../lib/regex";
import { Input, Button } from "../ui";

const AddTeacher = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const { setError } = useError();
    const { setSuccess } = useSuccess();

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setBtnDisabled(true);
        const phone = (await import("phone")).phone;

        if (!email || !name || !phone) {
            setError("Please fill out all fields");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email");
            return;
        }

        const { isValid, phoneNumber } = phone(phoneNum);

        if (!isValid) {
            setError(`Invalid phone number ${phoneNum}`);
            setBtnDisabled(false);
            return;
        }

        const teacher = {
            email,
            name,
            phone: phoneNumber,
        };

        post("/api/add/teachers", { teachers: [teacher] })
            .then((res) => {
                if (res.status === 200) {
                    setEmail("");
                    setName("");
                    setError("");
                    setSuccess("Teacher added successfully");
                    setBtnDisabled(false);
                } else {
                    res.json().then((err) => {
                        setError(err.message);
                        setBtnDisabled(false);
                    });
                }
            })
            .catch((err) => {
                setError(err.message);
                setBtnDisabled(false);
            });
    };

    return (
        <>
            <h2 className="text-3xl my-6">Add Teacher</h2>
            <div>
                <form onSubmit={onFormSubmit}>
                    <div className="my-1 flex flex-col">
                        <label>name</label>
                        <Input
                            value={name}
                            required
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            className="col-start-1 col-end-4"
                        />
                    </div>
                    <div className="my-1 flex flex-col">
                        <label>email</label>
                        <Input
                            value={email}
                            required
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="col-start-1 col-end-4"
                        />
                    </div>
                    <div className="my-1 flex flex-col">
                        <label>phone</label>
                        <Input
                            value={phoneNum}
                            required
                            name="phone"
                            type="tel"
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <Button type="submit" disabled={btnDisabled}>
                            ADD
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTeacher;
