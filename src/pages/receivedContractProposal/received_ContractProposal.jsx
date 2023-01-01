import ReceivedContractProposalsDT from "../../components/playerContractProposals/Player_ContractProposals"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./received_ContractProposal.scss"


const ReceivedContractProposalsNotif = () => {
    return (
      <div className="transfers_notif">
        <div className="transfers_notifContainer">
            <TSNavbar/>
            <ReceivedContractProposalsDT />
        </div>
      </div>
    )
  }
  export default ReceivedContractProposalsNotif;