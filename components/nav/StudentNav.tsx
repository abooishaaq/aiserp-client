import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faBell,
    faFileLines,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const NavLink = ({
    href,
    curr,
    icon,
    title,
}: {
    href: string;
    curr: string;
    title: string;
    icon: IconProp;
}) => {
    return (
        <Link href={href}>
            <a className="self-center w-full h-full justify-self-center flex justify-center flex-col items-center transition duration-200 hover:border-b-2 hover:border-burlywood">
                <FontAwesomeIcon
                    icon={icon}
                    style={{
                        transform: curr === href ? "scale(.75)" : "",
                    }}
                    size="2x"
                    className="cursor-pointer transition duration-200 z-20 text-beige"
                />
                {curr === href ? (
                    <span className="text-beige">
                        <>{title}</>
                        <style jsx>{`
                            span {
                                font-size: 0.8rem;
                                animation: scaleAndFade 0.2s ease-in-out;
                            }

                            @keyframes scaleAndFade {
                                0% {
                                    transform: scaleX(0.75) scaleY(0.4);
                                    opacity: 0;
                                }

                                100% {
                                    transform: scaleX(1) scaleY(1);
                                    opacity: 1;
                                }
                            }
                        `}</style>
                    </span>
                ) : null}
            </a>
        </Link>
    );
};

const StudentNav = () => {
    const router = useRouter();

    return (
        <>
            <div className="h-16 bg-blue w-screen grid grid-cols-5">
                <NavLink
                    href="/student/tests"
                    title="TESTS"
                    curr={router.pathname}
                    icon={faFileLines}
                />
                <NavLink
                    href="/student/attendance"
                    title="ATTENDANCE"
                    curr={router.pathname}
                    icon={faBook}
                />
                <NavLink
                    href="/student/notices"
                    title="NOTICES"
                    curr={router.pathname}
                    icon={faBell}
                />
                <NavLink
                    href="/student/profile"
                    title="PROFILE"
                    curr={router.pathname}
                    icon={faUser}
                />
                <NavLink
                    href="/student/profile"
                    title="PROFILE"
                    curr={router.pathname}
                    icon={faUser}
                />
            </div>
        </>
    );
};

export default StudentNav;
