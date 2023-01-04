import FFPTable from "../../components/ffpTable/FFPTable"
import Navbar from "../../components/navbar/Navbar"
import "./FedFfpCheck.scss"


const FedFFPCheck = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <Navbar/>
            <FFPTable />
        </div>
      </div>
    )
  }
  export default FedFFPCheck;