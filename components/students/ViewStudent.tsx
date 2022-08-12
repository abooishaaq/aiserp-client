import Link from "next/link";
import { gradeToRoman } from "../../lib/grade";
import { IStudent } from "../../lib/types";
import Copyable from "../Copyable";

const ViewStudent = (student: IStudent) => {
    return (
        <>
            <h1 className="text-4xl font-semibold my-8">{student.profile.name}</h1>
            <Copyable>
                <p>id: {student.id}</p>
            </Copyable>
            <h3 className="text-2xl my-4">
                class:&nbsp;
                <Link
                    href={{
                        pathname: "/admin/classes/[id]",
                        query: { id: student.class.id },
                    }}
                >
                    <a>
                        {gradeToRoman(student.class.grade)}-
                        {student.class.section}
                    </a>
                </Link>
            </h3>
            <div>
                <h2 className="text-3xl my-6">group: {student.subjects?.name}</h2>
                {student.subjects?.subjects.map((subject: any) => {
                    return (
                        <div key={subject.name}>
                            <h3 className="text-2xl my-4">{subject.name}</h3>
                            {subject.tests.map((test: any) =>
                                JSON.stringify(test)
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ViewStudent;
