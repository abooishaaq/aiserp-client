import Link from "next/link";
import { useState, useEffect } from "react";
import { useFetch } from "../../lib/fetch";
import Copyable from "../Copyable";
import { FixedSizeList as List } from "react-window";
import { Input } from "../ui";

const ViewUsers = () => {
    const { data, refresh } = useFetch("/api/get/users");
    const [users, setUsers] = useState<any[]>([]);
    const [shownUsers, setShownUsers] = useState<any[]>([]);
    const [search, setSearch] = useState<string[]>([]);

    useEffect(() => {
        if (data?.users) {
            setUsers(data.users);
            setShownUsers(data.users);
        }
    }, [data]);

    useEffect(() => {
        if (search.length === 0) {
            setShownUsers(users);
            return;
        }
        setShownUsers(
            users.filter((user) => {
                for (const word of search) {
                    return (
                        user.name.toLowerCase().includes(word.toLowerCase()) ||
                        user.type.toLowerCase().includes(word.toLowerCase()) ||
                        user.email?.toLowerCase().includes(word.toLowerCase()) ||
                        user.phone?.includes(word)
                    );
                }
            })
        );
    }, [search, users]);

    const User = ({ index, style }: { index: number; style: any }) => {
        const user = shownUsers[index];
        return (
            <div key={user.id} style={style} className="my-4 px-4 py-2">
                <div className="bg-burlywood h-36 my-2 rounded">
                    <h3 className="text-2xl my-4">{user.name}</h3>
                    <Copyable>
                        <p>{user.email}</p>
                    </Copyable>
                    <Copyable>
                        <p>{user.phone}</p>
                    </Copyable>
                    <Link
                        href={{
                            pathname: "/admin/users/[id]",
                            query: { id: user.id },
                        }}
                    >
                        <a>View/Edit</a>
                    </Link>
                </div>
                <hr />
            </div>
        );
    };

    return (
        <>
            <Input
                label="search"
                value={search.join(" ")}
                onChange={(e) => setSearch(e.target.value.split(/\s+/))}
            />
            <div className="flex jutify-start items-center px-4 py-2">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list rounded py-2 overflow-scroll bg-burlywood">
                <List
                    height={700}
                    itemCount={shownUsers.length}
                    itemSize={180}
                    width="100%"
                >
                    {User}
                </List>
            </div>
        </>
    );
};

export default ViewUsers;
