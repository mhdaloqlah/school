import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Dialog } from "primereact/dialog";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';

function NewsStudent() {
  const apilink = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const Api = apilink+"news?filter[news_for]=students,public";
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToDetailNews = (id) => { navigate(`/dashboard/NewsDetails/${id}`); };

  const getNews = () => {
    axios
      .get(Api)
      .then((res) => {
        setNews(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  

 

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>سجل الأخبار</h1>
      

      <Row>
        <div className="mt-5">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>رقم الخبر</th>
                <th>عنوان الخبر</th>
                <th>تاريخ الخبر</th>
                <th>تصنيف الخبر</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {news?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>
                      {item.title}
                    </td>
                    <td>{item.news_date}</td>
                    <td>{item.news_for}</td>
                    <td>
                      <Button
                        onClick={() => goToDetailNews(item.id)}
                        style={{ backgroundColor: "orange" }}
                        variant="contained"
                      >
                        {" "}
                        <VisibilityIcon style={{ cursor: "pointer" }} />
                        عرض
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
  );
}

export default NewsStudent;
