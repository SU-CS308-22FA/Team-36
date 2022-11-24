import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Edit from "./pages/edit/Edit"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/signup/Signup";
import SendReq from "./pages/sendreq/SendReq";
import Notifications from "./pages/notifications/notifications";
import Deadline_setting from "./pages/deadline_setting/Deadline_setting";
import Broadcasting_rights_distribution from "./pages/broadcasting_rights_distribution/Broadcasting_rights_distribution";
import FedHome from "./pages/fedHome/FedHome";
import ClubHome from "./pages/clubHome/ClubHome";
import PlayerHome from "./pages/playerHome/PlayerHome";
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
            <Route path="deadlinesfed" element={<Deadline_setting />} />
            <Route path="broadcasting-distribution" element={<Broadcasting_rights_distribution />} />
            <Route path="edit" element={<RequireAuth><Edit /></RequireAuth>} />
            <Route path="sendreq" element={<SendReq/>} />
            <Route path="notifications" element={<RequireAuth><Notifications/></RequireAuth>}/>
            <Route path="fedhome" element={<RequireAuth><FedHome /></RequireAuth>} />
            <Route path="clubhome" element={<RequireAuth><ClubHome /></RequireAuth>} />
            <Route path="playerhome" element={<RequireAuth><PlayerHome /></RequireAuth>} />
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
