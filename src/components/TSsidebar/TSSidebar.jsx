import "./TSSidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";


const TSSidebar = () => {
  
  return (
    <div className="TSsidebar">
      <div className="top">
        
          <span className="logo">F.F.P</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">SERVICES</p>
          <Link to="/sentoffersnotifications" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Sent Offers</span>
          </li>
          </Link>  
          <Link to="/receivedoffersnotifications" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Received Offers</span>
          </li>
          </Link>  
          <Link to="/sentcontractproposals" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Contract Proposals Sent</span>
            </li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
};

export default TSSidebar;