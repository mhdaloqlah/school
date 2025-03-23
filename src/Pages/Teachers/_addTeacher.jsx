import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

const initialTeacherInfo = {
  first_name: "",
  last_name: "",
  birth_date: "",
  birth_place: "",
  username: "",
  education: "",
  image: "",
  
};

const apilink = import.meta.env.VITE_API_BASE_URL;

function AddTeacher() {
  const navigate = useNavigate();
 

  const [image, setImage] = useState(null);


  const [teacherInfo, setTeacherInfo] = useState(initialTeacherInfo);
  const addNewTeacher = async () => {

    console.log(teacherInfo.grade);
    const formData = new FormData();
    formData.append("first_name", teacherInfo.first_name);
    formData.append("last_name", teacherInfo.last_name);
    formData.append("username", teacherInfo.username);
    formData.append("birth_date", teacherInfo.birth_date);
    formData.append("birth_place", teacherInfo.birth_place);
    if (image) {
      formData.append("image", image);
    }
    formData.append("education", teacherInfo.education);
   
    try {

      const response = await axios.post(
        apilink+ "teacher",
        formData
      );
      if (response) {
        // props.setStudentAdded();
        console.log(response.data);
        navigate(`/dashboard/teachers/`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
   
  }, []);

  const handleChangeGrade = (e) => {
    const value = e.target.value;
    // setStateGrade(value);
  };

  return (
    <Container style={{ paddingRight: "50px" }}>
      <div className="user-view _add-view">
        <h1 style={{ marginTop: "25px" }}>المعلومات الشخصية</h1>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <span>الاسم الأول</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل الاسم الأول"
                  value={teacherInfo.first_name}
                  onChange={(e) =>
                    setTeacherInfo({
                      ...teacherInfo,
                      first_name: e.target.value,
                    })
                  }
                />
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>الكنية:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل الكنية"
                  value={teacherInfo.last_name}
                  onChange={(e) =>
                    setTeacherInfo({
                      ...teacherInfo,
                      last_name: e.target.value,
                    })
                  }
                />
              </p>
            </div>
           
            <div className="col-sm-12 col-md-6">
              <p>
                <span>تاريخ الولادة:</span>
                <input
                  type="date"
                  className="form-control"
                  value={teacherInfo.birth_date}
                  onChange={(e) =>
                    setTeacherInfo({
                      ...teacherInfo,
                      birth_date: e.target.value,
                    })
                  }
                />
              </p>
            </div>

            <div className="col-sm-12 col-md-6">
              <p>
                <span>مكان الولادة:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="مكان الولادة"
                  value={teacherInfo.birth_place}
                  onChange={(e) =>
                    setTeacherInfo({
                      ...teacherInfo,
                      birth_place: e.target.value,
                    })
                  }
                />
              </p>
            </div>
          </div>
        </div>

       

        <div className="col-sm-12 col-md-6">
              <p>
                <span>التعليم:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="التعليم"
                  value={teacherInfo.education}
                  onChange={(e) =>
                    setTeacherInfo({ ...teacherInfo, education: e.target.value })
                  }
                />
              </p>
            </div>
        

        <h1>معلومات الدخول</h1>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <span>اسم المستخدم:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل الاسم الأول"
                  value={teacherInfo.username}
                  onChange={(e) =>
                    setTeacherInfo({ ...teacherInfo, username: e.target.value })
                  }
                />
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

        <button className="btn btn-primary" onClick={() => addNewTeacher()}>
          حفظ
        </button>
        <a style={{ marginRight: "20px" }} href="/dashboard/teachers">
          عودة
        </a>
      </div>
    </Container>
  );
}

export default AddTeacher;
