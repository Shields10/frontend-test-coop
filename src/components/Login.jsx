import React , { useState }from 'react'
import {  Button, Box,Paper, FormControl, FormHelperText,
          Typography,InputLabel,Input,InputAdornment,CardMedia,IconButton,Alert,Card,CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import BackgroundImage from '../assets/bg.png';
import Logo from '../assets/logo.svg';
import GreenLeaves from '../assets/green-leaves-white-background.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = ({ setAccessToken }) => {
 

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({ username: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
  
  const defaultTheme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });



  const validate = () => { 
    let isValid = true; 
    const newErrors = { username: false, password: false };
     if (username.trim() === '') { 
      newErrors.username = true; isValid = false;
     } 
     if (password.trim() === '') {
       newErrors.password = true; isValid = false; 
      }
    setErrors(newErrors); return isValid;
   };
 
    
  

  const handleUserNameChange = (e) => { 
    setUserName(e.target.value); 
    if (e.target.value.trim() !== '') {
       setErrors((prev) => ({ ...prev, username: false })); 
      } 
    }; 
      
  const handlePasswordChange = (e) => {
      setPassword(e.target.value); 
      if (e.target.value.trim() !== '') {
        setErrors((prev) => ({ ...prev, password: false }));
        } 
    };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    if (validate()) { 
      console.log("username",username)
      console.log("password",password)
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username:username,
              password:password
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            setAccessToken(data.token); // Set the accessToken 
            navigate('/dashboard'); // Redirect to dashboard 
            } else {
               throw new Error('Login failed'); 
              } 
            } catch (error) {
              console.log(error)
               setLoginError('Login failed. Please check your username and password.');
          }
    }
   };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} sm={10} md={8} sx={{ height: '60vh' }}>
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={false} sm={4} md={5} sx={{ height: '100%' }}>
          
              <CardMedia
                component="img"
                image={BackgroundImage}
                alt="co-op image"
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
             <CardMedia
                component="img"
                image={Logo}
                alt="logo"
                sx={{position: 'absolute', bottom: '60%', left: '25%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', objectFit: 'cover'}}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square sx={{ height: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 'none', border: 'none' }}>
                <CardMedia
                    sx={{ position: 'absolute',height: '10%', width: '10%',bottom: '67%', right: '22%'}}
                    image={GreenLeaves}
                     alt="green-leaves"
                  />
                <CardContent>
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ color:'grey'}}>
                          WELCOME TO
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ color:'green'}}>
                           Inua Mkulima- Subsidy Program
                    </Typography>
    
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                      {loginError && <Alert severity="error">{loginError}</Alert>}
                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel>Username</InputLabel>
                        <Input
                          required
                          id="standard-adornment-username"
                          startAdornment={<InputAdornment position="start"></InputAdornment>}
                          onChange={handleUserNameChange}
                          aria-describedby="username-helper" placeholder="Username"
                        />
                        {errors.username && <FormHelperText sx={{ color: 'red' }} id="username-helper">Username is required</FormHelperText>}
                      </FormControl>

                      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                          required
                          id="standard-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          onChange={handlePasswordChange}
                          aria-describedby="password-helper" placeholder="Password"
                        />
                        {errors.password && <FormHelperText sx={{ color: 'red' }} id="password-helper">Password is required</FormHelperText>}
                      </FormControl>
                      <Button style={{ color: 'white' }}
                        endIcon={<ChevronRightIcon />}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="ochre" 
                      >
                        Sign In
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
 );
}

export default Login

