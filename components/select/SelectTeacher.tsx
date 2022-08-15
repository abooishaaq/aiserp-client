import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import { FixedSizeList as List } from "react-window";
import {Input} from "../ui";
import Space from "../Space";

const SelectTeacher = ({ setTeacher }: { setTeacher: (_: string) => void }) => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/teachers");
    const [selectedTeacher, setSelectedTeacher] = useState<string>("");
    const [search, setSearch] = useState<string[]>([]);
    const [showedTeachers, setShowedTeachers] = useState<any[]>([]);
    const refreshed = useRef(false);

    useEffect(() => {
        if (refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });

    useEffect(() => {
        if (data?.teachers) {
            setTeachers(data.teachers);
            setShowedTeachers(data.teachers);
        }
    }, [data]);

    useEffect(() => {
        if (search.length > 0) {
            setShowedTeachers(
                teachers.filter((teacher) => {
                    for (const word of search) {
                        return (
                            teacher.user.email.includes(word) ||
                            teacher.user.name.includes(word)
                        );
                    }
                })
            );
        }
    }, [search, teachers]);

    const select = (teacher: string) => {
        if (teacher == selectedTeacher) {
            setSelectedTeacher("");
            setTeacher("");
        } else {
            setSelectedTeacher(teacher);
            setTeacher(teacher);
        }
    };

    const Teacher = ({ index, style }: any) => {
        const teacher = showedTeachers[index];

        return (
            <div
                className={`${
                    selectedTeacher == teacher.user.email
                        ? "shadow-xl border-blue border-2 rounded"
                        : ""
                } w-full p-2 `}
                onClick={() => select(teacher.user.email)}
            >
                <h2 className="text-xl">{teacher.user.name}</h2>
                <p className="text-lg">{teacher.user.email}</p>
            </div>
        );
    };

    return (
        <>
            <div>
                <h3 className="text-2xl my-4">Select Teacher</h3>
                <Input
                    value={search.join(" ")}
                    onChange={(e) => setSearch(e.target.value.split(/\s+/))}
                    placeholder="saif@gmail.com Saif"
                />
                <hr />
                <Space size={1} />
                <div className="long-list rounded px-4 py-2 overflow-scroll bg-burlywood">
                    <List
                        height={700}
                        itemCount={showedTeachers.length}
                        itemSize={30}
                        width="100%"
                    >
                        {Teacher}
                    </List>
                </div>
            </div>
        </>
    );
};

export default SelectTeacher;
