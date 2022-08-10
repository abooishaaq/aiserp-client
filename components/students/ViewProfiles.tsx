import Loader from "../Loader";
import { Fragment, Suspense, useState } from "react";
import { useFetch } from "../../lib/fetch";
import { FormControlLabel, Paper, Checkbox, Divider } from "@mui/material";
import Space from "../Space";
import { monthNames } from "../../lib/constants";
import { Input } from "../neumorphic";
import dynamic from "next/dynamic";

const ViewProfileMiniComp = dynamic(() => import("./ViewProfileMini"), {
    suspense: true,
});

const ViewProfileMini = (props: any) => (
    <Suspense>
        <ViewProfileMiniComp {...props} />
    </Suspense>
);

const ViewProfiles = () => {
    const {
        data: { profiles },
        loading,
    } = useFetch("/api/get/profiles");
    const [search, setSearch] = useState<string[]>([]);
    const [sortByName, setSortByName] = useState<boolean>(false);
    const [sortBySrNo, setSortBySrNo] = useState<boolean>(false);

    if (loading) {
        return <Loader />;
    }

    if (!profiles || !profiles.length) {
        return <p>No profiles found</p>;
    }

    return (
        <>
            <div>
                <h2>Profiles</h2>
            </div>
            <div>
                <Input
                    value={search.join(" ")}
                    onChange={(e) => setSearch(e.target.value.split(/\s+/))}
                />
            </div>
            <h2>Sort By</h2>
            <div className="sort-by">
                <div className="check-box">
                    <Paper>
                        <FormControlLabel
                            control={
                                <div className="check-box-pad">
                                    <Checkbox
                                        onChange={(e) =>
                                            setSortByName(e.target.checked)
                                        }
                                    />
                                </div>
                            }
                            label="Name"
                        />
                    </Paper>
                </div>
                <div className="check-box">
                    <Paper>
                        <FormControlLabel
                            control={
                                <div className="check-box-pad">
                                    <Checkbox
                                        onChange={(e) =>
                                            setSortBySrNo(e.target.checked)
                                        }
                                    />
                                </div>
                            }
                            label="Serial Number"
                        />
                    </Paper>
                </div>
            </div>
            <Space />
            <div className="long-list">
                {profiles
                    .filter((profile: any) => {
                        // each search word should match atleast one field
                        if (!search.length) return true;

                        const ok = search
                            .map((s) => {
                                if (
                                    profile.srNo
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    profile.name
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    profile.fatherName
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    profile.motherName
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                if (
                                    profile.phone1 &&
                                    profile.phone1.includes(s)
                                ) {
                                    return true;
                                }

                                if (
                                    profile.phone2 &&
                                    profile.phone2.includes(s)
                                ) {
                                    return true;
                                }

                                if (
                                    profile.address
                                        .toLowerCase()
                                        .includes(s.toLowerCase())
                                ) {
                                    return true;
                                }

                                const month = monthNames
                                    .map((x) => x.toLowerCase())
                                    .indexOf(s);
                                const dob = new Date(profile.dob);
                                if (dob.getMonth() === month) {
                                    return true;
                                }

                                if (
                                    /\d{4}/.test(s) &&
                                    parseInt(s) === dob.getFullYear()
                                ) {
                                    return true;
                                }

                                return false;
                            })
                            .reduce((a, b) => a && b, true);

                        return ok;
                    })
                    .sort((a: any, b: any) => {
                        let res = 0;
                        if (sortBySrNo && a.srNo) {
                            res = a.srNo.localeCompare(b.srNo);
                        }
                        if (res === 0 && sortByName && a.name) {
                            res = a.name.localeCompare(b.name);
                        }
                        return res;
                    })
                    .map((profile: any) => (
                        <Fragment key={profile.srNo}>
                            <ViewProfileMini profile={profile} />
                            <Space />
                            <Divider />
                            <Space />
                        </Fragment>
                    ))}
            </div>
            <style jsx>{`
                .profile {
                    border: 1px solid var(--blue);
                    border-radius: 5px;
                    padding: 10px;
                    grid-template-rows: 1fr 1fr;
                }

                .col-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 1rem;
                }

                @media (max-width: 1024px) {
                    .parent-info {
                        grid-template-columns: 1fr;
                    }
                }

                .sort-by {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }

                .check-box {
                    margin: 0.5rem;
                }

                .check-box-pad {
                    padding: 0.5rem;
                }
            `}</style>
        </>
    );
};

export default ViewProfiles;
