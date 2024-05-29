/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'universal-cookie';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const cookies = new Cookies();

export default function AppView() {
  const token = cookies.get('TOKEN');
  console.log('🚀 ~ AppView ~ token:', token);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
    </Container>
  );
}
