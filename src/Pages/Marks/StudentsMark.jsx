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



function StudentsMark() {
    const apilink = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [id, setId] = useState(localStorage.getItem('object_id'));

    const [year, setYear] = useState("");
    const [years, setYears] = useState([]);
    const ApiYear = apilink + "year";
    const [term, setTerm] = useState("");
    const [terms, setTerms] = useState([]);
    const ApiTerm = apilink + "term";
    const [material, setMaterial] = useState("");
    const [materials, setMaterials] = useState([]);
    const ApiMaterial = apilink + "material";


    const ApiMark = apilink + "mark";
    const [marks, setMarks] = useState([]);

    const [markWork, setMarkWork] = useState("0");
    const [markExam, setMarkExam] = useState("0");






    const getMark = () => {
        axios
            .get(ApiMark + `?filter[year_id]=${year}&filter[term_id]=${term}&filter[material_id]=${material}&include=material.grade,teacher,student`)
            .then((res) => {
                if (res) {
                    setMarks(res.data.data);
                    console.log(res.data.data);
                }



            })
            .catch((err) => {
                console.log(err);

            });
    };







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

    const getMaterials = () => {
        axios
            .get(ApiMaterial+`?include=teachers.teacher&filter[teachers.teacher_id]=${id}`)
            .then((res) => {
                setMaterials(res.data.data);
                console.log(res.data.data);
                setMaterial(res.data.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleMaterialChange = (event) => {
        const selectedValue = event.target.value;
        setMaterial(selectedValue);
    }




    useEffect(() => {
        getYears();
        getTerms();
        getMaterials();
    }, []);


    useEffect(() => {
        getMark();
    }, [term, year,material])

    return (
        <Container style={{ paddingRight: "50px" }}>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}



            <div className="box">


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

                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>الرقم</th>
                                <th>اسم الطالب</th>
                                <th>درجة الأعمال</th>
                                <th>درجة الامتحان</th>
                                <th>المجموع</th>
                                <th>المحصلة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks?.map((item, i) => {
                                return (
                                    <tr style={{ textAlign: 'center' }} key={i + 1}>
                                        <td>{i + 1}</td>
                                        <td style={{ color: 'red' }}>
                                            {item.student.first_name +' ' +item.student.last_name}
                                        </td>
                                       
                                        <td>{item.work_mark}</td>
                                        <td>{item.exam_mark}</td>
                                        <td>
                                            {item.work_mark + item.exam_mark}
                                        </td>
                                        <td>
                                            {(item.work_mark + item.exam_mark) / 2}

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>


                </div>
            </div>


        </Container>
    )
}

export default StudentsMark