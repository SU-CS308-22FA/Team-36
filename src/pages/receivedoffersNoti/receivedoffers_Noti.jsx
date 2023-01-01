import ReceivedOffers_DataTable from "../../components/receivedoffersDatatable/receivedoffers_DataTable"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./receivedoffers_Noti.scss"


const ReceivedOffersNotif = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <TSNavbar/>
            <ReceivedOffers_DataTable />
        </div>
      </div>
    )
  }
  export default ReceivedOffersNotif;