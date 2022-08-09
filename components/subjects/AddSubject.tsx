import { FormEvent, useState } from "react";
import { useError, useSuccess } from "../../lib/message";
import { post } from "../../lib/fetch";
import { Button, Input } from "../neumorphic";

const AddSubject = () => {
  const [name, setName] = useState<string>("");
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter a name");
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
      <div className="container">
        <form>
          <div>
            <label>Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>
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

export default AddSubject;
