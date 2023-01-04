import FedNotificationTable from "../../components/fedNotificationTable/fedNotificationTable"
import Navbar from "../../components/navbar/Navbar"
import "./fedNotifications.scss"


const FedNotifications = () => {
    return (
      <div className="FedNotifications">
        <div className="notificationsContainer">
            <Navbar/>
            <FedNotificationTable />
        </div>
      </div>
    )
  }
  export default FedNotifications;