import { Container } from "@mui/material";
import Loader from "../Loader";
import { useUser } from "../../lib/auth";

const AuthTeacher = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();

    if (user.email && user.type === "TEACHER") {
        return <>{children}</>;
    }

    if (loading && !user.email) {
        return <Loader />;
    }

    return (
        <Container maxWidth="md">
            <p>Only teacher is authorized to view this page</p>
        </Container>
    );
};

export default AuthTeacher;
