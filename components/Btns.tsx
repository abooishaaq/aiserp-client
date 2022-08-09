import Link from "next/link";
import { Paper } from "@mui/material";
import { Home, Menu, ArrowBackIosNew } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../lib/redux/hooks";
import { navSlice } from "../lib/redux/reducers/nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Btns = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.nav.open);
  const [showMenu, setShowMenu] = useState(false);
  const [homeElevation, setHomeElevation] = useState(4);
  const [menuElevation, setMenuElevation] = useState(4);
  const [backElevation, setBackElevation] = useState(4);
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
        <a
          className="menu"
          onClick={handleClick}
          onMouseEnter={() => setMenuElevation(2)}
          onMouseLeave={() => setMenuElevation(4)}
          onMouseDown={() => setMenuElevation(0)}
          onMouseUp={() => setMenuElevation(2)}
        >
          <Paper elevation={menuElevation} style={{ borderRadius: "100%" }}>
            <div className="icon">
              <Menu fontSize="large" style={{ color: "#03363d" }} />
            </div>
          </Paper>
        </a>
      ) : null}
      <Link href="/admin">
        <a
          className="home"
          onMouseEnter={() => setHomeElevation(2)}
          onMouseLeave={() => setHomeElevation(4)}
          onMouseDown={() => setHomeElevation(0)}
          onMouseUp={() => setHomeElevation(2)}
        >
          <Paper elevation={homeElevation} style={{ borderRadius: "100%" }}>
            <div className="icon">
              <Home fontSize="large" style={{ color: "#03363d" }} />
            </div>
          </Paper>
        </a>
      </Link>
      <a
        className="back"
        onMouseEnter={() => setBackElevation(2)}
        onMouseLeave={() => setBackElevation(4)}
        onMouseDown={() => setBackElevation(0)}
        onMouseUp={() => setBackElevation(2)}
        onClick={back}
      >
        <Paper elevation={backElevation} style={{ borderRadius: "100%" }}>
          <div className="icon">
            <ArrowBackIosNew fontSize="large" style={{ color: "#03363d" }} />
          </div>
        </Paper>
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
          padding: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
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
