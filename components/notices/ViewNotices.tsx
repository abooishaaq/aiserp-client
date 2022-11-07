import { useState, useEffect } from "react";
import { useFetch } from "../../lib/fetch";
import { FixedSizeList as List } from "react-window";
import { Input } from "../ui";

const ViewNotices = () => {
    const { data, refresh } = useFetch("/api/get/notices");
    const [notices, setNotices] = useState<any[]>([]);
    const [shownNotices, setShownNotices] = useState<any[]>([]);
    const [search, setSearch] = useState<string[]>([]);

    useEffect(() => {
        if (data?.notices) {
            const processed1 = data.notices.map((notice: any) => {
                return {
                    ...notice,
                    createdAt: new Date(notice.createdAt).toDateString(),
                };
            });

            // collect notices
            // transform { title: string; content: string; class: string }
            //        -> { title: string; content: string; classes: string[] }

            const uniqNotices = new Map<
                { title: string; createdAt: string; content: string },
                string[]
            >();

            for (let i = 0; i < processed1.length; ++i) {
                const key = {
                    title: processed1[i].title,
                    createdAt: processed1[i].createdAt,
                    content: processed1[i].content,
                };
                if (uniqNotices.has(key)) {
                    const classes = uniqNotices.get(key)!;
                    classes.push(processed1.classId);
                    uniqNotices.set(key, classes);
                } else {
                    uniqNotices.set(key, [processed1[i].classId]);
                }
            }

            const processed2: {
                title: string;
                createdAt: string;
                content: string;
                classes: string[];
            }[] = [];

            for (const [key, classes] of uniqNotices.entries()) {
                processed2.push({
                    ...key,
                    classes,
                });
            }

            setNotices(processed2);
            setShownNotices(processed2);
        }
    }, [data]);

    useEffect(() => {
        if (search.length === 0) {
            if (notices) {
                setShownNotices(notices);
            }
            return;
        }
        setShownNotices(
            notices.filter((notice: any) => {
                for (const word of search) {
                    return (
                        notice.title
                            .toLowerCase()
                            .includes(word.toLowerCase()) ||
                        notice.content
                            .toLowerCase()
                            .includes(word.toLowerCase()) ||
                        notice.createdAt.includes(word)
                    );
                }
            })
        );
    }, [search, notices]);

    const Notice = ({ index, style }: { index: number; style: any }) => {
        const notice = shownNotices[index];
        const {
            data: { class: class_ },
        } = useFetch(`/api/get/grade-section/${notice.classes.join(",")}`);

        return (
            <div key={notice.id} style={style} className="my-4 px-4 py-2">
                <div className="bg-burlywood h-40 my-2 rounded border-1 border-blue overflow-y-auto">
                    <h3 className="text-2xl my-4">{notice.title}</h3>
                    <h4 className="text-xl my-2">{notice.createdAt}</h4>
                    <p>
                        classes: <ul></ul>
                    </p>
                    <p>{notice.content}</p>
                </div>
                <hr />
            </div>
        );
    };

    return (
        <>
            <Input
                label="search"
                value={search.join(" ")}
                onChange={(e) => setSearch(e.target.value.split(/\s+/))}
            />
            <div className="flex jutify-start items-center px-4 py-2">
                <a onClick={refresh}>refresh</a>
            </div>
            <div className="long-list rounded py-2 overflow-scroll bg-burlywood">
                <List
                    height={700}
                    itemCount={shownNotices.length}
                    itemSize={200}
                    width="100%"
                >
                    {Notice}
                </List>
            </div>
        </>
    );
};

export default ViewNotices;
