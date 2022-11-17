import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Edit from "./pages/edit/Edit"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/signup/Signup";
import Upload_c from "./pages/club_upload/Upload_c";

function App() {

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="edit" element={<RequireAuth><Edit /></RequireAuth>} />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="upload_c" element={<RequireAuth><Upload_c/></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
