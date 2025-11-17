import React from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({ children }) => {
    const {user} = React.useContext(AuthContext);
  return user? children : <Navigate to="/login" /> ;
}
