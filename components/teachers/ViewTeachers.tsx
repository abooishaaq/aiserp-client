import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useFetch } from "../../lib/fetch";
import { numToGrade } from "../../lib/grade";
import Copyable from "../Copyable";
import { Input } from "../ui";
import { FixedSizeList as List } from "react-window";

const ViewTeachers = () => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [search, setSearch] = useState<string[]>([]);
    const [shownTeachers, setShownTeachers] = useState<any[]>([]);

    const { data, refresh } = useFetch("/api/get/teachers");

    useEffect(() => {
        if (data) {
            setTeachers(data.teachers);
            setShownTeachers(data.teachers);
        }
    }, [data]);

    useEffect(() => {
        setShownTeachers(
            teachers && teachers.length
                ? teachers.filter((teacher: any) => {
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
                : []
        );
    }, [search, teachers]);

    const Teacher = ({ index }: { index: number }) => {
        const teacher = shownTeachers[index];
        return (
            <Fragment key={teacher.id}>
                <div className="h-40">
                    <h2 className="text-3xl my-6">{teacher.user.name}</h2>
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
                                    {teacher.class.grade}-
                                    {teacher.class.section}
                                </a>
                            </Link>
                        </p>
                    ) : null}
                    <div className="flex justify-center w-full">
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
                <hr />
            </Fragment>
        );
    };

    return (
        <>
            <h2 className="text-3xl my-6">View Teachers</h2>
            <Input
                value={search.join(" ")}
                onChange={(e) => setSearch(e.target.value.split(/s+/))}
                label="search"
            />
            <div className="flex jutify-start items-center px-4 py-2">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list rounded px-4 py-2 overflow-scroll bg-burlywood">
                <List
                    height={700}
                    itemCount={shownTeachers.length}
                    itemSize={160}
                    width="100%"
                >
                    {Teacher}
                </List>
            </div>
        </>
    );
};

export default ViewTeachers;
