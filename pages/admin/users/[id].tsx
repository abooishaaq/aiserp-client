import { useFetch } from "../../../lib/fetch";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Divider } from "@mui/material";
import Space from "../../../components/Space";
import AdminDashContainer from "../../../components/dash/AdminDash";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loader from "../../../components/Loader";

const ViewUser = dynamic(() => import("../../../components/users/ViewUser"), {
    suspense: true,
});

const DeleteUser = dynamic(
    () => import("../../../components/users/DeleteUser"),
    {
        suspense: true,
    }
);

const EditUser = dynamic(() => import("../../../components/users/EditUser"), {
    suspense: true,
});

const User = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<any>({});
    const [title, setTitle] = useState("User");
    const { data } = useFetch(id ? `/api/get/user/${id}` : "");

    useEffect(() => {
        if (data.user) {
            setUser(data.user);
            setTitle(`User | ${data.user.name}`);
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <AdminDashContainer>
                <Container maxWidth="md">
                    {user.id ? (
                        <>
                            <Suspense>
                                <ViewUser user={user} />
                            </Suspense>
                            <Space size={1} />
                            <Divider />
                            <Space size={1} />
                            <Suspense>
                                <EditUser user={user} />
                            </Suspense>
                            <Space size={1} />
                            <Divider />
                            <Space size={1} />
                            <Suspense>
                                <DeleteUser user={user} />
                            </Suspense>
                        </>
                    ) : (
                        <Loader />
                    )}
                </Container>
            </AdminDashContainer>
        </>
    );
};

export default User;
