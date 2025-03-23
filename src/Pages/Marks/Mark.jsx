import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

function Mark() {
    const apilink = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [material, setMaterial] = useState("");
    const [materials, setMaterials] = useState([]);
    const ApiMaterials = apilink + "material";
    const [grade, setGrade] = useState("");
    const [gradeObject, setGradeObject] = useState("");
    const [grades, setGrades] = useState([]);
    const ApiGrades = apilink + "grade";
    const [subclass, setSubclass] = useState("");
    const [subclasses, setSubclasses] = useState([]);
    const ApiSubClass = apilink + "subclass";
    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const ApiYear = apilink + "year";
    const [term, setTerm] = useState("");
    const [terms, setTerms] = useState([]);
    const ApiTerm = apilink + "term";
    const [student, setStudent] = useState("");
    const [students, setStudents] = useState([]);
    const ApiStudent = apilink + "student";
    const [id, setId] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);

    const ApiMark = apilink + "checkMark";
    const [markWork, setMarkWork] = useState("0");
    const [markExam, setMarkExam] = useState("0");
    const [teacher, setTeacher] = useState(localStorage.getItem('user_id'));




    const handleCloseAddDialog = () => {
        setShowAddDialog(false);


    };
    const handleShowAddDialog = (id) => {
        setId(id);

        setShowAddDialog(true);
        // getMark();
    };


    const getMark = () => {
        axios
            .get(ApiMark + `?student_id=${id}&material_id=${material}&year_id=${year}&term_id=${term}`)
            .then((res) => {
                if (res) {
                    setMarkWork(res.data.data.work_mark);
                    setMarkExam(res.data.data.exam_mark);
                }

                // if(res==null){
                //     setMarkWork(0);
                //     setMarkExam(0);
                // }


            })
            .catch((err) => {
                console.log(err);
                setMarkWork(0);
                setMarkExam(0);
            });
    };

    const getMaterials = () => {
        axios
            .get(ApiMaterials + `?include=teachers.teacher&filter[teachers.teacher.user_id]=${teacher}`)
            .then((res) => {
                setMaterials(res.data.data);
                console.log('-----Materials----');
                console.log(res.data.data);
                console.log('------------');
                setMaterial(res.data.data[0].id);
                setGrade(res.data.data[0].grade_id);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleMaterialChange = (event) => {
        const selectedValue = event.target.value;
        setMaterial(selectedValue);
        setGrade(materials.filter((item) => item.id == selectedValue)[0].grade_id);


    }



    const getSubClasses = () => {
        axios
            .get(ApiSubClass)
            .then((res) => {
                setSubclasses(res.data.data);
                console.log(res.data.data);
                setSubclass(res.data.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSubclassChange = (event) => {
        const selectedValue = event.target.value;
        setSubclass(selectedValue);



    }

    const getYears = () => {
        axios
            .get(ApiYear)
            .then((res) => {
                setYears(res.data.data);
                console.log(res.data.data);
                setYear(res.data.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleYearChange = (event) => {
        const selectedValue = event.target.value;
        setYear(selectedValue);
    }

    const getTerms = () => {
        axios
            .get(ApiTerm)
            .then((res) => {
                setTerms(res.data.data);
                console.log(res.data.data);
                setTerm(res.data.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleTermChange = (event) => {
        const selectedValue = event.target.value;
        setYear(selectedValue);
    }


    const HandleAddNewGrade = async () => {
        const formData = new FormData();
        formData.append("student_id", id);
        formData.append("material_id", material);
        formData.append("year_id", year);
        formData.append("term_id", term);
        formData.append("teacher_id", teacher);
        formData.append("work_mark", markWork);
        formData.append("exam_mark", markExam);
        try {

            const response = await axios.post(
                apilink + "mark",
                formData
            );
            if (response) {
                // props.setStudentAdded();
                setShowAddDialog(false);
                setMarkWork(0);
                setMarkExam(0);
            }
        } catch (e) {
            console.log(e);
        }
    }


    const getStudents = () => {
        axios
            .get(ApiStudent + `?filter[grade_id]=${grade}&filter[subclass_id]=${subclass}`)
            .then((res) => {
                console.log('kkjhdfkhks= ' + subclass);
                setStudents(res.data.data);
                console.log(res.data.data);
                setStudent(res.data.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getStudent = () => {
        axios
            .get(ApiStudent + `/${id}`)
            .then((res) => {

                setStudent(res.data.data);


            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(() => {
        getMark();

    }, [term, year, material, id]);

    useEffect(() => {
        setMarkExam(0);
        setMarkWork(0);
        getStudent();
    }, [id]);


    useEffect(() => {

    }, []);

    useEffect(() => {
        getSubClasses();
        getYears();
        getTerms();
    }, []);




    useEffect(() => {


        getMaterials();


    }, []);

    useEffect(() => {
        getStudents();

    }, [grade, subclass]);
    return (
        <Container style={{ paddingRight: "50px" }}>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}

            <div className="row mt-2">

                <div className="col-sm-2 col-md-2">
                    المادة
                </div>
                <div className="col-sm-8 col-md-8">
                    <select onChange={handleMaterialChange} className="form-select">
                        {materials.map((option) => {
                            return (
                                <option key={option.name} value={option.id}>
                                    {option.name} - {option.grade_name}
                                </option>
                            );
                        })}
                    </select>


                </div>


            </div>

            <div className="box">


                <div className="row mt-2">

                    <div className="col-sm-2 col-md-2">
                        الشعبة
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <select onChange={handleSubclassChange} className="form-select">
                            {subclasses.map((option) => {
                                return (
                                    <option key={option.name} value={option.id}>
                                        {option.name}
                                    </option>
                                );
                            })}
                        </select>


                    </div>


                </div>



                <div className="row mt-2">

                    <div className="col-sm-2 col-md-2">
                        العام الدراسي
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <select onChange={handleYearChange} className="form-select">
                            {years.map((option) => {
                                return (
                                    <option key={option.name} value={option.id}>
                                        {option.name}
                                    </option>
                                );
                            })}
                        </select>


                    </div>


                </div>

                <div className="row mt-2">

                    <div className="col-sm-2 col-md-2">
                        الفصل
                    </div>
                    <div className="col-sm-8 col-md-8">
                        <select onChange={handleTermChange} className="form-select">
                            {terms.map((option) => {
                                return (
                                    <option key={option.name} value={option.id}>
                                        {option.name}
                                    </option>
                                );
                            })}
                        </select>


                    </div>


                </div>



                <div className="row mt-2">

                    {/* <div className="col-sm-12 col-md-12">
                        Material ID   {material}
                    </div>
                    <div className="col-sm-12 col-md-12">
                        SubClass ID   {subclass}
                    </div>
                    <div className="col-sm-12 col-md-12">
                        Grade ID     {grade}
                    </div>
                    <div className="col-sm-12 col-md-12">
                        Year ID     {year}
                    </div>
                    <div className="col-sm-12 col-md-12">
                        Term ID     {term}
                    </div>
                    <div className="col-sm-12 col-md-12">
                        Student ID     {id}
                    </div>

                    <div className="col-sm-12 col-md-12">
                        Mark     {markWork}
                    </div> */}
                    <div className="col-sm-12 col-md-12">

                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">اسم الطالب</th>
                                    <th scope="col">اسم الأب</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students?.map((option,i) => {
                                    return (
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{option.first_name + ' ' + option.last_name}</td>
                                            <td>{option.father}</td>
                                            <td>
                                                <Button onClick={() => handleShowAddDialog(option.id)} variant="contained">
                                                    الدرجة
                                                </Button>                                            </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>

                    </div>


                </div>
            </div>

            <Modal
                style={{ direction: "rtl" }}
                show={showAddDialog}
                onHide={handleCloseAddDialog}
            >
                <Modal.Header>
                    <Modal.Title>اسم الطالب: {student.first_name + ' ' + student.last_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sx={4}>درجة الأعمال</Col>
                        <Col sx={8}>
                            <input
                                value={markWork}
                                onChange={(e) =>
                                    setMarkWork(
                                        e.target.value
                                    )
                                }
                                className="form-control"
                                type="number"

                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col sx={4}>درجة الامتحان</Col>
                        <Col sx={8}>
                            <input
                                value={markExam}
                                onChange={(e) =>
                                    setMarkExam(
                                        e.target.value
                                    )
                                }
                                className="form-control"
                                type="number"

                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddDialog}>
                        إغلاق
                    </Button>
                    <Button onClick={HandleAddNewGrade} variant="contained">
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default Mark