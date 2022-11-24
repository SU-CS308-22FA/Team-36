import Noti_Datatable from "../../components/NotificationDataTable/Noti_Datatable"
import Navbar from "../../components/navbar/Navbar"
import "./Notifications.scss"


const Notifications = () => {
    return (
      <div className="notifications">
        <div className="notificationsContainer">
            <Navbar/>
            <Noti_Datatable />
        </div>
      </div>
    )
  }
  export default Notifications;