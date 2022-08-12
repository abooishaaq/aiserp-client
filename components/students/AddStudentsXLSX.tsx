import { FormEvent, useRef } from "react";
import { post } from "../../lib/fetch";
import { useSuccess, useError } from "../../lib/message";
import { Button } from "../neumorphic";

const studentsXLSXColumns = ["srNo", "grade", "section", "group"];

const AddStudentsXLSX = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const inputForm = useRef<HTMLFormElement>(null);
    const { setSuccess } = useSuccess();
    const { setError } = useError();

    const clickFileInput = () => {
        fileInput.current!.click();
    };

    const handleFileChange = async (e: FormEvent) => {
        const xlsx = await import("xlsx");
        if (fileInput.current?.files?.length === 0) return;
        const file = fileInput.current!.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target!.result;
            const workbook = xlsx.read(data, { type: "binary" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            const students = xlsx.utils.sheet_to_json(sheet) as any[];

            const postData = {
                students: students.map((student) => {
                    const { srNo, grade, section, group } = student;
                    return {
                        srNo,
                        grade: grade.toString(),
                        section: section,
                        group: group,
                    };
                }),
            };

            post("/api/add/students", postData).then((res) => {
                if (res.status === 200) {
                    setSuccess("Students added successfully");
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
            <h2 className="text-3xl my-6">Upload Students XLSX</h2>
            <p>
                The sheet should contains six columns in this order: name,
                emails(separated by space), roll number, grade, section, and
                group name
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
            <div className="btn-container">
                <Button onClick={clickFileInput}>Upload</Button>
            </div>
            <style jsx>{`
                .btn-container{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

export default AddStudentsXLSX;
