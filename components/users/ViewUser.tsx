import Copyable from "../Copyable";
import Link from "next/link";

const ViewUser = (props: any) => {
    const { user } = props;
    return (
        <>
            <h1 className="text-4xl font-semibold my-8">{user.name}</h1>
            <Copyable>
                <p>{user.email}</p>
            </Copyable>
            <Copyable>
                <p>{user.phone}</p>
            </Copyable>
            {user.teacher ? (
                <div>
                    <h3 className="text-2xl my-4">Teacher</h3>
                    <p>
                        <Link
                            href={{
                                pathname: "/admin/teachers/[id]",
                                query: { id: user.teacher.id },
                            }}
                        >
                            <a>{user.teacher.id}</a>
                        </Link>
                    </p>
                </div>
            ) : null}
            {user.students && user.students.length ? (
                <div>
                    <h3 className="text-2xl my-4">Students</h3>
                    {user.students.map((student: any) => (
                        <Link
                            key={student.id}
                            href={{
                                pathname: "/admin/students/[id]",
                                query: { id: student.id },
                            }}
                        >
                            <a>
                                <p>{student.name}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            ) : null}
        </>
    );
};

export default ViewUser;
