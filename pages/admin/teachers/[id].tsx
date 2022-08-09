import { useFetch, post } from "../../../lib/fetch";
import { useEffect, useState } from "react";
import Copyable from "../../../components/Copyable";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Divider, Paper } from "@mui/material";
import { Button } from "../../../components/neumorphic";
import SelectSubject from "../../../components/select/SelectSubject";
import SelectClass from "../../../components/select/SelectClass";
import Space from "../../../components/Space";
import AuthAdmin from "../../../components/auth/AuthAdmin";
import { FormControl } from "@mui/material";
import { useError, useSuccess } from "../../../lib/message";
import Loader from "../../../components/Loader";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";

interface IViewEditClassSubjectProps {
  classSubjectId: string;
  classId: string;
  subjectName: string;
  teacherId: string;
}

const ViewEditClassSubject = (props: IViewEditClassSubjectProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(
    props.subjectName
  );
  const [selectedClass, setSelectedClass] = useState<string>(props.classId);
  return (
    <>
      <SelectSubject
        selectSubject={setSelectedSubject}
        selectedSubject={selectedSubject}
      />
      <SelectClass
        selectClass={setSelectedClass}
        selectedClass={selectedClass}
      />
    </>
  );
};

interface iAddClassSubjectProps {
  teacherId: string;
}

const AddClassSubject = ({ teacherId }: iAddClassSubjectProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<any>({});
  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const assign = () => {
    const data = {
      teacherId,
      classId: selectedClass.id,
      subject: selectedSubject,
    };

    post("/api/add/class-subject", data).then((res) => {
      if (res.ok) {
        setSuccess("class and subject assigned successfully");
      } else {
        res.json().then((err) => {
          setError(err.message);
        });
      }
    });
  };

  return (
    <>
      <Paper elevation={3}>
        <div className="row-grid">
          <FormControl fullWidth>
            <SelectSubject
              selectSubject={setSelectedSubject}
              selectedSubject={selectedSubject}
            />
          </FormControl>

          <FormControl fullWidth>
            <SelectClass
              selectClass={setSelectedClass}
              selectedClass={selectedClass}
            />
          </FormControl>
          <Button onClick={assign}>ASSIGN</Button>
        </div>
      </Paper>
      <style jsx>{`
        .row-grid {
          padding: 32px;
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
          grid-grap: 1em;
          width: 100%;
        }
      `}</style>
    </>
  );
};

interface IAssignClassSubjectsProps {
  teacherId: string;
  classSubjects: any[];
}

const AssignClassSubjects = ({ teacherId }: IAssignClassSubjectsProps) => {
  return (
    <>
      <h2>Assign Classes and Subjects</h2>
      <div>
        <AddClassSubject teacherId={teacherId} />
        <Space size={2} />
      </div>
      <style jsx>{`
        div {
          width: 100%;
        }

        div > * {
          width: 100%;
        }
      `}</style>
    </>
  );
};

const Teacher = () => {
  const router = useRouter();
  const { id } = router.query;
  const [teacher, setTeacher] = useState<any>({});
  const [classes, setClasses] = useState<any>({});
  const { data, status, loading } = useFetch(`/api/get/teacher/${id}`);

  useEffect(() => {
    if (data?.teacher) {
      setTeacher(data.teacher);
      const _classes: { [key: string]: any } = {};
      for (const classSubject of data.teacher.classSubjects) {
        if (typeof _classes[classSubject.class.id] === "object") {
          _classes[classSubject.class.id].subjects.push(
            classSubject.subject.name
          );
        } else {
          _classes[classSubject.class.id] = {
            grade: classSubject.class.grade,
            section: classSubject.class.section,
            subjects: [classSubject.subject.name],
          };
        }
      }
      setClasses(_classes);
    }
  }, [data]);

  if (status === 400) {
    <AdminDashContainer>
      <Container maxWidth="md">
        <p>teacher not found</p>
      </Container>
    </AdminDashContainer>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Teacher | {teacher.user.name}</title>
      </Head>
      <AdminDashContainer>
        <Container maxWidth="md">
          <h1>{teacher.user.name}</h1>
          <Copyable>
            <p>{teacher.user.email}</p>
          </Copyable>
          <Copyable>
            <p>id: {teacher.id}</p>
          </Copyable>
          <p>
            user: &nbsp;
            <Link
              href={{
                pathname: "/admin/users/[id]",
                query: { id: teacher.userId },
              }}
            >
              <a>{teacher.userId}</a>
            </Link>
          </p>
          <p>
            class:&nbsp;
            {teacher.class ? (
              <Link
                href={{
                  pathname: "/admin/classes/[id]",
                  query: { id: teacher.class.id },
                }}
              >
                <a>
                  {teacher.class.grade}-{teacher.class.section}
                </a>
              </Link>
            ) : (
              "None"
            )}
          </p>
          <div>
            teaches in classes: &nbsp;
            {Object.keys(classes).length ? (
              Object.keys(classes).map((classId) => (
                <div key={classId}>
                  <h3>
                    <Link
                      href={{
                        pathname: "/admin/classes/[id]",
                        query: { id: classId },
                      }}
                    >
                      <a>
                        {classes[classId].grade}-{classes[classId].section}
                      </a>
                    </Link>
                  </h3>
                  <div>
                    {classes[classId].subjects.map((subject: any) => (
                      <p key={subject}>{subject}</p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span>none</span>
            )}
          </div>
          <Space size={1} />
          <Divider />
          <Space size={1} />
          <AssignClassSubjects
            teacherId={teacher.id}
            classSubjects={teacher.classSubjects}
          />
        </Container>
      </AdminDashContainer>
    </>
  );
};

export default Teacher;
