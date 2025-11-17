import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { Profile } from './components/Profile.jsx'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register'
import './App.css'
import { ProtectedRoute } from './utils/ProtectedRoute.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const App = () => {
  const {user, loading} = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }


  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={user? <Navigate to='/dashboard'/>: <Navigate to='/login'/>} />
      <Route path='/login' element={user? <Navigate to='/dashboard'/>: <Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
}

export default App
