import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1 className="text-4xl font-semibold my-8">Profile</h1>
        </div>
    );
};

export default Profile;
