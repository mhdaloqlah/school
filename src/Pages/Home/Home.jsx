import React, { useState } from 'react';
import logo from '../../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home() {

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', response.data.data.username);
      localStorage.setItem('user_id', response.data.data.id);
      localStorage.setItem('type', response.data.user_type);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('login failed');
    }
  };

  return (
    <Container style={{ height:'100vh', margin:'0 auto',textAlign:'center',direction:'rtl'}}>
     
   

        <img style={{ maxWidth: '400px' }} src={logo} alt="" />
        <Stack>
          <h1>
            تطبيق المدرسة النموذجية
          </h1>
          <h2 style={{ marginBottom: '50px' }}>أهلاً بك</h2>
          <Box component="section" sx={{ p: 2, }}>
            <TextField
              required
              id="outlined-required"
              label="اسم المستخدم"
              value={username}
              sx={{ width: '400px', direction: 'ltr' }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box component="section" sx={{ p: 2, }}>
            <TextField
              id="outlined-password-input"
              label="كلمة المرور"
              type="password"
              autoComplete="current-password"
              sx={{ width: '400px', direction: 'ltr' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box component="section" sx={{ p: 2 }}>
            <Button onClick={handleSubmit} variant="contained">دخول</Button>
            <Link href="/About" sx={{ paddingRight: '50px' }}>نسيت كلمة المرور</Link>
          </Box>


          <Box component="section" sx={{ p: 2 }}>
           <p>
            جميع الحقوق محفوظة للطلاب:
           </p>
          </Box>
        </Stack>
        
        


    </Container>
  )
}

export default Home