import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Edit from "./pages/edit/Edit"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/signup/Signup";
import Notifications from "./pages/notifications/notifications";
import ClubToPlayerCom from "./pages/clubtoplayercom/ClubToPlayerCom";
import AddPlayers from "./pages/addplayers/AddPlayers";
import NewProposal from "./pages/newproposal/NewProposal";
import PlayerToClub from "./pages/playertoclubcom/PlayerToClubCom";
import Renewing from "./pages/renewing/Renewing";
import RequestLeaving from "./pages/requestLeaving/RequestLeaving";
import SendReq from "./pages/sendreq/SendReq";
import Deadline_setting from "./pages/deadline_setting/Deadline_setting";
import Broadcasting_rights_distribution from "./pages/broadcasting_rights_distribution/Broadcasting_rights_distribution";
import FedHome from "./pages/fedHome/FedHome";
import ClubHome from "./pages/clubHome/ClubHome";
import Broadcasting from "./pages/broadcasting/Broadcasting";
import PlayerHome from "./pages/playerHome/PlayerHome";
import Upload_c from "./pages/club_upload/Upload_c";
import DownloadC from "./pages/download_c/Download_c";
import Download_d from "./pages/download_d/Download_d";

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
            <Route path="notifications" element={<Notifications/>}/>
            <Route path="clubtoplayercom" element={<ClubToPlayerCom/>} />
            <Route path="addplayers" element={<AddPlayers/>} />
            <Route path="broadcasting" element={<Broadcasting/>} />
            <Route path="newproposal" element={<NewProposal/>} />
            <Route path="playertoclub" element={<PlayerToClub/>} />
            <Route path="Renewing" element={<Renewing/>} />
            <Route path="RequestLeaving" element={<RequestLeaving/>} />
            <Route path="download_c" element={<DownloadC />} />
            <Route path="sendreq" element={<SendReq/>} />
            <Route path="download_d" element={<Download_d/>} />
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
