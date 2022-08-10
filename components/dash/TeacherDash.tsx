import AuthTeacher from "../auth/AuthTeacher";

const TeacherDash = ({ children }: { children: React.ReactNode }) => {
    return <AuthTeacher>{children}</AuthTeacher>;
};

export default TeacherDash;
