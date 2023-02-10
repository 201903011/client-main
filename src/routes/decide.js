import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// config
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_ADMIN } from '../config';

export default function CustomNavigate() {
  const { user } = useAuth();

  if (user.islibrarian === true) {
    return <Navigate to={PATH_AFTER_LOGIN_ADMIN} replace />;
  }
  return <Navigate to={PATH_AFTER_LOGIN} replace />;
}
