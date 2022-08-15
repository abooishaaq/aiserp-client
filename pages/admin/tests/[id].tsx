import { useRef } from "react";
import { useRouter } from "next/router";
import { useError } from "../../../lib/message";
import Space from "../../../components/Space";
import { useFetch } from "../../../lib/fetch";
import Loader from "../../../components/Loader";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import { Button } from "../../../components/ui";

const UploadMarksXLSX = ({ testId }: { testId: string }) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const inputForm = useRef<HTMLFormElement>(null);

    const clickFileInput = () => {
        fileInput.current?.click();
    };

    return (
        <>
            <h3 className="text-2xl my-4">Upload Marks</h3>
            <form ref={inputForm}>
                <input
                    type="file"
                    name="file"
                    accept=".xlsx"
                    ref={fileInput}
                    hidden
                />
                <div className="w-full flex justify-center items-center my-8">
                    <Button onClick={clickFileInput}>UPLOAD</Button>
                </div>
            </form>
        </>
    );
};

const UploadMarks = ({ testId }: { testId: string }) => {
    return (
        <>
            <h3 className="text-2xl my-4">Add Marks</h3>
            <Space />
            <hr />
            <Space />
            <UploadMarksXLSX testId={testId} />
        </>
    );
};

const Test = () => {
    const router = useRouter();
    const { setError } = useError();
    let { id: _id } = router.query;

    if (_id === undefined) {
        setError("Test not found");
        _id = "";
    }

    const id = typeof _id === "string" ? _id : _id[0];
    const {
        data: { test },
        loading,
    } = useFetch(`/api/get/test/${id}`);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>
                    Test | {test.subjectName} {test.type}
                </title>
            </Head>
            <AdminDashContainer>
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <h1 className="text-4xl font-semibold my-8">
                        {test.subjectName} {test.type}
                    </h1>
                    <h2 className="text-3xl my-6">
                        {new Date(test.date).toDateString()}
                    </h2>
                    {test.marks &&
                        test.marks.map((marks: any) => (
                            <div key={marks.id}>
                                <h3 className="text-2xl my-4">{marks.marks}</h3>
                            </div>
                        ))}
                    {test.marks && test.marks.length === 0 ? (
                        <UploadMarks testId={id} />
                    ) : null}
                </div>
            </AdminDashContainer>
        </>
    );
};

export default Test;
