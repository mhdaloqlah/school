import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home/Home'
import About from './Pages/about/About'
import Dashboard from './Pages/Dashboard/Dashboard'
import Students from './Pages/Students/Students'
import AddStudent from './Pages/Students/_addStudent'
import EditStudent from './Pages/Students/_editStudent'
import ViewStudent from './Pages/Students/_viewStudent'
import Teachers from './Pages/Teachers/Teachers'
import AddTeacher from './Pages/Teachers/_addTeacher'
import EditTeacher from './Pages/Teachers/_editTeacher'
import News from './Pages/News/News'
import AddNews from './Pages/News/_addnews'
import EditNews from './Pages/News/_editnews'
import NewsTeacher from './Pages/News/NewsTeacher'
import NewsStudent from './Pages/News/NewsStudent'
import NewsDetails from './Pages/News/_newsDetails'
import Years from './Pages/Years/Years'
import Dash from './Pages/Dashboard/Dash'
import Grade from './Pages/Grades/Grade'
import Register from './Pages/MaterialTeachers/Register'
import Subclass from './Pages/Subclasses/Subclass'
import Material from './Pages/Materials/Material'
import Mark from './Pages/Marks/Mark'
import StudentMark from './Pages/Marks/StudentMark'
import AdminStudentMark from './Pages/Marks/AdminStudentMark'
import StudentsMark from './Pages/Marks/StudentsMark'
import EditProfile from './Pages/Users/EditProfile'
import EditProfileTeacher from './Pages/Users/EditProfileTeacher'
import AdminStudentsMark from './Pages/Marks/AdminStudentsMark'
import OurTeacher from './Pages/Dashboard/OurTeachers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import AdminDashboard from './Pages/Dashboard/adminDashboard'
import TeacherDashboard from './Pages/Dashboard/TeacherDashboard'
function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/OurTeachers" element={<OurTeacher />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route
              path="teacher"
              element={<TeacherDashboard />}
            />
          <Route
              path="admin"
              element={<AdminDashboard />}
            />
            <Route
              path="EditProfile"
              element={<EditProfile />}
            />

            <Route
              path="EditProfileTeacher"
              element={<EditProfileTeacher />}
            />
            <Route
              path="students"
              element={<Students />}
            />

            <Route
              path="AddStudent"
              element={<AddStudent />}
            />
            <Route
              path="EditStudent"
              element={<EditStudent />}
            />
            <Route
              path='EditStudent/:id'
              element={<EditStudent />}
            />
            <Route
              path='NewsDetails/:id'
              element={<NewsDetails />}
            />
            <Route path="teachers" element={<Teachers />} />
            <Route
              path="AddTeacher"
              element={<AddTeacher />}
            />

            <Route
              path="EditTeacher/:id"
              element={<EditTeacher />}
            />

            <Route
              path="news"
              element={<News />}
            />

            <Route
              path="AddNews"
              element={<AddNews />}
            />

            <Route
              path="EditNews/:id"
              element={<EditNews />}
            />

            <Route
              path="register/:id"
              element={<Register />}
            />

            <Route
              path="mark"
              element={<Mark />}
            />
            <Route
              path="AdminStudentMark/:id"
              element={<AdminStudentMark />}
            />
            <Route
              path="StudentMark"
              element={<StudentMark />}
            />
            <Route
              path="StudentsMark"
              element={<StudentsMark />}
            />
            <Route
              path="AdminStudentsMark"
              element={<AdminStudentsMark />}
            />

            <Route
              path="NewsTeacher"
              element={<NewsTeacher />}
            />
            <Route
              path="NewsStudent"
              element={<NewsStudent />}
            />
            <Route path="years" element={<Years />} />
            <Route path="grades" element={<Grade />} />
            <Route path="Subclass" element={<Subclass />} />
            <Route path="material" element={<Material />} />
          </Route>
          <Route path="/Dash" element={<Dash />} />

        </Routes>

      </Router>
    </>
  )
}

export default App
