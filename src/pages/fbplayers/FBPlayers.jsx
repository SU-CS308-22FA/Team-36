import FBTable from "../../components/FBTable/FBTable"
import TSNavbar from "../../components/TSnavbar/TSNavbar"
import "./FBPlayers.scss"


const FenerbahcePlayers = () => {
    return (
      <div className="transfers">
        <div className="transfersContainer">
            <TSNavbar/>
            <FBTable />
        </div>
      </div>
    )
  }
  export default FenerbahcePlayers;