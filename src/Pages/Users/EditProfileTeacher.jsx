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

const initialTeacherInfo = {
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
  education:''
};


function EditProfileTeacher() {
  const navigate = useNavigate();

  const apilink = import.meta.env.VITE_API_BASE_URL;
  const storageLink = import.meta.env.VITE_API_STORAGE_URL;

  const [id, setId] =useState( localStorage.getItem('object_id'));
  const [userId,setUserid]=useState( localStorage.getItem('user_id'));
  const ApiTeacher = apilink + 'teacher';
  const [teacher, SetTeacher] = useState([]);

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

  const getTeacher = (id) => {
    axios
      .get(ApiTeacher + "/" + id + '')
      .then((res) => {
        SetTeacher(res.data.data);

        initialTeacherInfo.first_name = res.data.data.first_name;
        initialTeacherInfo.last_name = res.data.data.last_name;
   
      
        initialTeacherInfo.birth_date = res.data.data.birth_date;
        initialTeacherInfo.birth_place = res.data.data.birth_place;
        initialTeacherInfo.username = res.data.data.username;
        initialTeacherInfo.education = res.data.data.education;
      
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const [TeacherInfo, setTeacherInfo] = useState(initialTeacherInfo);
  const SaveEditData = async () => {

    const formData = new FormData();
    formData.append("id", id);

    // formData.append("phone", TeacherInfo.phone);
    if (image) {
      formData.append("image", image);
    }

    formData.append("education", TeacherInfo.education);
    try {

      const response = await axios.post(
        apilink + "updateteacher",
        formData
      );
      if (response) {
        // props.setStudentAdded();
        console.log(response.data.data.image);
        console.log('---------');



        getTeacher(id);

        localStorage.setItem('user_image', response.data.data.image);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getTeacher(id);
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

      <Modal style={{ direction: "rtl" }} show={show} onHide={handleClose}>
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

      <div className="user-view _add-view">
        <h1 style={{ marginTop: "25px" }}>المعلومات الشخصية</h1>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <img src={storageLink +teacher.image} style={{ width: '250px', height: '250px' }} />

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
                <span>{TeacherInfo.first_name}</span>

              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>الكنية: </span>
                <span>{TeacherInfo.last_name}</span>


              </p>
            </div>
           
            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>تاريخ الولادة: </span>
                <span>{TeacherInfo.birth_date}</span>
              </p>
            </div>

            <div className="col-sm-12 col-md-6">
              <p>
                <span style={{ fontWeight: 'bold' }}>مكان الولادة: </span>
                <span>{TeacherInfo.birth_place}</span>
              </p>
            </div>

           


           
          </div>
        </div>

        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <p>
                <span style={{fontWeight:'bold'}}>التعليم:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="العنوان"
                  value={TeacherInfo.education}
                  onChange={(e) =>
                    setTeacherInfo({ ...TeacherInfo, education: e.target.value })
                  }
                />
              </p>
            </div>
           
          </div>
        </div>





        <button className="btn btn-primary" onClick={() => SaveEditData()}>
          حفظ
        </button>

        <button className="btn btn-primary m-5" onClick={() => handleShow()}>
          تعديل كلمة المرور
        </button>

      </div>
    </Container>
  );
}

export default EditProfileTeacher