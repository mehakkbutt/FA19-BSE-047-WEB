import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { config } from 'src/config';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

export default function RegisterView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const initUser = {
    name: '',
    email: '',
    password: '',
    age: 0,
  };
  const [user, setUser] = useState(initUser);
  //   const [error, setError] = useState('');
  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${config.apiUrl}users/register`, true);
    xhr.setRequestHeader('authorization', localStorage.getItem('user'));
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('response', response);
        enqueueSnackbar('User created successfully', { variant: 'success' });
        navigate('/login');
      } else {
        const resp = JSON.parse(xhr.response);
        console.log('🚀 ~ handleSubmit ~ resp:', resp);
        enqueueSnackbar(resp.message, { variant: 'error' });
      }
    };

    xhr.onerror = () => {
      console.error('Invalid Credentials');
    };

    xhr.send(JSON.stringify(user));
  };
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ marginBottom: '20px' }}>
        <TextField
          name="name"
          label="Name"
          required
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          type="email"
          required
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          onChange={(e) => handleChange('password', e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="age"
          label="Age"
          type="number"
          required
          onChange={(e) => handleChange('age', e.target.value)}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Sign up
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign up </Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?{' '}
            <Link to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
              Please login
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
