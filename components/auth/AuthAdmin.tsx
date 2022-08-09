import Logo from "../Logo";
import { useUser } from "../../lib/auth";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

const AuthAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    const [showUnAuth, setShowUnAuth] = useState(false);

    useEffect(() => {
        if (!user.email && !loading) {
            setTimeout(() => {
                setShowUnAuth(true);
            }, 2000);
        }
    }, [loading, user]);

    if (user.email && (user.type === "ADMIN" || user.type === "SU")) {
        return <>{children}</>;
    }

    if (showUnAuth) {
        return (
            <Container>
                <p>
                    You are unauthorized to View this page. Kindly logout and
                    then login using an authorized account.
                </p>
            </Container>
        );
    }

    return (
        <>
            <div>
                <Logo width={240} height={240} />
            </div>
            <style jsx>{`
                div {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
};

export default AuthAdmin;
