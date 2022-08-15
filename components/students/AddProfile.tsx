import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Input, Button, DateInput } from "../ui";

const AddProfile = () => {
    const [name, setName] = useState("");
    const [srNo, setSrNo] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [fatherOcc, setFatherOcc] = useState("");
    const [motherOcc, setMotherOcc] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState<Date | null>(new Date());
    const [gender, setGender] = useState("MALE");
    const { setSuccess } = useSuccess();
    const { setError } = useError();

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const phone = (await import("phone")).phone;

        const { isValid: isValid1, phoneNumber: p1 } = phone(phone1, {
            country: "IN",
        });
        if (!isValid1) {
            setError(`Invalid phone number ${phone1}`);
            return;
        }

        const { isValid: isValid2, phoneNumber: p2 } = phone(phone2, {
            country: "IN",
        });
        if (!isValid2) {
            setError(`Invalid phone number ${phone2}`);
            return;
        }

        if (dob === null) {
            setError("Date of birth is required");
            return;
        }

        const data = {
            profiles: [
                {
                    name,
                    srNo,
                    emails,
                    phone1: p1,
                    phone2: p2,
                    fatherName,
                    motherName,
                    fatherOcc,
                    motherOcc,
                    address,
                    dob: dob.toDateString(),
                },
            ],
        };

        post("/api/add/profiles", data).then((res) => {
            if (res.status === 200) {
                setSuccess("Profile added successfully");
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <div>
                <h2 className="text-3xl my-6">Add Profile</h2>
                <form onSubmit={onFormSubmit}>
                    <div>
                        <h3 className="text-2xl my-4">Serial Number</h3>
                        <Input
                            required
                            value={srNo}
                            label="serial number"
                            onChange={(e) => setSrNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Name</h3>
                        <Input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="name"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Gender</h3>
                        <FormControl>
                        <Select value={gender} onChange={
                            (e) => setGender(e.target.value)
                        }>
                            <MenuItem value="MALE">MALE</MenuItem>
                            <MenuItem value="FEMALE">FEMALE</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Emails </h3>
                        <Input
                            required
                            label="email"
                            value={emails.join(" ")}
                            onChange={(e) =>
                                setEmails(e.target.value.split(/\s+/))
                            }
                        />
                    </div>

                    <div>
                        <h3 className="text-2xl my-4">Father Name</h3>
                        <Input
                            required
                            value={fatherName}
                            label="father's name"
                            onChange={(e) => setFatherName(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Mother Name</h3>
                        <Input
                            required
                            value={motherName}
                            label="mother's name"
                            onChange={(e) => setMotherName(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Father&apos;s phone</h3>
                        <Input
                            required
                            label="phone"
                            type="tel"
                            value={phone1}
                            onChange={(e) => setPhone1(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Mother&apos;s phone</h3>
                        <Input
                            required
                            label="phone"
                            type="tel"
                            value={phone2}
                            onChange={(e) => setPhone2(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Date of Birth</h3>
                        <DateInput value={dob} onChange={(d) => setDob(d)} />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">
                            Father&apos; Occupation
                        </h3>
                        <textarea
                            required
                            value={fatherOcc}
                            onChange={(e) => setFatherOcc(e.target.value)}
                            className="block p-2.5 h-16 w-96 w-full text-sm text-blue bg-beige rounded-lg border border-blue"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">
                            Mother&apos;s Occupation
                        </h3>
                        <textarea
                            required
                            value={motherOcc}
                            onChange={(e) => setMotherOcc(e.target.value)}
                            className="block p-2.5 h-16 w-96 w-full text-sm text-blue bg-beige rounded-lg border border-blue"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl my-4">Address</h3>
                        <textarea
                            required
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block p-2.5 h-16 w-96 w-full text-sm text-blue bg-beige rounded-lg border border-blue"
                        />
                    </div>
                    <div className="flex justify-center items-center w-full my-8">
                        <Button type="submit">ADD</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProfile;
