import { Divider } from "@mui/material";
import Link from "next/link";
import { gradeToRoman } from "../../lib/grade";
import { IClass } from "../../lib/types";
import Space from "../Space";

const ViewClass = (props: IClass) => {
    return (
        <>
            <h1>
                {gradeToRoman(props.grade)}-{props.section}
            </h1>
            <div>
                <h2>Class Teacher</h2>
                <h3>{props.teacher.user.name}</h3>
                <p>
                    <Link
                        href={{
                            pathname: "/admin/users/[id]",
                            query: { id: props.teacher.user.id },
                        }}
                    >
                        <a>View User</a>
                    </Link>
                </p>
                <p>
                    <Link
                        href={{
                            pathname: "/admin/teachers/[id]",
                            query: { id: props.teacher.id },
                        }}
                    >
                        <a>View Teacher</a>
                    </Link>
                </p>
            </div>
            <Space size={1} />
            <Divider />
            <Space size={1} />
            <div>
                <h2>Students</h2>
                {props.students
                    ? props.students.map((student: any) => {
                          return (
                              <div key={student.id}>
                                  <h3>{student.profile.name}</h3>
                                  <p>
                                      id:&nbsp;
                                      <Link
                                          href={{
                                              pathname: "/admin/students/[id]",
                                              query: { id: student.id },
                                          }}
                                      >
                                          <a>{student.id}</a>
                                      </Link>
                                  </p>
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

export default ViewClass;
