import Loader from "../Loader";
import { useUser } from "../../lib/auth";
import LogoLoader from "../LogoLoader";

const AuthTeacher = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();

    if (user.email && user.type === "TEACHER") {
        return <>{children}</>;
    }

    if (loading && !user.email) {
        return <Loader />;
    }

    return (
        <LogoLoader>
            <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                <p>Only teacher is authorized to view this page</p>
            </div>
        </LogoLoader>
    );
};

export default AuthTeacher;
