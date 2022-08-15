import { useUser } from "../../lib/auth";

const AuthAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();

    return (
        <>
            {user.email && (user.type === "ADMIN" || user.type === "SU") ? (
                children
            ) : (
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <p>
                        You are unauthorized to View this page. Kindly login
                        using an authorized account.
                    </p>
                </div>
            )}
        </>
    );
};

export default AuthAdmin;
