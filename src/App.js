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
import PlayerHome from "./pages/playerHome/PlayerHome";
import Upload_c from "./pages/club_upload/Upload_c";
import ClubStadiumApp from "./pages/clubStadiumApp/ClubStadiumApp";
import FedStadiumApp from "./pages/fedStadiumApp/FedStadiumApp";
import Players from "./pages/playersinfo/Players";
import National from "./pages/national/National";
import Select from "./pages/national_select/Select";
import SendTransferOffer from "./pages/sendTransferOffer/SendTransferOffer";
import TSContractProposal from "./pages/TS_contractProposal/TS_ContractProposal";
import SentContractProposalsNotif from "./pages/sent_ContractProposals/Sent_ContractProposals";
import ReceivedContractProposalsNotif from "./pages/receivedContractProposal/received_ContractProposal";
import TransferSystem from "./pages/transfersystem/TransferSystem";
import GalatasarayPlayers from "./pages/gsplayers/GSPlayers";
import FenerbahcePlayers from "./pages/fbplayers/FBPlayers";
import SentOffersNotif from "./pages/sentoffersNoti/SentOffers_noti";
import ReceivedOffersNotif from "./pages/receivedoffersNoti/receivedoffers_Noti";
import FedSpendingLimit from "./pages/fedSpendingLimit/FedSpendingLimit";
import ClubSpendingLimit from "./pages/clubSpendingLimit/ClubSpendingLimit";
import Club_req from "./pages/club_req/club_req";
import FedNotifications from "./pages/fedNotifications/fedNotifications";
import FedTransferSystem from "./pages/fedTransfersSystem/fedTransferSystem";
import ClubFinancesPage from "./pages/clubFinances/clubFinances";
import FinanceDataUpload from "./pages/financeDataForm/FinanceDataForm";
import FedFFPCheck from "./pages/fedffpcheck/FedFfpCheck";
import Profit5years from "./pages/5yeardata/profit5years";


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
            <Route path="newproposal" element={<NewProposal/>} />
            <Route path="playertoclub" element={<PlayerToClub/>} />
            <Route path="Renewing" element={<Renewing/>} />
            <Route path="RequestLeaving" element={<RequestLeaving/>} />
            <Route path="sendreq" element={<SendReq/>} />
            <Route path="notifications" element={<RequireAuth><Notifications/></RequireAuth>}/>
            <Route path="fedhome" element={<RequireAuth><FedHome /></RequireAuth>} />
            <Route path="clubhome" element={<RequireAuth><ClubHome /></RequireAuth>} />
            <Route path="playerhome" element={<RequireAuth><PlayerHome /></RequireAuth>} />
            <Route path="sendoffer" element={<SendTransferOffer/>} />
            <Route path="contractproposal" element={<TSContractProposal/>} />
            <Route path="sentcontractproposals" element={<SentContractProposalsNotif/>} />
            <Route path="receivedcontractproposals" element={<ReceivedContractProposalsNotif/>} />
            <Route path="transfersystem" element={<TransferSystem/>} />
            <Route path="galatasarayplayers" element={<GalatasarayPlayers/>} />
            <Route path="fenerbahceplayers" element={<FenerbahcePlayers/>} />
            <Route path="sentoffersnotifications" element={<SentOffersNotif/>} />
            <Route path="receivedoffersnotifications" element={<ReceivedOffersNotif/>} />
            <Route path="players/:club" element={<RequireAuth><Players /></RequireAuth>} />
            <Route path="national/:club" element={<RequireAuth><Select /></RequireAuth>} />
            {/* <Route path="players/:club" element={<RequireAuth><Players /></RequireAuth>} /> */}
            <Route path="national" element={<RequireAuth><National/></RequireAuth>} />
            <Route path="club_req" element={<Club_req/>} />
            <Route path="fedNotifications" element={<RequireAuth><FedNotifications/></RequireAuth>}/>
            <Route path="fedtransfersystem" element={<FedTransferSystem/>}/>
            <Route path="clubfinancespage" element={<ClubFinancesPage/>} />
            <Route path="financedataupload" element={<FinanceDataUpload/>} />
            <Route path="clubffpstatus" element={<FedFFPCheck/>} />
            <Route path="profit5yearsform" element={<Profit5years/>}/>
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
            <Route path="stadiumclub" element={<RequireAuth> <ClubStadiumApp /> </RequireAuth>} />
            <Route path="stadiumfed" element={<RequireAuth><FedStadiumApp /></RequireAuth>} />
            <Route path="spendinglimitfed" element={<FedSpendingLimit />} />
            <Route path="spendinglimitclub" element={<ClubSpendingLimit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
