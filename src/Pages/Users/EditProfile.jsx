import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled/base';
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const initialStudentInfo = {
  first_name: "",
  last_name: "",
  father: "",
  mother: "",
  birth_date: "",
  birth_place: "",
  username: "",
  address: "",
  phone: "",
  image: "",
  grade: "",
  subclass: "",
  year: "",
  term: "",
  place: "",
};


function EditProfile() {
  const navigate = useNavigate();

  const apilink = import.meta.env.VITE_API_BASE_URL;
  const storageLink = import.meta.env.VITE_API_STORAGE_URL;

  const [id, setId] = useState(localStorage.getItem('object_id'));
  const [userId, setUserid] = useState(localStorage.getItem('user_id'));
  const ApiStudent = apilink + 'student';
  const [student, SetStudent] = useState([]);

  const [image, setImage] = useState(null);




  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMsg('');
    setBtnShow('none');
  };
  const handleShow = (id) => {


    setShow(true);
  };

  const getStudent = (id) => {
    axios
      .get(ApiStudent + "/" + id + '?include=grade,subclass,register_term,register_year')
      .then((res) => {
        SetStudent(res.data.data);

        initialStudentInfo.first_name = res.data.data.first_name;
        initialStudentInfo.last_name = res.data.data.last_name;
        initialStudentInfo.father = res.data.data.father;
        initialStudentInfo.mother = res.data.data.mother;
        initialStudentInfo.place = res.data.data.address;
        initialStudentInfo.phone = res.data.data.phone;
        initialStudentInfo.birth_date = res.data.data.birth_date;
        initialStudentInfo.birth_place = res.data.data.birth_place;
        initialStudentInfo.username = res.data.data.username;
        initialStudentInfo.grade = res.data.data.grade.name;
        initialStudentInfo.subclass = res.data.data.subclass.name;
        initialStudentInfo.term = res.data.data.register_term.name;
        initialStudentInfo.year = res.data.data.register_year.name;
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const addNewStudent = async () => {

    const formData = new FormData();
    formData.append("id", id);

    formData.append("phone", studentInfo.phone);
    if (image) {
      formData.append("image", image);
    }

    formData.append("address", studentInfo.place);
    try {

      const response = await axios.post(
        apilink + "updatestudent",
        formData
      );
      if (response) {
        // props.setStudentAdded();
        console.log(response.data.data.image);
        console.log('---------');



        getStudent(id);

        localStorage.setItem('user_image', response.data.data.image);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getStudent(id);
  }, []);


  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [btnShow, setBtnShow] = useState('none');
  const handlechangeInputPassword = (e) => {
    setPassword(e.target.value);

    if (e.target.value !== passwordConfirm) {
      setMsg('يجب أن تكون كلمة المرور متطابقة');
      setBtnShow('none');
    } else {
      setMsg('');
      setBtnShow('block');
    }

    if (password === '') { setBtnShow('none'); }
  }

  const handlechangeInputConfirmPassword = (e) => {
    setPasswordConfirm(e.target.value);
    if (password !== e.target.value) {
      setMsg('يجب أن تكون كلمة المرور متطابقة');
      setBtnShow('none');
    } else {
      setMsg('');
      setBtnShow('block');
    }

    if (passwordConfirm === '') { setBtnShow('none'); }
  }

  const changePassword = async () => {
    const formData = new FormData();


    console.log(userId);
    console.log(password);
    formData.append("id", userId);

    formData.append("password", password);

    try {

      const response = await axios.post(
        apilink + "changepassword",
        formData
      );
      if (response) {
        console.log(response);
        setShow(false);

      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container style={{ paddingRight: "50px" }}>

     

      <div className="user-view">
       

        <div className="box">
          <div className="row">
          <div className="col-sm-10 col-md-10">
              <h3>المعلومات الدراسية</h3>
            </div>
            <div className="col-sm-12 col-md-6">

              <p>
                <img src={storageLink + student.image} style={{ width: '150px', height: '150px' }} />

              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>الصورة الشخصية:</span>
                <input

                  type="file"
                  placeholder=""
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>الاسم الأول: </span>
                <span>{studentInfo.first_name}</span>

              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>الكنية: </span>
                <span>{studentInfo.last_name}</span>


              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>اسم الأب: </span>
                <span>{studentInfo.father}</span>

              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>اسم الأم: </span>
                <span>{studentInfo.mother}</span>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>تاريخ الولادة: </span>
                <span>{studentInfo.birth_date}</span>
              </p>
            </div>

            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>مكان الولادة: </span>
                <span>{studentInfo.birth_place}</span>
              </p>
            </div>

            <div className="col-sm-12 col-md-12">
              <h3>المعلومات الدراسية</h3>
            </div>



            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>الصف: </span>
                <span>{studentInfo.grade}</span>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>الشعبة: </span>
                <span>{studentInfo.subclass}</span>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>سنة التسجيل: </span>
                <span>{studentInfo.year}</span>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>فصل التسجيل: </span>
                <span>{studentInfo.term}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <span>العنوان:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="العنوان"
                  value={studentInfo.place}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, place: e.target.value })
                  }
                />
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>رقم الهاتف:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="رقم الهاتف"
                  value={studentInfo.phone}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, phone: e.target.value })
                  }
                />
              </p>
            </div>
          </div>
        </div>





        <button className="btn btn-primary" onClick={() => addNewStudent()}>
          حفظ
        </button>

        <button className="btn btn-primary m-5" onClick={() => handleShow()}>
          تعديل كلمة المرور
        </button>

      </div> <Modal style={{ direction: "rtl" }} show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>تعديل بيانات الدخول</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sx={6}>كلمة المرور الجديدة</Col>
          </Row>
          <Row>
            <Col sx={12}> <input
              // value={yearname}
              onChange={handlechangeInputPassword}
              className="form-control"
              type="password"

            /></Col>
          </Row>
          <Row className='mt-2'>
            <Col sx={6}>تأكيد كلمة المرور الجديدة</Col>

          </Row>
          <Row>
            <Col sx={12}> <input
              // value={yearname}
              onChange={handlechangeInputConfirmPassword}
              className="form-control"
              type="password"
            /></Col>
          </Row>
          <Row>
            <Col>
              <p style={{ color: 'red' }}>{msg}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button style={{ display: `${btnShow}` }} onClick={changePassword} variant="contained">
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditProfile