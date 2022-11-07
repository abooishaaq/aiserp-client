import Loader from "../Loader";
import { useUser } from "../../lib/auth";
import StudentNav from "../nav/StudentNav";

const AuthStudent = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();

    return (
        <div className="h-screen">
            <div id="student-dash" className="bg-beige/95 w-screen">
                <>
                    {loading ? (
                        <Loader />
                    ) : user.email ? (
                        children
                    ) : (
                        <p>Only student is authorized to view this page</p>
                    )}
                </>
                <style jsx>{`
                    #student-dash {
                        height: 100%;
                        max-height: calc(100vh - 4rem);
                    }
                `}</style>
            </div>
            <StudentNav />
        </div>
    );
};

export default AuthStudent;
