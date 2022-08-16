import Link from "next/link";
import { useFetch } from "../../lib/fetch";

const ViewGroups = () => {
    const {
        data: { groups },
        refresh,
    } = useFetch("/api/get/groups");

    return (
        <div>
            <h2 className="text-3xl my-8">View Groups</h2>
            <div className="flex jutify-start items-center px-4 py-2">
                <a onClick={refresh}>refresh</a>
            </div>
            {groups &&
                groups.map((group: any) => (
                    <div key={group.id}>
                        <h2 className="text-3xl my-6">{group.name}</h2>
                        <ul>
                            {group.subjects.map((subject: any) => (
                                <li key={subject.id}>
                                    <Link
                                        href={{
                                            pathname: "/admin/subjects/[name]",
                                            query: { name: subject.name },
                                        }}
                                    >
                                        <a>{subject.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );
};

export default ViewGroups;
