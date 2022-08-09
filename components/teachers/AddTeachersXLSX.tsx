import { FormEvent, useRef } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { validateEmail } from "../../lib/regex";
import { Button } from "../neumorphic";

const teachersXLSXColumns = ["name", "email", "phone"];

const AddTeachersXLSX = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const inputForm = useRef<HTMLFormElement>(null);
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const clickFileInput = () => {
    fileInput.current!.click();
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const xlsx = await import("xlsx");
    const phone = (await import("phone")).phone;

    if (fileInput.current?.files?.length === 0) return;
    const file = fileInput.current!.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target!.result;
      const workbook = xlsx.read(data, { type: "binary" });

      const sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]];

      let teachers = xlsx.utils.sheet_to_json(sheet) as any[];

      const isValid = teachers.every((teacher) => {
        return (
          teacher["name"] &&
          teacher["email"] &&
          teacher["phone"] &&
          validateEmail(teacher["email"])
        );
      });

      if (!isValid) {
        setError("Invalid Sheet");
        return;
      }

      // convert phone to string
      // validate reformat phone numbers
      let ok = true;
      let error = "";
      for (const teacher of teachers) {
        const phoneNumber = phone(teacher["phone"].toString());
        if (!phoneNumber.isValid) {
          ok = false;
          error = `Invalid phone number ${teacher["phone"]}`;
          break;
        } else {
          teacher["phone"] = phoneNumber.phoneNumber;
        }
      }

      if (!ok) {
        setError(error);
        return;
      }

      post("/api/add/teachers", { teachers })
        .then((res) => {
          if (res.status === 200) {
            setError("");
            setSuccess("Teachers added successfully");
          } else {
            res.json().then((err) => {
              setError(err.message);
            });
          }
        })
        .catch((err) => {
          setError(err.message);
        });
      inputForm.current!.reset();
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <h2>Upload XLSX</h2>
      <p>
        Upload an excel sheet with the following columns:{" "}
        {teachersXLSXColumns.join(", ")}. These column names should be specified
        in the first row.
      </p>
      <div>
        <Button onClick={clickFileInput}>File Upload</Button>
      </div>
      <form ref={inputForm}>
        <input
          type="file"
          ref={fileInput}
          onChange={onFormSubmit}
          accept=".xlsx"
          hidden
        />
      </form>
      <style jsx>{`
        div {
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

export default AddTeachersXLSX;
