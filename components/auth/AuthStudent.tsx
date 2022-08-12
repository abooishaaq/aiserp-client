
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
        <div className="container backdrop-blur-lg overflow-y-auto max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl">
            <p>Only student is authorized to view this page</p>
        </div>
    );
};

export default AuthStudent;
