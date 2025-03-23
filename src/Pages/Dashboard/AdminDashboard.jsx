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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgTeacher from './../../assets/teacher.jpg';
import imgStudent from './../../assets/student.jpg';
import imgMaterial from './../../assets/material.jpg';
import imgGrade from './../../assets/grades.png';
import imgSubclass from './../../assets/subclass.jpg';
import Teachers from "../Teachers/Teachers";
import imgyear from './../../assets/year.jpg';
import Grid from '@mui/material/Grid2';


function AdminDashboard() {
    const apilink = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [grade, setGrade] = useState([]);
    const [subclass, setSubclass] = useState([]);
    const [currentYear, setCurrentYear] = useState([]);





    const getData = () => {
        axios
            .get(apilink + 'admindashboard')
            .then((res) => {
                setTeachers(res.data.teacher_count);
                setStudents(res.data.student_count);
                setMaterials(res.data.material_count);
                setGrade(res.data.grade_count);
                setSubclass(res.data.subclass_count);
                setCurrentYear(res.data.year_current);

            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(() => {
        getData();
    }, []);




    return (
        <Container style={{ paddingRight: "50px" }}>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}

          

            <Grid sx={{padding:'25px'}} container spacing={2}>

                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgTeacher}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    عدد المدرسين
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {teachers}
                                </Typography>
                            </CardContent>
                        </>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                       
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgStudent}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    عدد الطلاب
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {students}
                                </Typography>
                            </CardContent>
                        
                    </Card>

                </Grid>
                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgMaterial}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    عدد المقررات الدراسية
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {materials}
                                </Typography>
                            </CardContent>
                        </>
                    </Card>

                </Grid>


                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgGrade}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    عدد الصفوف
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {grade}
                                </Typography>
                            </CardContent>
                        </>
                    </Card>

                </Grid>

                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgSubclass}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    عدد الشعب
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {subclass}
                                </Typography>
                            </CardContent>
                        </>
                    </Card>

                </Grid>

                
                <Grid size={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imgyear}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                    العام الدراسي الحالي
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '22px' }}>
                                    {currentYear}
                                </Typography>
                            </CardContent>
                        </>
                    </Card>

                </Grid>
            </Grid>




        </Container>
    )
}

export default AdminDashboard