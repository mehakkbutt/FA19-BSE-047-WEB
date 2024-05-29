/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Cookies from 'universal-cookie';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, CardActions } from '@mui/material';

import { config } from 'src/config';

const cookies = new Cookies();
export default function CreateView() {
  const [post, setPost] = React.useState({ title: '', description: '' });
  const navigate = useNavigate();
  const token = cookies.get('TOKEN');
  const handleChange = (key, value) => {
    setPost({ ...post, [key]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${config.apiUrl}posts`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('response', response);
        enqueueSnackbar('Post created successfully', { variant: 'success' });
        navigate('/posts');
      } else {
        const resp = JSON.parse(xhr.response);
        console.log('🚀 ~ handleSubmit ~ resp:', resp);
        enqueueSnackbar(resp.error, { variant: 'error' });
      }
    };

    xhr.onerror = () => {
      console.error('Invalid Credentials');
    };

    xhr.send(JSON.stringify(post));
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Create Post
      </Typography>
      <Card sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ marginBottom: '20px' }}>
            <TextField
              name="title"
              label="Title"
              required
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              placeholder="Description"
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Stack>
          <CardActions sx={{ justifyContent: 'end' }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ width: 30 }}
            >
              Create
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
