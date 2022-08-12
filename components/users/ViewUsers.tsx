
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useFetch } from "../../lib/fetch";
import Copyable from "../Copyable";
import Space from "../Space";

const ViewUsers = () => {
    const [users, setUsers] = useState<any[]>([]);

    const { data, refresh } = useFetch("/api/get/users");

    useEffect(() => {
        if (data?.users) {
            setUsers(data.users);
        }
    }, [data]);

    return (
        <>
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list">
                {users.map((user) => {
                    return (
                        <Fragment key={user.id}>
                            <div className="bg-beige my-2 px-4 py-2 rounded">
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
                            <Space />
                            <hr />
                            <Space />
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default ViewUsers;
