import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import {AuthProvider} from '../context/AuthContext'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    
      <div className="App">
        <div className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}>
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }/>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/update-profile" element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </AuthProvider>
            </Router>
          </div>
        </div>
      </div>
    
  );
}

export default App;
