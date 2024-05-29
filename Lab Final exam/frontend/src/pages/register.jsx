import { Helmet } from 'react-helmet-async';

import RegisterView from 'src/sections/register/register-view';

export default function Register() {
  return (
    <>
      <Helmet>
        <title> Sign up here </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
