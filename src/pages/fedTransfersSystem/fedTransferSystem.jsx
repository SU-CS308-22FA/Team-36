import FedTransfersDT from "../../components/fedTransfersDT/fedTransfersDT"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./fedTransferSystem.scss"


const FedTransferSystem = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <TSNavbar/>
            <FedTransfersDT />
        </div>
      </div>
    )
  }
  export default FedTransferSystem;