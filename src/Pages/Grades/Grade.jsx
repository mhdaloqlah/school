import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";

function Grade() {
  const apilink = import.meta.env.VITE_API_BASE_URL;

  const Api = apilink+ "grade?include=students,materials";
  const [grades, setGrades] = useState([]);
  const [gradeName, setGradeName] = useState("");
  const [alert, setAlert] = useState("none");
  const [alertText, setAlertText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const [gradeid, setGradeid] = useState("");
  const [state, setState] = useState("");

  const [showAddDialog, setShowAddDialog] = useState(false);
  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
  };
  const handleShowAddDialog = (id) => {
    setShowAddDialog(true);
  };

  const handleaddNewYear = async () => {
    try {
      const userData = {
        name: state,
      };
      axios.post(apilink+'grade', userData).then((response) => {
        console.log(response.status, response.data);
        getGrades();
        setShowAddDialog(false);
        setState("");
        setAlertText("إضافة");
        setAlert("");
        const timer = setTimeout(() => {
          setAlert("none");
        }, 3000);

        return () => clearTimeout(timer);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClose = () => {
    setShowedit(false);
  };
  const handleEditShow = (id) => {
    getGrade(id);
    setGradeid(id);
    setShowedit(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const handleEditChange = (e) => {
    const value = e.target.value;
    setGradeName(value);
  };

  const handleEditGrade = async () => {
    try {
      const userData = {
        name: gradeName,
      };

      console.log("djdjjdj = " + userData.name);
      const response = await fetch(apilink + "grade/" + gradeid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to Edit item");
      }
      getGrades();
      setShowedit(false);
      setState("");
      setAlertText("تعديل");

      setAlert("");
      const timer = setTimeout(() => {
        setAlert("none");
      }, 3000);

      return () => clearTimeout(timer);
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
      const response = await fetch(apilink.concat("grade/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      console.log(response);
     
              setGrades(grades.filter((item) => item.id !== id));

      
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  const getGrade = (id) => {
    axios
      .get(apilink.concat("grade/") + id)
      .then((res) => {
        setGradeName(res.data.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGrades = () => {
    axios
      .get(Api)
      .then((res) => {
        setGrades(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGrades();
  }, []);

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>الصفوف</h1>
      <Row style={{ marginTop: "50px" }}>
        <Col xl={1}>
          <Button onClick={handleShowAddDialog} variant="contained">
            إضاقة
          </Button>
        </Col>
      </Row>
      <Row style={{ paddingTop: "20px" }}>
        <Col xl={12}>
          <Alert sx={{ display: alert }} severity="success">
            تم {alertText} البيانات بنجاح.
          </Alert>
        </Col>
      </Row>
      <Row>
        <div className="mt-5">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>اسم الصف</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {grades?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>

                    <td>

                    
                      <Button
                        onClick={() => handleEditShow(item.id)}
                        style={{ backgroundColor: "green" , marginLeft: "10px",}}
                        variant="contained"
                      >
                        {" "}
                        <EditIcon style={{ cursor: "pointer" }} />
                        تعديل
                      </Button>
                      {item.students.length =='0' && item.materials.length =='0'?<Button
                        onClick={() => handelDelete(item.id)}
                        style={{ backgroundColor: "red" }}
                        variant="contained"
                      >
                        {" "}
                        <DeleteIcon style={{ cursor: "pointer" }} />
                        حذف
                      </Button> :'' }

                     
                     
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Row>

     

      <Modal
        style={{ direction: "rtl" }}
        show={showedit}
        onHide={handleEditClose}
      >
        <Modal.Header>
          <Modal.Title>تعديل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={gradeName}
            onChange={handleEditChange}
            className="form-control"
            type="text"
            name="gradename"
            id="gradename"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            إغلاق
          </Button>
          <Button variant="contained" onClick={handleEditGrade}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ direction: "rtl" }}
        show={showAddDialog}
        onHide={handleCloseAddDialog}
      >
        <Modal.Header>
          <Modal.Title>إضافة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sx={6}>اسم الصف</Col>
            <Col sx={6}>
              <input
                value={state}
                onChange={handleChange}
                className="form-control"
                type="text"
                name="yearname"
                id="yearname"
              />
            </Col>
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
          <Button variant="contained" onClick={handleaddNewYear}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Grade;
