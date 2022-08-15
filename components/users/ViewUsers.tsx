import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useFetch } from "../../lib/fetch";
import Copyable from "../Copyable";
import Space from "../Space";
import { FixedSizeList as List } from "react-window";

const ViewUsers = () => {
    const [users, setUsers] = useState<any[]>([]);

    const { data, refresh } = useFetch("/api/get/users");

    useEffect(() => {
        if (data?.users) {
            setUsers(data.users);
        }
    }, [data]);

    const User = ({ index, style }: { index: number; style: any }) => {
        const user = users[index];
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
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list rounded py-2 overflow-scroll bg-burlywood">
                <List
                    height={700}
                    itemCount={users.length}
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
