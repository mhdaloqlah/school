import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

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

const apilink = import.meta.env.VITE_API_BASE_URL;

function AddStudent() {
  const navigate = useNavigate();

  const ApiGrades = apilink + "grade";
  const [grades, setGrades] = useState([]);
  const ApiSubclass = apilink + "subclass";
  const [subclasses, setSubclasses] = useState([]);
  const ApiYears = apilink + "year";
  const [years, setYears] = useState([]);
  const ApiTerms = apilink + "term";
  const [terms, setTerms] = useState([]);
  const [image, setImage] = useState(null);

  const [grade, setGrade] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [subclass, setSubclass] = useState("");
  const [subclassname, setSubclassname] = useState("");
  const [term, setTerm] = useState("");
  const [termname, setTermname] = useState("");
  const [year, setYear] = useState("");
  const [yearname, setYearname] = useState("");

  const handleGradeChange = (event) => {
    const selectedValue = event.target.value;
    setGrade(selectedValue);

    const selectedItem = grades.find((cat) => cat.id === selectedValue);
    if (selectedItem) {
      setGradeName(selectedItem.name);
    }
  };

  const handleSubclassChange = (event) => {
    const selectedValue = event.target.value;
    setSubclass(selectedValue);

    const selectedItem = subclasses.find((cat) => cat.id === selectedValue);
    if (selectedItem) {
      setSubclassname(selectedItem.name);
    }
  };

  const handleYearChange = (event) => {
    const selectedValue = event.target.value;
    setYear(selectedValue);

    const selectedItem = years.find((cat) => cat.id === selectedValue);
    if (selectedItem) {
      setYearname(selectedItem.name);
    }
  };

  const handleTermChange = (event) => {
    const selectedValue = event.target.value;
    setTerm(selectedValue);

    const selectedItem = terms.find((cat) => cat.id === selectedValue);
    if (selectedItem) {
      setTermname(selectedItem.name);
    }
  };

  const getGrades = () => {
    axios
      .get(ApiGrades)
      .then((res) => {
        setGrades(res.data.data);
        console.log(res.data.data);
        setGrade(res.data.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubclasses = () => {
    axios
      .get(ApiSubclass)
      .then((res) => {
        setSubclasses(res.data.data);
        setSubclass(res.data.data[0].id);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getYears = () => {
    axios
      .get(ApiYears)
      .then((res) => {
        setYears(res.data.data);
        setYear(res.data.data[0].id);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTerms = () => {
    axios
      .get(ApiTerms)
      .then((res) => {
        setTerms(res.data.data);
        setTerm(res.data.data[0].id);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);
  const addNewStudent = async () => {

    console.log(studentInfo.grade);
    const formData = new FormData();
    formData.append("first_name", studentInfo.first_name);
    formData.append("last_name", studentInfo.last_name);
    formData.append("username", studentInfo.username);
    formData.append("father", studentInfo.father);
    formData.append("mother", studentInfo.mother);
    formData.append("birth_date", studentInfo.birth_date);
    formData.append("birth_place", studentInfo.birth_place);
    formData.append("phone", studentInfo.phone);
    if (image) {
      formData.append("image", image);
    }
    formData.append("grade_id", grade);
    formData.append("subclass_id", subclass);
    formData.append("register_year_id", year);
    formData.append("register_term_id", term);
    formData.append("address", studentInfo.place);
    try {

      const response = await axios.post(
        apilink + "student",
        formData
      );
      if (response) {
        // props.setStudentAdded();
        console.log(response.data);
        navigate(`/dashboard/students/`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGrades();
    getSubclasses();
    getYears();
    getTerms();
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
                  value={studentInfo.first_name}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
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
                  value={studentInfo.last_name}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      last_name: e.target.value,
                    })
                  }
                />
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>اسم الأب:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="اسم الاب"
                  value={studentInfo.father}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, father: e.target.value })
                  }
                />
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>اسم الأم:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="اسم الأم"
                  value={studentInfo.mother}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, mother: e.target.value })
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
                  value={studentInfo.birth_date}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
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
                  value={studentInfo.birth_place}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      birth_place: e.target.value,
                    })
                  }
                />
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

        <h1>المعلومات الدراسية</h1>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <span>الصف:</span>

                <select value={grade} onChange={handleGradeChange} className="form-select">
                  {grades.map((option) => {
                    return (
                      <option key={option.name} value={option.id}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>الشعبة:</span>
                <select value={subclass} onChange={handleSubclassChange} className="form-select">
                  {subclasses.map((option) => {
                    return (
                      <option key={option.name} value={option.id}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>عام التسجيل</span>
                <select value={year} onChange={handleYearChange} className="form-select">
                  {years.map((option) => {
                    return (
                      <option key={option.name} value={option.id}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <span>فصل التسجيل</span>
                <select value={term} onChange={handleTermChange} className="form-select">
                  {terms.map((option) => {
                    return (
                      <option key={option.name} value={option.id}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </p>
            </div>
          </div>
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
                  value={studentInfo.username}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, username: e.target.value })
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

        <button className="btn btn-primary" onClick={() => addNewStudent()}>
          حفظ
        </button>
        <a style={{ marginRight: "20px" }} href="/dashboard/students">
          عودة
        </a>
      </div>
    </Container>
  );
}

export default AddStudent;
