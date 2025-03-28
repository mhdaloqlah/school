import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import Viewstudent from "./_viewStudent";
import AddStudent from "./_addStudent";
import EditStudent from "./_editStudent";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';

function Students() {
  const apilink = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const Api = apilink + "student?include=grade,subclass";
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToEditStudent = (id) => { navigate(`/dashboard/editstudent/${id}`); };

  const getStudents = () => {
    axios
      .get(Api)
      .then((res) => {
        setStudents(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    // setIsLoading(true);
    try {
      const response = await fetch(apilink.concat("student/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setStudents(students.filter((item) => item.id !== id));
      // getYears();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShow = (id) => {
    navigate(`/dashboard/AdminStudentMark/${id}`);
  };

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>سجل الطلاب</h1>
      <Row style={{ marginTop: "50px" }}>
        <Col xl={1}>
          <a href="/dashboard/AddStudent" className="btn btn-primary" variant="contained">إضافة</a>
        </Col>
      </Row>

      <Row>
        <div className="mt-5">
          {isLoading && <Loader />}

          {error && <p>Error: {error}</p>}


          <table className="table table-striped">
            <thead>
              <tr>
                <th>رقم الطالب</th>
                <th>اسم الطالب</th>
                <th>الشعبة</th>
                <th>الصف</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td style={{ color: 'red' }}>
                      {item.first_name} {item.last_name}
                    </td>
                    <td>{item.subclass.name}</td>
                    <td>{item.grade.name}</td>
                    <td>
                      <Button
                        onClick={() => goToEditStudent(item.id)}
                        style={{ backgroundColor: "green" }}
                        variant="contained"
                      >
                        {" "}
                        <EditIcon style={{ cursor: "pointer" }} />
                        تعديل
                      </Button>

                      <Button
                        onClick={() => handleShow(item.id)}
                        style={{
                          backgroundColor: "orange",
                          marginRight: "10px",
                          marginLeft: "10px",
                        }}
                        variant="contained"
                      >
                        {" "}
                        <VisibilityIcon style={{ cursor: "pointer" }} />
                        درجات
                      </Button>
                      <Button
                        onClick={() => handelDelete(item.id)}
                        style={{ backgroundColor: "red" }}
                        variant="contained"
                      >
                        {" "}
                        <DeleteIcon style={{ cursor: "pointer" }} />
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td colSpan="5" style={{ color: 'red' }}>
                  عند حذف سجل الطالب سيتم حذف جميع درجات الطالب المدخلة
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </Container>
  );
}

export default Students;
