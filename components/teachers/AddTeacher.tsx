import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { validateEmail } from "../../lib/regex";
import { Input, Button } from "../neumorphic";

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
                    <div className="row">
                        <label>name</label>
                        <Input
                            value={name}
                            required
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <label>email</label>
                        <Input
                            value={email}
                            required
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <label>phone</label>
                        <Input
                            value={phoneNum}
                            required
                            name="phone"
                            type="tel"
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </div>
                    <div className="btn-container">
                        <Button type="submit" disabled={btnDisabled}>
                            <p className="btn-text">ADD</p>
                        </Button>
                    </div>
                </form>
            </div>
            <style jsx>{`
                .row {
                    display: grid;
                    grid-template-columns: 1fr 3fr;
                    align-items: center;
                }

                .btn-container{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                .btn-text {
                    margin: 0;
                    padding: 0;
                    font-size: 1rem;
                }

                form > div {
                    margin-bottom: 1rem;
                }
            `}</style>
        </>
    );
};

export default AddTeacher;
