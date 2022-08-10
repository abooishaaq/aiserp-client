export interface IClass {
    id: string;
    students: {
        id: string;
        marks: {
            marks: number;
            test: {
                id: string;
                date: Date;
                total: number;
            };
        }[];
        profile: {
            name: string;
        };
    }[];
    teacher: {
        id: string;
        user: {
            id: string;
            name: string;
        };
    };
    grade: string;
    section: string;
}

export interface IStudent {
    id: string;
    subjects: {
        id: string;
        name: string;
        subjects: {
            name: string;
            tests: any[];
        }[];
    };
    class: {
        id: string;
        grade: string;
        section: string;
    };
    rollNo: string;
    profile: {
        name: string;
    };
}

export interface IUser {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };
}
