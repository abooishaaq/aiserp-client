import { Button } from "@mui/material";
import { post } from "../../lib/fetch";
import { useError, useSuccess } from "../../lib/message";
import { useRouter } from "next/router";
import { IUser } from "../../lib/types";

const DeleteUser = ({ user }: IUser) => {
    const { setError } = useError();
    const { setSuccess } = useSuccess();
    const router = useRouter();

    const onClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        const data = {
            id: user.id,
        };

        post("/api/delete/user", data).then((res) => {
            if (res.status === 200) {
                setSuccess("User deleted successfully");
                setTimeout(() => {
                    router.push("/admin/users");
                }, 2000);
            } else {
                res.json().then((err) => {
                    setError(err.message);
                });
            }
        });
    };

    return (
        <>
            <h2>Delete </h2>
            <Button
                onClick={onClick}
                variant="contained"
                color="secondary"
                style={{
                    color: "white",
                    backgroundColor: "#f44336",
                }}
            >
                Delete
            </Button>
        </>
    );
};

export default DeleteUser;
