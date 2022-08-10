import { Container } from "@mui/system";
import { useAppSelector } from "../../lib/redux/hooks";
import Image from "next/image";
import AuthStudent from "../../components/auth/AuthStudent";

const Student = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <AuthStudent>
            <Container maxWidth="md">
                <h1>Welcome {user.name}</h1>
            </Container>
        </AuthStudent>
    );
};

export default Student;
