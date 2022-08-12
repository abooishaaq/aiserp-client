import Copyable from "../Copyable";

const ViewProfileMini = ({ profile }: { profile: any }) => {
    return (
        <div className="profile">
            <Copyable>
                <h2 className="text-3xl my-6">{profile.name}</h2>
            </Copyable>
            <div className="col-grid">
                <div>
                    <h4>
                        serial number:&nbsp;
                        <Copyable>{profile.srNo}</Copyable>
                    </h4>
                    <p>
                        date of birth:&nbsp;
                        {new Date(profile.dob).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <p>
                        <Copyable>{profile.phone1}</Copyable>
                    </p>
                    <p>
                        <Copyable>{profile.phone2}</Copyable>
                    </p>
                    <Copyable>
                        <p>{profile.address}</p>
                    </Copyable>
                </div>
            </div>
            <div className="col-grid">
                <div className="father-info">
                    <h3 className="text-2xl my-4">Father</h3>
                    <Copyable>
                        <h4>{profile.fatherName}</h4>
                    </Copyable>
                    <p>
                        occupation:&nbsp;
                        <Copyable>{profile.fatherOcc}</Copyable>
                    </p>
                </div>
                <div className="mother-info">
                    <h3 className="text-2xl my-4">Mother</h3>
                    <Copyable>
                        <h4>{profile.motherName}</h4>
                    </Copyable>
                    <p>
                        occupation:&nbsp;
                        <Copyable>{profile.motherOcc}</Copyable>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewProfileMini;
