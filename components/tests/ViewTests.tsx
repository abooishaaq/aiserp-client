import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { monthNames } from "../../lib/constants";
import { useFetch } from "../../lib/fetch";
import { gradeToRoman, numToGrade } from "../../lib/grade";
import { Input } from "../neumorphic";
import Space from "../Space";

const ViewTests = () => {
    const [tests, setTests] = useState<any[]>([]);
    const [search, setSearch] = useState<string[]>([]);
    const { data, refresh } = useFetch("/api/get/tests");

    useEffect(() => {
        if (data?.tests) {
            setTests(data.tests);
        }
    }, [data]);

    return (
        <>
            <h2>View Tests</h2>
            <Input
                placeholder="march english assessment"
                onChange={(e) => setSearch(e.target.value.split(/\s+/))}
            ></Input>
            <div className="left-align"><a onClick={refresh}>refresh</a></div>
            <div className="tests-container">
                {tests
                    .filter((test) => {
                        const ok = search
                            .map((s) => {
                                if (!s) return true;

                                if (
                                    test.subjectName
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    test.type
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                const date = new Date(test.date);
                                if (
                                    date.getMonth() ===
                                        monthNames.indexOf(s.toLowerCase()) ||
                                    monthNames
                                        .filter((m) =>
                                            m
                                                .toLowerCase()
                                                .includes(s.toLowerCase())
                                        )
                                        .map((m) => m.toLowerCase())
                                        .includes(
                                            monthNames[
                                                date.getMonth()
                                            ].toLowerCase()
                                        )
                                ) {
                                    return true;
                                }

                                const grade_ = test.grade;

                                if (
                                    grade_
                                        .toLowerCase()
                                        .includes(s.toLowerCase()) ||
                                    numToGrade(s)
                                        .toLowerCase()
                                        .includes(grade_.toLowerCase())
                                ) {
                                    return true;
                                }
                            })
                            .reduce((a, b) => a && b, true);

                        return search.filter((x) => x).length === 0 || ok;
                    })
                    .map((test) => (
                        <Fragment key={test.id}>
                            <Space size={2} />
                            <div>
                                <h3>{new Date(test.date).toDateString()}</h3>
                                <h4>
                                    {test.subjectName} {test.type} for{" "}
                                    {gradeToRoman(test.grade)}
                                </h4>
                                <Link
                                    href={{
                                        pathname: "/admin/tests/[id]",
                                        query: {
                                            id: test.id,
                                        },
                                    }}
                                >
                                    <a>View</a>
                                </Link>
                            </div>
                        </Fragment>
                    ))}
            </div>
            <style jsx>{`
                .tests-container {
                    max-height: 70vh;
                    overflow-y: scroll;
                }
            `}</style>
        </>
    );
};

export default ViewTests;
