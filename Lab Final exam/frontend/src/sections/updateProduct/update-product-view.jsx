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
import {
  Card,
  CardActions,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';

import { config } from 'src/config';

const cookies = new Cookies();
export default function UpdateProductView() {
  const { productId } = useParams();
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    price: 0,
    isFeatured: false,
    category: '',
    id: null,
  });
  const navigate = useNavigate();
  const token = cookies.get('TOKEN');
  const handleChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${config.apiUrl}products/edit/${productId}`, true);
    xhr.setRequestHeader('authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        console.log('response', response);
        enqueueSnackbar('Product updated successfully', { variant: 'success' });
        navigate('/products');
      } else {
        const resp = JSON.parse(xhr.response);
        console.log('🚀 ~ handleSubmit ~ resp:', resp);
        enqueueSnackbar(resp.error, { variant: 'error' });
      }
    };

    xhr.onerror = () => {
      console.error('Invalid Credentials');
    };

    xhr.send(JSON.stringify(product));
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Update Product
      </Typography>
      <Card sx={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ marginBottom: '20px' }}>
            <TextField
              name="name"
              label="Name"
              value={product.name}
              required
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              value={product.description}
              multiline
              rows={4}
              placeholder="Description"
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <Grid container>
              <Grid item sx={{ marginRight: '30px' }}>
                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  required
                  value={product.price}
                  type="number"
                  placeholder="Price"
                  onChange={(e) => handleChange('price', e.target.value)}
                />
              </Grid>
              <Grid item sx={{ marginRight: '30px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="standard"
                    value={product.category}
                    label="Age"
                    sx={{ width: '200px' }}
                    onChange={(e) => handleChange('category', e.target.value)}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Office">Office</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={product?.isFeatured}
                      onChange={() => handleChange('isFeatured', !product.isFeatured)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Featured"
                />
              </Grid>
            </Grid>
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
