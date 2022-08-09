import { Button } from "../neumorphic";
import Link from "next/link";
import { useAppDispatch } from "../../lib/redux/hooks";
import { navSlice } from "../../lib/redux/reducers/nav";

const AdminNav = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(navSlice.actions.open({ open: false }));
  };

  return (
    <>
      <div id="admin-nav-container">
        <div>
          <Link href="/admin/users">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Users</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/students">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Students</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/teachers">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Teachers</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/classes">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Classes</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/tests">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Tests</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/notices">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Notices</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/attendance">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Attendance</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/fees">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Fees</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/activity">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Activity</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/subjects">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Subjects</p>
              </Button>
            </a>
          </Link>
          <Link href="/admin/sessions">
            <a>
              <Button color="blue" onClick={handleClick}>
                <p>Sessions</p>
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        #admin-nav-container {
          min-height: 100vh;
          height: 100%;
          min-width: 320px;
          padding: 16px 15%;
          background: var(--blue);
          overflow-y: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #admin-nav-container > div {
          width: 100%;
          margin: 10% 0;
        }

        @media (max-height: 1024px) {
          #admin-nav-container {
            align-items: start;
          }
        }

        @media (max-width: 1024px) {
          #admin-nav-container {
            min-width: 100vw;
          }
        }

        #logo {
          margin-bottom: 16px;
        }

        a {
          padding: 0;
          width: 100%;
          display: flex;
          min-width: 180px;
          justify-content: center;
        }

        p {
          margin: 0;
          padding: 0 20%;
          font-size: 1.2rem;
          font-family: "Work Sans", sans-serif;
          text-align: left;
          font-weight: bold;
          position: relative;
          color: var(--beige);
        }

        p:before {
          content: "";
          display: block;
          position: absolute;
          bottom: -4px;
          left: 10%;
          width: 0;
          transition: 0.4s;
          height: 2px;
          background-color: var(--beige);
          align-self: start;
        }

        a:hover p:before {
          width: 80%;
        }
      `}</style>
    </>
  );
};

export default AdminNav;
