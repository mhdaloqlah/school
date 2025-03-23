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
import Modal from "react-bootstrap/Modal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgTeacher from './../../assets/teacher.jpg';
import imgStudent from './../../assets/student.jpg';
import imgMaterial from './../../assets/material.jpg';
import imgGrade from './../../assets/grades.png';
import imgSubclass from './../../assets/subclass.jpg';
import Teachers from "../Teachers/Teachers";
import imgyear from './../../assets/year.jpg';
import Grid from '@mui/material/Grid2';

function OurTeachers() {
  
  return (
    <div>Teachers</div>
  )
}

export default OurTeachers