/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

const cookies = new Cookies();

// receives component and any other props represented by ...rest
// eslint-disable-next-line react/prop-types
export default function ProtectedRoutes(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const token = cookies.get('TOKEN');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  //   if (token) {
  //     return <Navigate to="/" replace />;
  //   }
  return children;
}
