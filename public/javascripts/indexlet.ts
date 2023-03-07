
const loadStudentsOfBirthday = async () => {
    const list = document.getElementById('studentBDayList') as HTMLTableElement;
    list.innerHTML = ``;
    let students: any[] = await getStudentsOfBDay();
    console.log(students)
    students = students.sort((c, d) => (c.last_name).localeCompare((d.last_name)))
    students.forEach(c => {
        const row = document.createElement('tr') as HTMLTableRowElement;
        const short: String = (c.last_name + '').slice(0, 3).toLowerCase() + (c.first_name + '').slice(0, 2).toLowerCase() + (c.className + '').slice(1,2).toLowerCase() + (new Date(c.birthdate).getFullYear() + '').slice(0, 2);
        row.innerHTML = `<td>${c.first_name} ${c.last_name}</td><td>Wish them a happy birthday: <a href="mailto:${short}@htl-kaindorf.at">${short}</a></td>`;
        list.appendChild(row);
    })

}

onload = () => {
    loadStudentsOfBirthday();
}
