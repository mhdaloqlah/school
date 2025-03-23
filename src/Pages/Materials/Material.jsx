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

function Material() {
  const apilink = import.meta.env.VITE_API_BASE_URL;

  const Api = apilink+ "material";
  const ApiGrades = apilink+ "grade";
  const [material, setMaterial] = useState([
    {
     
      name: '',
      min: '',
      max:'',
      grade_id:''
    }
    
  ]);

  const handelInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(name, value)
    setMaterial({ ...material, [name]: value });
}
  const [grades, setGrades] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [materialGradeMin, setMaterialGradeMin] = useState("");
  const [materialGradeMax, setMaterialGradeMax] = useState("");
  const [materialGradeId, setMaterialGradeId] = useState("");
  const [alert, setAlert] = useState("none");
  const [alertText, setAlertText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const [materialid, setMaterialid] = useState("");
  const [state, setState] = useState("");
  const [stateMin, setStateMin] = useState("");
  const [stateMax, setStateMax] = useState("");
  const [stateGrade, setStateGrade] = useState(1);

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
        name: materialName,
        min:materialGradeMin,
        max:materialGradeMax,
        grade_id:materialGradeId
        
      };

      console.log('material MAx= ');
      console.log(materialName)
    
      axios.post(Api, userData).then((response) => {
        console.log(response.status, response.data);
        getMaterials();
        setShowAddDialog(false);
        setState("");
        setStateMin("");
        setStateMax("");
        setStateGrade(1);
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
    getMaterial(id);
    setMaterialid(id);
    setShowedit(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMaterialName(value);
    console.log(materialName)
  };
  const handleChangeMin = (e) => {
    const value = e.target.value;
    // setStateMin(value);
    setMaterialGradeMin(value)
  };
  const handleChangeMax = (e) => {
    const value = e.target.value;
    setMaterialGradeMax(value);
    // setStateMax(value);
  };
  const handleChangeGrade = (e) => {
    const value = e.target.value;
    setMaterialGradeId(value)
    // setStateGrade(value);
  };

  const handleEditChangeName = (e) => {
    const value = e.target.value;
    setMaterialName(value);
  };

  const handleEditChangeMin = (e) => {
    const value = e.target.value;
    setMaterialGradeMin(value);
  };

  const handleEditChangeMax = (e) => {
    const value = e.target.value;
    setMaterialGradeMax(value);
  };

  const handleEditChangeGrade = (e) => {
    const value = e.target.value;
    setMaterialGradeId(value);
  };

  const handleEditGrade = async () => {
    try {
      const userData = {
        name: materialName,
        min:materialGradeMin,
        max:materialGradeMax,
        grade_id:materialGradeId
      };

      console.log("djdjjdj = " + materialGradeId);
      const response = await fetch(Api + "/" + materialid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to Edit item");
      }
      getMaterials();
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
      const response = await fetch(Api.concat("/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setMaterials(materials.filter((item) => item.id !== id));
      // getYears();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  const getMaterial = (id) => {
    axios
      .get(Api.concat("/") + id)
      .then((res) => {
        setMaterialName(res.data.data.name);
        setMaterialGradeMin(res.data.data.min);
        setMaterialGradeMax(res.data.data.max);
        setMaterialGradeId(res.data.data.grade_id)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMaterials = () => {
    axios
      .get(Api)
      .then((res) => {
        setMaterials(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGrades = () => {
    axios
      .get(ApiGrades)
      .then((res) => {
        setGrades(res.data.data);
        console.log(res.data.data[0].id);
        setMaterialGradeId(res.data.data[0].id);

// console.log(materialGradeId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMaterials();
    getGrades();
  }, []);

 const  handleSelectedValue= (e) => {
  const value = e.target.value;
  setStateGrade(value);
};



  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>المقررات الدراسية</h1>
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
                <th>اسم المقرر</th>
                <th>الدرجة الدنيا</th>
                <th>الدرجة العليا</th>
                <th> الصف</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {materials?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.min}</td>
                    <td>{item.max}</td>
                    <td>{item.grade_name}</td>

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

                     {item.teachers_count=='0' && item.marks_count=='0'?   <Button
                        onClick={() => handelDelete(item.id)}
                        style={{ backgroundColor: "red" }}
                        variant="contained"
                      >
                        {" "}
                        <DeleteIcon style={{ cursor: "pointer" }} />
                        حذف
                      </Button>:''}
                    
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
          <Row>
            <Col xl={6}>
            اسم المقرر
            </Col>
            <Col xl={6}>
             <input
            value={materialName}
            onChange={handleEditChangeName}
            className="form-control"
            type="text"
           
          />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
          الدرجة الدنيا
            </Col>
            <Col xl={6}>
             <input
            value={materialGradeMin}
            onChange={handleEditChangeMin}
            className="form-control"
            type="text"
           
          />
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
          الدرجة الدنيا
            </Col>
            <Col xl={6}>
             <input
            value={materialGradeMax}
            onChange={handleEditChangeMax}
            className="form-control"
            type="text"
            
          />


            </Col>
          </Row>

          <Row style={{ margin: "10px 0px" }}>
            <Col sx={6}>الصف</Col>
            <Col sx={6}>
              <select value={materialGradeId} onChange={handleEditChangeGrade} className="form-select">
                {grades.map((option) => {
                  return (
                    <option key={option.name} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
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
          <Row style={{ margin: "10px 0px" }}>
            <Col sx={6}>اسم المقرر</Col>
            <Col sx={6}>
              <input
                value={material.name}
                onChange={handleChange}
                className="form-control"
                type="text"
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <Col sx={6}>الدرجة الدنيا</Col>
            <Col sx={6}>
              <input
                value={material.min}
                onChange={handleChangeMin}
                className="form-control"
                type="text"
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <Col sx={6}>الدرجة العليا</Col>
            <Col sx={6}>
              <input
                value={material.max}
                onChange={handleChangeMax}
                className="form-control"
                type="text"
                
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 0px" }}>
            <Col sx={6}>الصف</Col>
            <Col sx={6}>
              <select value={materialGradeId} onChange={handleChangeGrade} className="form-select">
                {grades.map((option) => {
                  return (
                    <option key={option.name} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
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

export default Material;
