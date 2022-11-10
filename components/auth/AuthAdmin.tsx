import Link from "next/link";
import { useUser } from "../../lib/auth";
import LogoLoader from "../LogoLoader";

const AuthAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();

    return (
        <LogoLoader>
            {loading ? null : user.email &&
              (user.type === "ADMIN" || user.type === "SU") ? (
                children
            ) : (
                <div className="container h-screen bg-beige/95 max-h-screen max-w-3xl md:max-w-4xl mg:max-w-5xl overflow-hidden">
                    <p>
                        You are unauthorized to View this page. Kindly login
                        using an authorized account.
                    </p>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            )}
        </LogoLoader>
    );
};

export default AuthAdmin;
