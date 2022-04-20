import React from "react";
import Signup from "./authentication-module/components/Signup";
import Dashboard from "./authentication-module/components/Dashboard";
import Login from "./authentication-module/components/Login"
import PrivateRoute from "./authentication-module/components/PrivateRoute";
import ForgotPassword from "./authentication-module/components/ForgotPassword";
import UpdateProfile from "./authentication-module/components/UpdateProfile";
import {AuthProvider} from './authentication-module/context/AuthContext'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
