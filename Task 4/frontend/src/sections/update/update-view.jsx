/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useParams, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, CardActions } from '@mui/material';

import { config } from 'src/config';

const cookies = new Cookies();
export default function UpdateView() {
  const { postId } = useParams();
  const [post, setPost] = React.useState({ title: '', description: '', id: null });
  const navigate = useNavigate();
  const token = cookies.get('TOKEN');
  const handleChange = (key, value) => {
    setPost({ ...post, [key]: value });
  };

  const getSingleData = async (id) => {
    const response = await fetch(`${config.apiUrl}posts/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (response.ok) {
      setPost(result);
    }
    if (!response.ok) {
      enqueueSnackbar('Post not found!', { variant: 'error' });
    }
  };

  useEffect(() => {
    getSingleData(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${config.apiUrl}posts/edit/${postId}`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('response', response);
        enqueueSnackbar('Post updated successfully', { variant: 'success' });
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
        Update Post
      </Typography>
      <Card sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ marginBottom: '20px' }}>
            <TextField
              name="title"
              label="Title"
              value={post.title}
              required
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              value={post.description}
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
              Update
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
