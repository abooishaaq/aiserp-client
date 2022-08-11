import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faBars,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../lib/redux/hooks";
import { navSlice } from "../lib/redux/reducers/nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Btns = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.nav.open);
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        dispatch(navSlice.actions.open({ open: !open }));
    };

    const back = () => router.back();

    const resizeHandler = () => {
        if (window.innerWidth <= 1024) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <>
            {showMenu ? (
                <a className="menu" onClick={handleClick}>
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faBars}
                            size="2x"
                            style={{ color: "#03363d" }}
                        />
                    </div>
                </a>
            ) : null}
            <Link href="/admin">
                <a className="home">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faHouse}
                            size="2x"
                            style={{ color: "#03363d" }}
                        />
                    </div>
                </a>
            </Link>
            <a className="back" onClick={back}>
                <div className="icon">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size="3x"
                        style={{ color: "#03363d" }}
                    />
                </div>
            </a>
            <style jsx>{`
                a {
                    text-decoration: none;
                    position: fixed;
                    right: 32px;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    z-index: 1201;
                    color: var(--blue);
                }

                .back {
                    top: 32px;
                }

                .home {
                    top: 96px;
                }

                .menu {
                    top: 160px;
                }

                .icon {
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--beige);
                }

                @media (max-width: 480px) {
                    .menu {
                        top: calc(100vh - 284px);
                    }

                    .home {
                        top: calc(100vh - 220px);
                    }

                    .back {
                        top: calc(100vh - 156px);
                    }
                }
            `}</style>
        </>
    );
};

export default Btns;
