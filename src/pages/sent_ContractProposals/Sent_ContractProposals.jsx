import SentContractProposalsDT from "../../components/sentContractProposals/SentContractProposals"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./Sent_ContractProposals.scss"


const SentContractProposalsNotif = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <TSNavbar/>
            <SentContractProposalsDT />
        </div>
      </div>
    )
  }
  export default SentContractProposalsNotif;