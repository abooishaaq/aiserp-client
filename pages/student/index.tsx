
import { useAppSelector } from "../../lib/redux/hooks";
import Image from "next/image";
import AuthStudent from "../../components/auth/AuthStudent";

const Student = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <AuthStudent>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <h1 className="text-4xl font-semibold my-8">Welcome {user.name}</h1>
            </div>
        </AuthStudent>
    );
};

export default Student;
