import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';

function Years() {

    const Api = "http://127.0.0.1:8000/api/year";

    const [year, setYear] = useState([]);
    const [yearname, setYearName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };
    const handleShow = (id) => {

        getYear(id);

        setShow(true);

    };

    const [showAddDialog, setShowAddDialog] = useState(false);
    const handleCloseAddDialog = () => { setShowAddDialog(false) };
    const handleShowAddDialog = (id) => {
     

        setShowAddDialog(true);

    };



    const handelAdd = async () => {
       
        try {
            const response = await fetch(Api, {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Failed to Add item");
            }
           
            getYears();

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handelDelete = async (id) => {
        console.log("id : -", id);
        // setIsLoading(true);
        try {
            const response = await fetch(Api.concat("/") + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setYear(year.filter((item) => item.id !== id));
            // getYears();

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getYears();
    }, []);

    const getYears = () => {
        axios
            .get(Api)
            .then((res) => {
                setYear(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getYear = (id) => {
        axios
            .get(Api.concat("/") + id)
            .then((res) => {
                setYearName(res.data.data.name);
                console.log(res.data.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (year.length < 0) {
        return (<Container style={{ paddingRight: '50px' }}>
            <h1 style={{ marginTop: '25px' }}>السنوات الدراسية</h1>
            <Row>
                <h2>لا يوجد بيانات</h2>
            </Row>
        </Container>);
    } else {
        return (
            <Container style={{ paddingRight: '50px' }}>
                <h1 style={{ marginTop: '25px' }}>السنوات الدراسية</h1>
                <Row style={{ marginTop: '50px' }}>
                    <Col xl={1}><Button onClick={handleShowAddDialog} variant="contained">إضاقة</Button></Col>

                </Row>
                <Row>
                    <div className="mt-5">
                        {isLoading && <Loader />}
                        {error && <p>Error: {error}</p>}


                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>اسم العام</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {year?.map((item, i) => {
                                    return (
                                        <tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{item.name}</td>

                                            <td>
                                                <Button style={{ backgroundColor: 'green' }} variant="contained">  <EditIcon style={{ cursor: 'pointer' }} />تعديل</Button>

                                                <Button onClick={() => handleShow(item.id)} style={{ backgroundColor: 'orange', marginRight: '10px', marginLeft: '10px' }} variant="contained">  <VisibilityIcon style={{ cursor: 'pointer' }} />عرض</Button>
                                                <Button onClick={() => handelDelete(item.id)} style={{ backgroundColor: 'red' }} variant="contained">  <DeleteIcon style={{ cursor: 'pointer' }} />حذف</Button>




                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Row>

                <Modal style={{ direction: 'rtl' }} show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>عرض</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{yearname}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            إغلاق
                        </Button>

                    </Modal.Footer>
                </Modal>

                <Modal style={{ direction: 'rtl' }} show={showAddDialog} onHide={handleCloseAddDialog}>
                    <Modal.Header>
                        <Modal.Title>إضافة</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sx={6}>اسم العام</Col>
                            <Col sx={6}><input required className='form-control' type='text' name='yearname' id='yearname' /></Col>
                        </Row>
                        <Row>
                            <Col sx={6}></Col>
                            <Col sx={6}></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddDialog}>
                            إغلاق
                        </Button>
                        <Button variant="contained" onClick={handleCloseAddDialog}>حفظ</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}

export default Years