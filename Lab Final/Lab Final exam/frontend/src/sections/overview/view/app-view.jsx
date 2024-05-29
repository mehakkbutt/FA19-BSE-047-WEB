/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'universal-cookie';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { config } from 'src/config';
import { enqueueSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from '@mui/material';

const cookies = new Cookies();

export default function AppView() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(null);
  const token = cookies.get('TOKEN');

  const handleAjaxRequest = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${config.apiUrl}products`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setProducts(response);
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
    xhr.open('DELETE', `${config.apiUrl}products/${postId}`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        // const response = JSON.parse(xhr.responseText);
        handleAjaxRequest();
        enqueueSnackbar('Product has been deleted', { variant: 'success' });
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
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      <Box className="all-posts">
        <Grid container spacing={5}>
          {products
            ?.filter((x) => x.isFeatured)
            ?.slice(0, 5)
            ?.map((product, index) => (
              <Grid item xs={4} key={`${index}${product?._id}`}>
                <Card>
                  <CardHeader title={product?.name} />
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} sx={{ marginBottom: '15px' }}>
                        {product?.description}
                      </Grid>
                      <Grid item xs={5}>
                        <Typography sx={{ fontWeight: 'bold' }}>Price</Typography>${product.price}
                      </Grid>
                      <Grid item xs={5}>
                        <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>
                        {product.category}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        justifyContent="end"
                        sx={{ marginTop: '15px', alignContent: 'end' }}
                      >
                        {product?.isFeatured && (
                          <Chip label="Featured" color="success" variant="outlined" />
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'end' }}>
                    <Button
                      color="error"
                      onClick={() => {
                        setCurrent(product);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => navigate(`/view-product/${product._id}`)}
                    >
                      View
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => navigate(`/update-product/${product._id}`)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          {products.length === 0 && <Grid item>No product found!</Grid>}
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
