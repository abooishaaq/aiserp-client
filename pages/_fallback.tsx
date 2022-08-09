import { Container } from "@mui/system";
import Link from "next/link";

const Fallback = () => {
  return (
    <>
      <Container maxWidth="md">
        <div>
          <h1>Offline :(</h1>
          <Link href="/">
            <a>take me to /</a>
          </Link>
        </div>
      </Container>
      <style jsx>{`
        h1 {
          text-align: center;
          color: var(--blue);
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Fallback;
