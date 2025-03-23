import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const initialNewsInfo = {
    title: "",
    content: "",
    news_for: "",
    news_date: "",
    image: "",

};



function NewsDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const apilink = import.meta.env.VITE_API_BASE_URL;
    const storageLink = import.meta.env.VITE_API_STORAGE_URL;
    const ApiNews = apilink + 'news';
    const [newsData, SetNewsData] = useState([]);
    const [image, setImage] = useState(null);

    const [category, setCategory] = useState("");


   






    


    const [newsInfo, setNewsInfo] = useState(initialNewsInfo);


    const getNewsDataById = (id) => {
        axios
            .get(ApiNews + "/" + id)
            .then((res) => {
                SetNewsData(res.data.data);
                setCategory(res.data.data.news_for);
                initialNewsInfo.title = res.data.data.title;
                initialNewsInfo.content = res.data.data.content;
                initialNewsInfo.news_date = res.data.data.news_date;
                initialNewsInfo.image = res.data.data.image;

                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

   

    useEffect(() => {
        getNewsDataById(id);
    }, []);


    return (
        <Container style={{ paddingRight: "50px" }}>
            <div className="user-view _add-view">
            <h1 style={{ marginTop: "25px" }}>{newsInfo.title}</h1>

                <div className="box">
                    <div className="row">
                    <div className="col-sm-12 col-md-6">
              <p>
               {newsInfo.image ? <img src={storageLink +initialNewsInfo.image} style={{ width: '250px', height: '250px' }} />:''} 
              </p>
              <p>
                {newsInfo.news_date}
              </p>
              <p>
                {newsInfo.content}
              </p>
            </div>
                     

                    </div>
                </div>



               
               

               
               
            </div>
        </Container>
    );
}

export default NewsDetails;
