import { Button, Input } from "../ui";
import { FormEvent, useState } from "react";
import SelectClasses from "../select/SelectClasses";
import { post } from "../../lib/fetch";
import { useSuccess } from "../../lib/message";

const AddNotice = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [classes, setClasses] = useState<string[]>([]);
    const { setSuccess } = useSuccess();

    const onFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            notice: { title, content },
            classes,
        };

        
        post("/api/add/notice", data).then((res) => {
            setTitle("");
            setContent("");
            setClasses([]);
            if (res.ok) {
                setSuccess("Notice added successfully!");
            } else {
                res.json().then((err) => {
                    setSuccess(err.message);
                });
            }
        });
    };

    return (
        <div>
            <h1>Add Notice</h1>
            <form onSubmit={onFormSubmit}>
                <div className="my-4">
                    <Input
                        label="title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="my-4">
                    <SelectClasses
                        selectedClasses={classes}
                        selectClasses={setClasses}
                    />
                </div>
                <div className="my-4">
                    <textarea
                        rows={10}
                        value={content}
                        required
                        onChange={(e) => setContent(e.target.value)}
                        className="block p-2.5 h-16 w-96 w-full text-sm text-blue bg-beige rounded-lg border border-blue"
                    />
                </div>
                <Button type="submit">Add Notice</Button>
            </form>
        </div>
    );
};

export default AddNotice;
