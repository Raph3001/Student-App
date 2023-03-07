import express, {Request, Response, Express} from "express";
import mongoose, {Schema, Types } from "mongoose";
const router = express.Router();
import IStudent from '../public/javascripts/IStudent';

mongoose.connect(`mongodb://127.0.0.1:27017/studentDB`)
    .then(() => console.log(`Loaded`))
    .catch(err => console.log("All " + err));

const schemaStudent = new Schema({
    "first_name": String,
    "last_name": String,
    "gender": String,
    "birthdate": Date,
    "classname": String,
    "favSubject": [String]
});

const students = mongoose.model('studentDB', schemaStudent, 'studentdbs');

router.get('/students', async function(req, res, next) {
    res.send(await students.find({classname: req.query.classname}));
});

router.get('/subjects', async function(req, res, next) {
    res.send(await students.find().distinct("favSubject"));
});

router.get('/classname', async function(req, res, next) {
    res.send(await students.find().distinct("classname"));
});

router.get('/birthday', async function(req, res, next) {
    let studentList: IStudent[] = await students.find();
    let bdaylist: IStudent[] = [];
    studentList.forEach(c => {
        if (((c.birthdate.getDate()) == (new Date(Date.now()).getDate())) && ((c.birthdate.getMonth()) == (new Date(Date.now()).getMonth()))) {
            bdaylist.push(c);
        }
    })
    res.send(bdaylist);
});

router.post('/students', async function(req, res, next) {
    const list = await students.find();
    if (list.find(c => c.last_name == (req.body).last_name)) {
        res.status(400).send();
        return;
    }
    res.send(await (new students(req.body)).save());
});

router.patch('/students/:id', async function(req, res, next) {
    await students.findByIdAndDelete(new Types.ObjectId(req.params.id));
    res.send(await (new students(req.body)).save());
});

router.delete('/students/:id', async function(req, res, next) {
    const student: IStudent = await students.findById(req.params.id) as IStudent;
    console.log(student)
    if (!student) {
        res.status(401).send();
    }
    const result = await students.findByIdAndDelete(new Types.ObjectId(req.params.id));
    console.log(result)
    res.status(200).send(result);
});

export { router }
