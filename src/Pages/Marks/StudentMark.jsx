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



function StudentMark() {
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


    const ApiMark = apilink + "mark";
    const [marks, setMarks] = useState([]);

    const [markWork, setMarkWork] = useState("0");
    const [markExam, setMarkExam] = useState("0");






    const getMark = () => {
        axios
            .get(ApiMark + `?filter[student_id]=${id}&filter[year_id]=${year}&filter[term_id]=${term}&include=material.grade,teacher`)
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




    useEffect(() => {
        getYears();
        getTerms();
    }, []);


    useEffect(() => {
        getMark();
    }, [term, year])

    return (
        <Container style={{ paddingRight: "50px" }}>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}



            <div className="box">




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
                                <th>المادة</th>
                                <th>الصف</th>
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
                                            {item.material.name}
                                        </td>
                                        <td>
                                            {item.material.grade.name}
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

export default StudentMark