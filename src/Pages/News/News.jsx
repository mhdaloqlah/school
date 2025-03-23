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

function News() {
  const apilink = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const Api = apilink+"news";
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToEditNews = (id) => { navigate(`/dashboard/EditNews/${id}`); };

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

  const handelDelete = async (id) => {
    console.log("id : -", id);
    // setIsLoading(true);
    try {
      const response = await fetch(apilink.concat("news/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setNews(news.filter((item) => item.id !== id));
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShow = (id) => {
    getStudent(id);
  };

  return (
    <Container style={{ paddingRight: "50px" }}>
      <h1 style={{ marginTop: "25px" }}>سجل الأخبار</h1>
      <Row style={{ marginTop: "50px" }}>
        <Col xl={1}>
          <a href="/dashboard/AddNews" className="btn btn-primary" variant="contained">إضافة</a>
        </Col>
      </Row>

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
                        onClick={() => goToEditNews(item.id)}
                        style={{ backgroundColor: "green", marginLeft:'20px' }}
                        variant="contained"
                      >
                        {" "}
                        <EditIcon style={{ cursor: "pointer" }} />
                        تعديل
                      </Button>

                   
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
  );
}

export default News;
