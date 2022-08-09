import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import { Divider } from "@mui/material";
import { Input } from "../neumorphic";
import Space from "../Space";

const SelectTeacher = ({ setTeacher }: { setTeacher: (_: string) => void }) => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/teachers");
    const [selectedTeacher, setSelectedTeacher] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const refreshed = useRef(false);

    useEffect(() => {
        if(refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });

    useEffect(() => {
        if (data?.teachers) {
            setTeachers(data.teachers);
        }
    }, [data]);

    const select = (teacher: string) => {
        if (teacher == selectedTeacher) {
            setSelectedTeacher("");
            setTeacher("");
        } else {
            setSelectedTeacher(teacher);
            setTeacher(teacher);
        }
    };

    return (
        <>
            <div>
                <h3>Select Teacher</h3>
                <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="saif@gmail.com Saif"
                />
                <Divider />
                <Space size={1} />
                <div className="long-list">
                    {teachers
                        .filter((teacher) => {
                            const splitted = search.split(" ");
                            for (const word of splitted) {
                                return (
                                    teacher.user.email.includes(word) ||
                                    teacher.user.name.includes(word)
                                );
                            }
                        })
                        .map((teacher: any) => {
                            return (
                                <div
                                    key={teacher.id}
                                    onClick={() => select(teacher.id)}
                                    className={`select-teacher-item ${
                                        selectedTeacher === teacher.id
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <h3>{teacher.user.name}</h3>
                                    <p>{teacher.user.email}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
            <style jsx>{`
                .select-teacher-item {
                    padding: 1.5rem;
                    cursor: pointer;
                    border-radius: 8px;
                }

                .selected {
                    border: 2px solid var(--blue);
                }
            `}</style>
        </>
    );
};

export default SelectTeacher;
