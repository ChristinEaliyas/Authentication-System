/*import Register from './Register';
import Login from './Login';

function App() {
  return (
    <main className='App'>
      <Register/>
    </main>
  )
}

export default App*/

import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/user/register" element={<Register />}/>
          <Route path="/user/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
