import { Divider } from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useFetch } from "../../lib/fetch";
import { numToGrade } from "../../lib/grade";
import Copyable from "../Copyable";
import { Input } from "../neumorphic";

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [search, setSearch] = useState<string[]>([]);

  const { data, refresh } = useFetch("/api/get/teachers");

  useEffect(() => {
    if (data) {
      setTeachers(data.teachers);
    }
  }, [data]);

  return (
    <>
      <h2>View Teachers</h2>
      <Input
        value={search.join(" ")}
        onChange={(e) => setSearch(e.target.value.split(/s+/))}
        width="100%"
        placeholder="Saif saif@gmail.com "
      />
      <div className="left-align">
        <a onClick={refresh}>refresh</a>
      </div>
      <div className="long-list">
        {typeof teachers === "object" &&
          teachers
            .filter((teacher: any) => {
              return search.every((s) => {
                let ok = teacher.user.name
                  .toLowerCase()
                  .includes(s.toLowerCase());
                ok ||= teacher.user.email
                  .toLowerCase()
                  .includes(s.toLowerCase());
                if (teacher.class) {
                  ok ||= teacher.class.grade === numToGrade(s);
                  ok ||= teacher.class.grade
                    .toLowerCase()
                    .includes(s.toLowerCase());
                  ok ||= teacher.class.section === s;
                  let class_ = s.split("-");
                  if (class_.length === 2) {
                    ok ||=
                      teacher.class.grade === class_[0] &&
                      teacher.class.section === class_[1];
                  }
                }
                return ok;
              });
            })
            .map((teacher: any) => (
              <Fragment key={teacher.id}>
                <div>
                  <h2>{teacher.user.name}</h2>
                  <Copyable>
                    <p>{teacher.user.email}</p>
                  </Copyable>
                  {teacher.user && (
                    <Link
                      href={{
                        pathname: "/admin/users/[id]",
                        query: { id: teacher.user.id },
                      }}
                    >
                      <a>{teacher.user.id}</a>
                    </Link>
                  )}
                  {teacher.class ? (
                    <p>
                      <Link
                        href={{
                          pathname: "/admin/classes/[id]",
                          query: {
                            id: teacher.class.id,
                          },
                        }}
                      >
                        <a>
                          {teacher.class.grade}-{teacher.class.section}
                        </a>
                      </Link>
                    </p>
                  ) : null}
                  <div className="btn-container">
                    <Link
                      href={{
                        pathname: "/admin/teachers/[id]",
                        query: { id: teacher.id },
                      }}
                    >
                      <a>View/Edit</a>
                    </Link>
                  </div>
                </div>
                <Divider />
              </Fragment>
            ))}
      </div>
      <style jsx>{`
        p {
          width: fit-content;
        }

        a {
          cursor: pointer;
        }

        .btn-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default ViewTeachers;
