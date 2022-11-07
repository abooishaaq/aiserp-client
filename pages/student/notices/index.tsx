import AuthStudent from "../../../components/auth/AuthStudent";

const Notices = () => {
    return (
        <div>
            <h1 className="py-4 flex justify-center items-center">
                <span className="font-semibold text-4xl">Rank</span>
            </h1>
        </div>
    );
};

Notices.getLayout = (page: any) => <AuthStudent>{page}</AuthStudent>;

export default Notices;
