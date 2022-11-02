import { FormEvent, useRef } from "react";
import { post } from "../../lib/fetch";
import { useSuccess, useError } from "../../lib/message";
import { Button } from "../ui";

const profileXLSXColumns = [
    "srNo",
    "name",
    "fatherName",
    "motherName",
    "dob",
    "address",
    "phone1",
    "phone2",
    "fatherOcc",
    "motherOcc",
    "emails",
    "gender",
];

const AddProfilesXLSX = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const inputForm = useRef<HTMLFormElement>(null);
    const { setSuccess } = useSuccess();
    const { setError } = useError();

    const clickFileInput = () => {
        fileInput.current!.click();
    };

    const handleFileChange = async (e: FormEvent) => {
        const xlsx = await import("xlsx");
        const phone = (await import("phone")).phone;
        if (fileInput.current?.files?.length === 0) return;
        const file = fileInput.current!.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target!.result;
            const workbook = xlsx.read(data, {
                type: "binary",
                cellDates: true,
            });

            const sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]];

            const students = xlsx.utils.sheet_to_json(sheet) as any[];

            const keys = new Set(students.flatMap((x) => Object.keys(x)));

            const missingColumns = profileXLSXColumns.filter(
                (x) => !keys.has(x)
            );

            if (missingColumns.length) {
                setError(`Missing columns: ${missingColumns.join(", ")}`);
                return;
            }

            let ok = true;

            // validate phone1 and phone2 and replace them with fromatted phone numbers
            students.map((x) => {
                if (!/\+91\d{10}/.test(x.phone1)) {
                    x.phone1 = "+91" + x.phone1;
                }
                if (!/\+91\d{10}/.test(x.phone2)) {
                    x.phone2 = "+91" + x.phone2;
                }

                const { isValid: isValid1, phoneNumber: p1 } = phone(x.phone1, {
                    country: "IN",
                });

                if (!isValid1) {
                    setError(`Invalid phone number: ${x.phone1} for ${x.name}`);
                    ok = false;
                    return;
                }

                const { isValid: isValid2, phoneNumber: p2 } = phone(x.phone2, {
                    country: "IN",
                });

                if (!isValid2) {
                    setError(`Invalid phone number: ${x.phone2} for ${x.name}`);
                    ok = false;
                    return;
                }

                return {
                    ...x,
                    phone1: p1,
                    phone2: p2,
                };
            });

            if (!ok) {
                return;
            }

            const postData = {
                profiles: students.map((x) => ({
                    ...x,
                    phone1: `${x.phone1}`,
                    phone2: `${x.phone2}`,
                    dob: new Date(x.dob).toString(),
                    emails: x.emails.split(" "),
                })),
            };

            post("/api/add/profiles", postData).then((res) => {
                if (res.status === 200) {
                    setSuccess("Profiles added successfully");
                } else {
                    res.json().then((err) => {
                        setError(err.message);
                    });
                }
            });
        };
        reader.readAsBinaryString(file);
        inputForm.current!.reset();
    };

    return (
        <>
            <h2 className="text-3xl my-6">Upload Profiles XLSX</h2>
            <p>
                The sheet should contains these column names in the top row in
                any order: {profileXLSXColumns.join(", ")}.
                <br /> Date of Birth(dob) should be in yyyy/mm/dd format.
                <br /> Emails should be separated by space.
            </p>
            <form ref={inputForm}>
                <input
                    type="file"
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept=".xlsx"
                    hidden
                />
            </form>
            <div className="flex justify-center w-full my-8">
                <Button onClick={clickFileInput}>Upload</Button>
            </div>
        </>
    );
};

export default AddProfilesXLSX;
