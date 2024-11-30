import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../../components/Appbar/Appbar';
import Box from '@mui/material/Box';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Appbar/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const [username, setUsername] = useState(localStorage.getItem('user_id'));
    const navigate = useNavigate();


    // useEffect(() => {

    // });
    return (
        <Container fluid style={{ width: '100vw', direction: 'rtl' }}>
            <Row>
                <Col style={{ padding: 0 }} md={2} xs={2}> <Sidebar />
                </Col>
                <Col md={10} xs={10}>
                    <Outlet />
                </Col>
            </Row>


        </Container>
    )
}

export default Dashboard