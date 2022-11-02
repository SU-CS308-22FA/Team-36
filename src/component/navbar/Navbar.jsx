import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import { LogoutOutlined } from "@mui/icons-material";

const Navbar = () => {

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: null })
    navigate("/")
  };

  const edit = () => {
    navigate("/edit")
  }
  const home = () => {
    navigate("/users")
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search" onClick={home}>
          Federation Financial Portal
        </div>
        <div className="items">
          <div className="item" onClick={edit}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="item" onClick={handleLogout}>
            <LogoutOutlined className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
