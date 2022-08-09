import { TextareaAutosize, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormEvent, useState } from "react";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { Input, Button } from "../neumorphic";

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
  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const phone = (await import("phone")).phone;

    if (name === "") {
      setError("Name is required");
      return;
    }

    if (srNo === "") {
      setError("Sr. No. is required");
      return;
    }

    const { isValid: isValid1, phoneNumber: p1 } = phone(phone1, {
      country: "IN",
    });
    if (phone1 !== "" && isValid1) {
      setError(`Invalid phone number ${phone1}`);
      return;
    }

    const { isValid: isValid2, phoneNumber: p2 } = phone(phone2, {
      country: "IN",
    });
    if (phone2 !== "" && isValid2) {
      setError(`Invalid phone number ${phone2}`);
      return;
    }

    if (fatherName === "") {
      setError("Father's name is required");
      return;
    }

    if (motherName === "") {
      setError("Mother's name is required");
      return;
    }

    if (fatherOcc === "") {
      setError("Father's occupation is required");
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
        <h2>Add Profiles</h2>
        <form onSubmit={onFormSubmit}>
          <div>
            <h3>Serial Number</h3>
            <Input
              required
              value={srNo}
              placeholder="serial number"
              onChange={(e) => setSrNo(e.target.value)}
            />
          </div>
          <div>
            <h3>Name</h3>
            <Input
              required
              value={name}
              placeholder="Saif bin Faisal"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h3>Emails </h3>
            <Input
              required
              placeholder="saifbinfaisal@gmail.com faisalabusaif@gmail.com"
              value={emails.join(" ")}
              onChange={(e) => setEmails(e.target.value.split(/\s+/))}
            />
          </div>
          <div>
            <h3>Phone 1</h3>
            <Input
              required
              placeholder="9140248919"
              type="tel"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
            />
          </div>
          <div>
            <h3>Phone 2</h3>
            <Input
              required
              placeholder="8840387436"
              type="tel"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </div>
          <div>
            <h3>Father Name</h3>
            <Input
              required
              value={fatherName}
              placeholder="Faisal Abu Saif"
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
          <div>
            <h3>Mother Name</h3>
            <Input
              required
              value={motherName}
              placeholder="Umm Saif"
              onChange={(e) => setMotherName(e.target.value)}
            />
          </div>
          <div>
            <h3>Father&apos; Occupation</h3>
            <TextareaAutosize
              required
              value={fatherOcc}
              style={{ width: "100%", height: "50px" }}
              onChange={(e) => setFatherOcc(e.target.value)}
            />
          </div>
          <div>
            <h3>Mother&apos;s Occupation</h3>
            <TextareaAutosize
              required
              value={motherOcc}
              style={{ width: "100%", height: "50px" }}
              onChange={(e) => setMotherOcc(e.target.value)}
            />
          </div>
          <div>
            <h3>Address</h3>
            <TextareaAutosize
              required
              name="address"
              value={address}
              style={{ width: "100%", height: "50px" }}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <h3>Date of Birth</h3>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={dob}
                onChange={setDob}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>
          <Button type="submit">ADD</Button>
        </form>
      </div>
      <style jsx>{`
        .select-container {
          display: grid;
          grid-template-rows: repeat(1fr, 5);
        }
      `}</style>
    </>
  );
};

export default AddProfile;
