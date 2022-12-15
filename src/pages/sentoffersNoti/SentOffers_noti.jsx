import SentOffers_DataTable from "../../components/sentoffersDatatable/sentoffers_DataTable"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./SentOffers_noti.scss"


const SentOffersNotif = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <TSNavbar/>
            <SentOffers_DataTable />
        </div>
      </div>
    )
  }
  export default SentOffersNotif;