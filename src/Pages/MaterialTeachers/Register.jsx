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



function Register() {

  const apilink = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [material, setMaterial] = useState("");
  const [materials, setMaterials] = useState([]);
  const ApiMaterials = apilink + "material";

  const getData = () => {
    axios
      .get(apilink + `teacher_material?include=teacher,material.grade&filter[teacher_id]=${id}`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleMaterialChange = (event) => {
    const selectedValue = event.target.value;
    setMaterial(selectedValue);
  }

  const RegisterMaterial = async () => {
    const formData = new FormData();
    formData.append('teacher_id', id);
    formData.append('material_id', material);
    try {
      const response = await axios.post(
        apilink + "teacher_material",
        formData
      );
      if (response) {

        console.log(response.data);
        getData();
        // navigate(`/dashboard/register/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handelDelete = async (id) => {
    console.log("id : -", id);
    // setIsLoading(true);


    try {
      const response = await axios.delete(
        apilink + `teacher_material/${id}`,
        
      );
     
      setData(data.filter((item) => item.id !== id));

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const getMaterials = () => {
    axios
      .get(ApiMaterials)
      .then((res) => {
        setMaterials(res.data.data);
        console.log(res.data.data);
        setMaterial(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
    getMaterials();
  }, []);

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}> مواد المدرس  {data[0]?.teacher.first_name + ' ' + data[0]?.teacher.last_name}</h1>


      <Row>
        <div className="mt-5">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}
          <div className="box">
            <div className="row">
              <div className="col-sm-10 col-md-10">
                <select value={material} onChange={handleMaterialChange} className="form-select">
                  {materials.map((option) => {
                    return (
                      <option key={option.name} value={option.id}>
                        {option.name + '-' + option.grade_name}
                      </option>
                    );
                  })}
                </select>


              </div>
              <div className="col-sm-2 col-md-2">
                <button className="btn btn-primary" onClick={() => RegisterMaterial()}>
                  حفظ
                </button>
              </div>

            </div></div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>رقم </th>
                <th>المادة</th>
                <th>الصف</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>
                      {item.material.name}
                    </td>
                    <td>{item.material.grade.name}</td>
                    <td></td>
                    <td>



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
            </tbody>
          </table>
        </div>
      </Row>
    </Container>
  )
}

export default Register