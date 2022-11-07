import { useAppSelector } from "../../lib/redux/hooks";
import AuthStudent from "../../components/auth/AuthStudent";
import { useUser } from "../../lib/auth";

const Student = () => {
    const { user } = useUser();

    return (
        <div>
            <h1 className="py-4 flex justify-center items-center">
                <span className="font-semibold text-4xl">Welcome&nbsp;</span>
                <span className="text-2xl bg-blue text-beige py-4 px-8 rounded">
                    {user.name ? user.name : user.email}
                </span>
            </h1>
        </div>
    );
};

Student.getLayout = (page: any) => <AuthStudent>{page}</AuthStudent>;

export default Student;
