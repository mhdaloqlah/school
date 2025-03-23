import React, { useState, useEffect } from "react";
import AppsIcon from '@mui/icons-material/Apps';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {
      const navigate = useNavigate();
  
  const storageLink =import.meta.env.VITE_API_STORAGE_URL;
  const [username, setUsername] = useState(localStorage.getItem('user_first_name'));

  const [usertype, setUserType] = useState(localStorage.getItem('usertype'));
  const [userId, setUserid] = useState(localStorage.getItem('user_id'));
  const [userImage, setUserImage] = useState(localStorage.getItem('user_image'));
  const [user, SetUser] = useState([]);

    

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            أهلاً {username}
          </a>
        </CDBSidebarHeader>
        {usertype == 'student' ? <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <div style={{ textAlign: 'center' }}>
              <img src={storageLink+ userImage} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

            </div>


            <NavLink exact to="/dashboard/StudentMark" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">درجاتي</CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink exact to="/dashboard/NewsStudent" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">أخبار مدرسية</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/EditProfile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">الحساب الشخصي</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem>تسجيل خروج</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
          :
          //teacher panel
          ''
        }


        {usertype == 'teacher' ? <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <div style={{ textAlign: 'center' }}>
              <img src={storageLink+ userImage} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

            </div>
         
            <NavLink exact to="/dashboard/mark" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">دفتر الدرجات</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/StudentsMark" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">محصلات</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/NewsTeacher" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">أخبار إدارية</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/EditProfileTeacher" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">الحساب الشخصي</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem>تسجيل خروج</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
          :
          //teacher panel
          ''
        }


        

        {usertype == 'admin' ?
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>

              <NavLink exact to="/dashboard/admin" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">الرئيسية</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/AdminStudentsMark" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="square">محصلات</CDBSidebarMenuItem>
            </NavLink>
              <NavLink exact to="/dashboard/students" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">الطلاب</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/teachers" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">المدرسين</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/years" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="star"> السنوات الدراسية</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/grades" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="circle">الصفوف</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/subclass" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">الشعب</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/dashboard/material" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="square">المقررات الدراسية</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/dashboard/news" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="square">الأخبار</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem>تسجيل خروج</CDBSidebarMenuItem>
            </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          : ''}


        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            2025
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div >
  );
};

export default Sidebar;