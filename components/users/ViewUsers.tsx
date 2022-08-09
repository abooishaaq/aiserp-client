import { Divider } from "@mui/material";
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
              <div>
                <h3>{user.name}</h3>
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
              <Divider />
              <Space />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ViewUsers;
