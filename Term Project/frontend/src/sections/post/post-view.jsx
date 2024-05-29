/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Box, Card, CardActions, CardContent, DialogActions, DialogContent } from '@mui/material';

import { config } from 'src/config';

import Iconify from 'src/components/iconify';

const cookies = new Cookies();
export default function PostsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(null);
  const token = cookies.get('TOKEN');

  const handleAjaxRequest = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${config.apiUrl}posts`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setPosts(response);
      } else {
        const resp = JSON.parse(xhr.response);
        enqueueSnackbar(resp?.error, { variant: 'error' });
      }
    };

    xhr.onerror = () => {
      console.error('Invalid Credentials');
    };

    xhr.send();
  };

  const handleDelete = (postId) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${config.apiUrl}posts/${postId}`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        // const response = JSON.parse(xhr.responseText);
        handleAjaxRequest();
        enqueueSnackbar('Post has been deleted', { variant: 'success' });
      } else {
        const resp = JSON.parse(xhr.response);
        enqueueSnackbar(resp?.error, { variant: 'error' });
      }
    };

    xhr.onerror = () => {
      console.error('Invalid Credentials');
    };

    xhr.send();
  };

  useEffect(() => {
    handleAjaxRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Post</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate('/create')}
        >
          New Post
        </Button>
      </Stack>
      <Box className="all-posts">
        <Grid container spacing={5}>
          {posts?.map((post, index) => (
            <Grid item xs={4} key={`${index}${post?._id}`}>
              <Card>
                <CardHeader title={post?.title} />
                <CardContent>{post?.description}</CardContent>
                <CardActions sx={{ justifyContent: 'end' }}>
                  <Button
                    color="error"
                    onClick={() => {
                      setCurrent(post);
                      setOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => navigate(`/update/${post._id}`)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {posts.length === 0 && <Grid item>No post found!</Grid>}
        </Grid>
      </Box>
      {open && (
        <Dialog open={open}>
          <DialogContent>Are you sure you want to delete ?</DialogContent>
          <DialogActions sx={{ justifyContent: 'end' }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              color="error"
              onClick={() => {
                handleDelete(current?._id);
                setOpen(!open);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
