import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";


function App() {
  

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className= "app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
