import Loader from "../Loader";
import { Suspense, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useFetch } from "../../lib/fetch";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Space from "../Space";
import { monthNames } from "../../lib/constants";
import { Input } from "../ui";
import dynamic from "next/dynamic";

const ViewProfileMiniComp = dynamic(() => import("./ViewProfileMini"), {
    suspense: true,
});

const ViewProfileMini = (props: any) => (
    <Suspense fallback={<Loader />}>
        <ViewProfileMiniComp {...props} />
    </Suspense>
);

const ViewProfiles = () => {
    const {
        data: { profiles },
        loading,
    } = useFetch("/api/get/profiles");
    const [search, setSearch] = useState<string[]>([]);
    const [shownProfiles, setShownProfiles] = useState<any[]>([]);
    const [sortByName, setSortByName] = useState<boolean>(false);
    const [sortBySrNo, setSortBySrNo] = useState<boolean>(false);

    useEffect(() => {
        setShownProfiles(
            profiles
                ? profiles
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
                : []
        );
    }, [profiles, search, sortByName, sortBySrNo]);

    const Profile = ({ index, style }: { index: number; style: any }) => (
        <div
            className="px-4 py-2"
            key={shownProfiles[index].srNo}
            style={style}
        >
            <ViewProfileMini profile={shownProfiles[index]} />
            <Space />
            <hr />
            <Space />
        </div>
    );

    return (
        <>
            <div>
                <h2 className="text-3xl my-6">Profiles</h2>
            </div>
            {(!profiles || !profiles.length) && <p>No profiles found</p>}
            {loading && <Loader />}
            {!loading && profiles && profiles.length > 0 && (
                <>
                    <div>
                        <Input
                            value={search.join(" ")}
                            onChange={(e) =>
                                setSearch(e.target.value.split(/\s+/))
                            }
                        />
                    </div>
                    <h2 className="text-3xl my-6">Sort By</h2>
                    <div className="sort-by">
                        <div className="check-box">
                            <div className="shadow-lg">
                                <FormControlLabel
                                    control={
                                        <div className="check-box-pad">
                                            <Checkbox
                                                onChange={(e) =>
                                                    setSortByName(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    }
                                    label="Name"
                                />
                            </div>
                        </div>
                        <div className="check-box">
                            <div className="shadow-lg">
                                <FormControlLabel
                                    control={
                                        <div className="check-box-pad">
                                            <Checkbox
                                                onChange={(e) =>
                                                    setSortBySrNo(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    }
                                    label="Serial Number"
                                />
                            </div>
                        </div>
                    </div>
                    <Space />
                    <div className="long-list rounded bg-burlywood">
                        <List
                            height={
                                typeof window === "undefined"
                                    ? 1200
                                    : window.innerHeight
                            }
                            itemCount={shownProfiles.length}
                            itemSize={500}
                            width="100%"
                        >
                            {Profile}
                        </List>
                    </div>
                </>
            )}
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
