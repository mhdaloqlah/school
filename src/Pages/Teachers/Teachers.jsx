import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

import Button from "@mui/material/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';

function Teachers() {
  const apilink = import.meta.env.VITE_API_BASE_URL;
  const storageLink = import.meta.env.VITE_API_STORAGE_URL;

  const navigate = useNavigate();
  const Api = apilink+"teacher";
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToEditTeacher = (id) => { navigate(`/dashboard/EditTeacher/${id}`); };
  const goTRegisterTeacher = (id) => { navigate(`/dashboard/register/${id}`); };

  const getTeachers = () => {
    axios
      .get(Api)
      .then((res) => {
        setTeachers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    // setIsLoading(true);
    try {
      const response = await fetch(apilink.concat("teacher/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setTeachers(teachers.filter((item) => item.id !== id));
      // getYears();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShow = (id) => {
    getStudent(id);
  };

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>سجل المدرسين</h1>
      <Row style={{ marginTop: "50px" }}>
        <Col xl={1}>
          <a href="/dashboard/AddTeacher" className="btn btn-primary" variant="contained">إضافة</a>
        </Col>
      </Row>

      <Row>
        <div className="mt-5">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>رقم المدرس</th>
                <th>اسم المدرس</th>
              <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>
                      {item.first_name} {item.last_name}
                    </td>

                    <td>
                        <img src={storageLink + item.image} style={{width:'100px',height:'100px'}}/>
                    </td>
                  
                    <td>
                      <Button
                        onClick={() => goToEditTeacher(item.id)}
                        style={{ backgroundColor: "green" }}
                        variant="contained"
                      >
                        {" "}
                        <EditIcon style={{ cursor: "pointer" }} />
                        تعديل
                      </Button>

                      <Button
                         onClick={() => goTRegisterTeacher(item.id)}
                        style={{
                          backgroundColor: "orange",
                          marginRight: "10px",
                          marginLeft: "10px",
                        }}
                        variant="contained"
                      >
                        {" "}
                        <VisibilityIcon style={{ cursor: "pointer" }} />
                        مواد المدرس
                      </Button>

                      {
                        item.materials_count =='0'?  <Button
                        onClick={() => handelDelete(item.id)}
                        style={{ backgroundColor: "red" }}
                        variant="contained"
                      >
                        {" "}
                        <DeleteIcon style={{ cursor: "pointer" }} />
                        حذف
                      </Button>:''
                      }
                     
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Row>
    </Container>
  );
}

export default Teachers;
