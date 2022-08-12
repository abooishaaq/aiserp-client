import { useState } from "react";
import { useFetch } from "../lib/fetch";
import { Divider, Snackbar } from "@mui/material";
import { Input } from "./neumorphic";
import MuiAlert from "@mui/material/Alert";

const SelectGroup = ({ setGroup }: { setGroup: (_: string) => void }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const {
        data: { groups },
    } = useFetch("/api/get/groups");

    const select = (group: string) => {
        setSelectedGroup(group);
        setGroup(group);
    };

    return (
        <>
            <div>
                <h3 className="text-2xl my-4">Select Group</h3>
                <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="science"
                />
                <hr />
                <div className="space"></div>
                <div className="container backdrop-blur-lg max-h-screen">
                    {groups &&
                        groups
                            .filter((group: any) => {
                                return group.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            })
                            .map((group: any) => {
                                return (
                                    <div
                                        key={group.id}
                                        onClick={() => select(group.id)}
                                        className={`select-group-item ${
                                            selectedGroup === group.id
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        <h4>{group.name}</h4>
                                        <p>{group.email}</p>
                                    </div>
                                );
                            })}
                </div>
            </div>
            <style jsx>{`
                .select-group-item {
                    width: 100%;
                    cursor: pointer;
                    border-radius: 8px;
                    padding: 8px 16px;
                }

                .selected {
                    box-shadow: inset 5px 5px 5px #d6d6d6,
                        inset -5px -5px 5px #ffffff;
                }


                .space {
                    height: 2rem;
                }
            `}</style>
        </>
    );
};

export default SelectGroup;
