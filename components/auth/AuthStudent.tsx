import { Container } from "@mui/material";
import Loader from "../Loader";
import { useUser } from "../../lib/auth";

const AuthStudent = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();

    if (user.email && user.type === "STUDENT") {
        return <>{children}</>;
    }

    if (loading && !user.email) {
        return <Loader />;
    }

    return (
        <Container maxWidth="md">
            <p>Only student is authorized to view this page</p>
        </Container>
    );
};

export default AuthStudent;
