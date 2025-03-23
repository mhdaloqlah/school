import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

const initialNewsInfo = {
    title: "",
    content: "",
    news_for: "",
    news_date: "",
    image: "",

};

const apilink = import.meta.env.VITE_API_BASE_URL;

function AddNews() {
    const navigate = useNavigate();

    const [categorylist, setCategoryList] = useState(['public', 'students', 'teachers']);
    const [image, setImage] = useState(null);

    const [category, setCategory] = useState("");


    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setCategory(selectedValue);

        const selectedItem = categorylist.find((cat) => cat.id === selectedValue);

    };







    const getCategories = () => {

        setCategory(categorylist[0]);

    };


    const [newsInfo, setNewsInfo] = useState(initialNewsInfo);


    const addNewNews = async () => {

        const formData = new FormData();
        formData.append("title", newsInfo.title);
        formData.append("content", newsInfo.content);
        formData.append("news_date", newsInfo.news_date);
        if (image) {
            formData.append("image", image);
          }
        formData.append("news_for", category);

        try {

            const response = await axios.post(
                apilink + "news",
                formData
            );
            if (response) {
                // props.setStudentAdded();
                console.log(response.data);
                navigate(`/dashboard/news/`);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCategories();

    }, []);


    return (
        <Container style={{ paddingRight: "50px" }}>
            <div className="user-view _add-view">
                <h1 style={{ marginTop: "25px" }}>خبر جديد</h1>
                <div className="box">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <p>
                                <span>عنوان الخبر</span>
                                <input
                                    type="text"
                                    className="form-control"

                                    value={newsInfo.title}
                                    onChange={(e) =>
                                        setNewsInfo({
                                            ...newsInfo,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-12">
                            <p>
                                <span>المحتوى:</span>
                                <textarea name="body"
                                    className="form-control"

                                    value={newsInfo.content}
                                    onChange={(e) =>
                                        setNewsInfo({
                                            ...newsInfo,
                                            content: e.target.value,
                                        })
                                    } />

                            </p>
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <p>
                                <span>تاريخ الخبر:</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={newsInfo.news_date}
                                    onChange={(e) =>
                                        setNewsInfo({
                                            ...newsInfo,
                                            news_date: e.target.value,
                                        })
                                    }
                                />
                            </p>
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <p>
                                <span>الخبر موجه إلى:</span>

                                <select value={category} onChange={handleCategoryChange} className="form-select">
                                    {categorylist.map((option) => {
                                        return (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                            </p>
                        </div>

                    </div>
                </div>



                
              
                <div className="box">
                    <div className="row">

                        <div className="col-sm-12 col-md-6">
                            <p>
                                <span>صورة:</span>
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

                <button className="btn btn-primary" onClick={() => addNewNews()}>
                    حفظ
                </button>
                <a style={{ marginRight: "20px" }} href="/dashboard/news">
                    عودة
                </a>
            </div>
        </Container>
    );
}

export default AddNews;
