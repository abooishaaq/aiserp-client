import AuthAdmin from "../auth/AuthAdmin";
import { useAppSelector } from "../../lib/redux/hooks";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Drawer from "../Drawer";

const Btns = dynamic(() => import("../Btns"), {
    suspense: true,
});

const AdminNavComp = dynamic(() => import("../nav/AdminNav"), {
    suspense: true,
});

const AdminNavLoader = () => {
    return (
        <>
            <div id="admin-nav-loader" />
            <style jsx>{`
                #admin-nav-loader {
                    min-height: 100vh;
                    height: 100%;
                    min-width: 320px;
                    padding: 16px 15%;
                    background: var(--blue);
                }

                @media (max-width: 1024px) {
                    #admin-nav-container {
                        min-width: 100vw;
                    }
                }
            `}</style>
        </>
    );
};

const AdminNavSuspense = () => (
    <Suspense
        fallback={
            <>
                <AdminNavLoader />
            </>
        }
    >
        <AdminNavComp />
    </Suspense>
);

const AdminNav = () => {
    const open = useAppSelector((state) => state.nav.open);
    const large = useAppSelector((state) => state.large.large);

    return (
        <>
            {large ? (
                <AdminNavSuspense />
            ) : (
                <Drawer open={open}>
                    <AdminNavSuspense />
                </Drawer>
            )}
        </>
    );
};

const AdminDashContainer = ({ children }: { children: React.ReactNode }) => {
    const large = useAppSelector((state) => state.large.large);

    return (
        <AuthAdmin>
            <Suspense>
                <Btns />
            </Suspense>

            <div className={large ? "large-screen" : "h-screen"}>
                <AdminNav />
                {children}
            </div>
            <style jsx>{`
                .large-screen {
                    display: grid;
                    grid-template-columns: 1fr 4fr;
                }
            `}</style>
        </AuthAdmin>
    );
};

export default AdminDashContainer;
