
interface IStudent {
    first_name: String,
    last_name: String,
    gender: String,
    birthdate: String,
    classname: String,
    favSubject: [String]
}

const loadClassNames = async () => {
    let classNames: string[] = [];
    (await (await fetch('./school/classname')).json()).forEach((c: string) => {
        classNames.push(c)
    })
    return classNames;
}

const loadSubjects = async () => {
    let subjects: string[] = [];
    (await (await fetch('./school/subjects')).json()).forEach((c: string) => {
        subjects.push(c)
    })
    return subjects;
}

const getStudentsOfClass = async (classname: String) => {
    let students: IStudent[] = [];
    (await (await fetch('./school/students?classname=' + classname)).json()).forEach((c: IStudent) => {
        students.push(c)
    });
    return students;
}

const saveStudent = async (student: IStudent) => {

    const init = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    };

    (await (await fetch('./school/students', init)));

}

const getStudentsOfBDay = async () => {
    return await (await fetch('./school/birthday')).json();
}

const addSubject = async (student: any) => {

    const init = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    };

    (await (await fetch('./school/students/' + student._id, init)));
}

const deleteStudentById = async (student: any) => {

    const init = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ""
    };

    (await (await fetch('./school/students/' + student._id, init)));
}
