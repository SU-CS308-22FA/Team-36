import "./sidebar.scss";
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
import { Public } from "@mui/icons-material";


const FedSidebar = () => {
  
  return (
    <div className="sidebar">
      <div className="top">
        
          <span className="logo">F.F.P</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">SERVICES</p>
          <Link to="/fedhome" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Home</span>
          </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/deadlinesfed" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Set Deadline</span>
            </li>
          </Link>
          <Link to="/broadcasting-distribution" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Broadcasting Rights</span>
            </li>
          </Link>
          <Link to="/sendreq" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Send Request to Clubs</span>
            </li>
          </Link>
          <Link to="/fedhome" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Clubs' Documents</span>
            </li>
          </Link>
          <Link to="/stadiumfed" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stadium Reservations View</span>
            </li>
          </Link>
          <Link to="/national" style={{ textDecoration: "none" }}>
            <li>
              <Public className="icon" />
              <span>National</span>
            </li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
};

export default FedSidebar;
