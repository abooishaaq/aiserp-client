import { Input } from "../neumorphic";
import { useFetch } from "../../lib/fetch";
import Link from "next/link";
import { gradeToRoman } from "../../lib/grade";


const Classes = () => {
    const {
        data: { classes },
        refresh,
    } = useFetch("/api/get/classes");

    return (
        <>
            <Input placeholder="Search" />
            <div className="left-align">
                <a onClick={refresh}>refresh</a>
            </div>
            <div>
                {classes &&
                    classes.map((class_: any) => (
                        <>
                            <div key={class_.id}>
                                <h2 className="text-3xl my-6">
                                    {gradeToRoman(class_.grade)}-
                                    {class_.section}
                                </h2>
                                <p>
                                    <Link
                                        href={{
                                            pathname: "/admin/classes/[id]",
                                            query: { id: class_.id },
                                        }}
                                    >
                                        <a>View</a>
                                    </Link>
                                </p>
                            </div>
                            <hr />
                        </>
                    ))}
            </div>
        </>
    );
};

export default Classes;
