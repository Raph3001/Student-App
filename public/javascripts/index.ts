
interface IStudent {
    first_name: String,
    last_name: String,
    gender: String,
    birthdate: String,
    classname: String,
    favSubject: [String]
}

let subjectArray: String[];

const changeSubjects = async () => {
    const name = (document.getElementById('lname') as HTMLInputElement).value;
    let studentList = await getStudentsOfClass((document.getElementById('classList') as HTMLSelectElement).value);
    const student = studentList.find(c => c.last_name == name);
    let favSubs: String[] = [];

    if (!student) {
        return;
    }

    for (let i = 0; i<subjectArray.length; i++) {
        if ((document.getElementById(subjectArray[i] + '') as HTMLInputElement).checked) {
            favSubs.push(subjectArray[i]);
        }
    }

    if (favSubs) { // @ts-ignore
        student.favSubject = favSubs;
    }



    addSubject(student);
    loadStudentsOfClass((document.getElementById('classList') as HTMLSelectElement).value);

}

const loadCheckboxes = async () => {
    const inputField = document.getElementById('checkboxes') as HTMLDivElement;
    let subject: String[] = await loadSubjects();
    subjectArray = subject;
    subject.forEach(c => {
        const checkbox = document.createElement('input') as HTMLInputElement;
        const label = document.createElement('label') as HTMLLabelElement;
        const br = document.createElement('br') as HTMLBRElement;
        label.innerHTML = '' + c;
        checkbox.type = 'checkbox';
        checkbox.id = c +'';
        checkbox.value = '' + c;
        inputField.appendChild(checkbox);
        inputField.appendChild(label);
        inputField.appendChild(br);
    })

}

const editStudent = (student: IStudent) => {

    const fname = document.getElementById('fname') as HTMLInputElement;
    const lname = document.getElementById('lname') as HTMLInputElement;
    const bdate = document.getElementById('bdate') as HTMLInputElement;
    const gender = document.getElementById('gender') as HTMLInputElement;

    fname.innerHTML = student.first_name + '';
    lname.innerHTML = student.last_name + '';
    fname.value = student.first_name + '';
    lname.value = student.last_name + '';
}

const deleteStudent = (student: any) => {
    deleteStudentById(student);
    loadStudentsOfClass(student.classname)
}

const loadStudentsOfClass = async (classname: String) => {

    const table = document.getElementById('studentTable') as HTMLTableElement;
    table.innerHTML = '';

    let studentList = await getStudentsOfClass(classname);
    studentList = studentList.sort((c, d) => (c.last_name + '').localeCompare((d.last_name + '')));
    studentList.forEach(c => {
        const row = document.createElement('tr') as HTMLTableRowElement;
        row.innerHTML = `<td>${c.first_name} ${c.last_name}</td>`;

        c.favSubject.forEach(d => {
            const data = document.createElement('td');
            data.innerHTML = `<td>${d}</td>`
            row.appendChild(data);
            data.addEventListener('click', () => editStudent(c));
        })
        const data = document.createElement('button');
        data.innerHTML = `DELETE`
        data.addEventListener('click', () => deleteStudent(c));
        row.appendChild(data)
        //row.addEventListener('click', () => editStudent(c));
        table.appendChild(row);
    })

}

const initClassList = async (classlist: String[]) => {
    const select = document.getElementById('classList') as HTMLSelectElement;
    select.innerHTML = ``;
    select.value = ``;
    select.addEventListener('change', () => loadStudentsOfClass(select.value))
    classlist.forEach(d => {
        const option = document.createElement('option') as HTMLOptionElement;
        option.innerHTML = d + "";
        option.value = d + "";
        option.addEventListener('change', () => loadStudentsOfClass(d))
        console.log(d);
        select.appendChild(option);
    })

}

const addStudent = async () => {
    let favSub: [String] = [""];
    const classname = (document.getElementById('classList') as HTMLInputElement).value;

    subjectArray.forEach(c => {
        if ((document.getElementById(c + '') as HTMLInputElement).checked) {
            if (favSub[0] == "") favSub.pop();
            favSub.push(c);
        }
    })

    const student: IStudent = {
        first_name: (document.getElementById('fname') as HTMLInputElement).value,
        last_name: (document.getElementById('lname') as HTMLInputElement).value,
        gender: (document.getElementById('gender') as HTMLInputElement).value,
        birthdate: (document.getElementById('bdate') as HTMLInputElement).value,
        classname: (document.getElementById('classList') as HTMLInputElement).value,
        favSubject: favSub
    }

    if (student.first_name && student.last_name && student.birthdate) {
        await saveStudent(student);
        loadStudentsOfClass(classname);
    }

}

onload = async () => {
    // @ts-ignore
    let classNames: string[] = await loadClassNames();
    console.log(classNames)
    initClassList(classNames);
    loadStudentsOfClass("1AHIF");
    loadCheckboxes();
    (document.getElementById('addStudent') as HTMLButtonElement).addEventListener('click', () => addStudent());
    (document.getElementById('changeStudent') as HTMLButtonElement).addEventListener('click', () => changeSubjects());
}
