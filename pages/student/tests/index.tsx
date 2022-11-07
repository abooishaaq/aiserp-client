import AuthStudent from "../../../components/auth/AuthStudent";

const Student = () => {

    return (
        <div>
            <h1 className="py-4 flex justify-center items-center">
                <span className="font-semibold text-4xl">Rank</span>
            </h1>
        </div>
    );
};

Student.getLayout = (page: any) => <AuthStudent>{page}</AuthStudent>;

export default Student;
