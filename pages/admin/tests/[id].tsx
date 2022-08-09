import { useRef } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { Button } from "../../../components/neumorphic";
import { useSuccess, useError } from "../../../lib/message";

import { Divider } from "@mui/material";
import Space from "../../../components/Space";
import { useFetch } from "../../../lib/fetch";
import Loader from "../../../components/Loader";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";

const UploadMarksXLSX = ({ testId }: { testId: string }) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const inputForm = useRef<HTMLFormElement>(null);

    const clickFileInput = () => {
        fileInput.current?.click();
    };

    return (
        <>
            <h3>Upload Marks</h3>
            <form ref={inputForm}>
                <input
                    type="file"
                    name="file"
                    accept=".xlsx"
                    ref={fileInput}
                    hidden
                />
                <Button onClick={clickFileInput}>UPLOAD</Button>
            </form>
        </>
    );
};

const UploadMarks = ({ testId }: { testId: string }) => {
    return (
        <>
            <h3>Add Marks</h3>
            <Space />
            <Divider />
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
                <Container maxWidth="md">
                    <h1>
                        {test.subjectName} {test.type}
                    </h1>
                    <h2>{new Date(test.date).toDateString()}</h2>
                    {test.marks &&
                        test.marks.map((marks: any) => (
                            <div key={marks.id}>
                                <h3>{marks.marks}</h3>
                            </div>
                        ))}
                    {test.marks && test.marks.length === 0 ? (
                        <UploadMarks testId={id} />
                    ) : null}
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default Test;
