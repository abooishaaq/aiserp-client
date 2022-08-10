import { useUser } from "../../lib/auth";
import { Container } from "@mui/material";

const AuthAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();

    return (
        <>
            {user.email && (user.type === "ADMIN" || user.type === "SU") ? (
                children
            ) : (
                <Container>
                    <p>
                        You are unauthorized to View this page. Kindly logout
                        and then login using an authorized account.
                    </p>
                </Container>
            )}
        </>
    );
};

export default AuthAdmin;
