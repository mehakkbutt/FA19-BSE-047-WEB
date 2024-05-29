import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { enqueueSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { config } from 'src/config';

import { ProductView } from 'src/sections/product';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const cookies = new Cookies();
export default function ViewSingleProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = cookies.get('TOKEN');
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(null);
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: 0,
    isFeatured: false,
    category: '',
    id: null,
  });
  const getSingleData = async (id) => {
    const response = await fetch(`${config.apiUrl}products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (response.ok) {
      setProduct(result);
    }
    if (!response.ok) {
      enqueueSnackbar('Product not found!', { variant: 'error' });
    }
  };

  useEffect(() => {
    getSingleData(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleDelete = (postId) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${config.apiUrl}products/${postId}`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        // const response = JSON.parse(xhr.responseText);
        navigate('/products');
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
  return (
    <>
      <Helmet>
        <title>Product | Demo </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">View Product</Typography>
        </Stack>
        <Box className="all-posts">
          <Grid container spacing={5}>
            <Grid item xs={8} key={`${product?._id}`}>
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
                    onClick={() => navigate(`/update-product/${product._id}`)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
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
    </>
  );
}
