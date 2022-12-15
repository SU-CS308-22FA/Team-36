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
import { Accessibility, Public } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


const ClubSidebar = () => {
  const [club, setClub] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const fetchData = async () => {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef);
        setClub(docSnap.data().name)
     }
     fetchData()
    })
  }, [])

  return (
    <div className="sidebar">
      <div className="top">
        
          <span className="logo">F.F.P</span>
        
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">SERVICES</p>
          <Link to="/clubhome" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Home</span>
          </li>
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Alerts and Notifications</span>
            </li>
          </Link>
          <Link to="/upload_c" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Document Upload</span>
            </li>
          </Link>
          <Link to="/clubtoplayercom" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Send Player Contract Renewal</span>
            </li>
          </Link>
          <Link to="/stadiumclub" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stadium Reservation</span>
            </li>
          </Link>
          <Link to={"/players/" + club} style={{ textDecoration: "none" }}>
            <li>
              <Accessibility className="icon" />
              <span>Players</span>
            </li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
};

export default ClubSidebar;
