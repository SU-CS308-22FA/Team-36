import GSTable from "../../components/GSTable/GSTable"
import TSNavbar from "../../components/TSnavbar/TSNavbar";
import "./GSPlayers.scss"


function GalatasarayPlayers () {
    return (
      <div className="transfers">
        <div className="transfersContainer">
            <TSNavbar/>
            <GSTable />
        </div>
      </div>
    )
  }
  export default GalatasarayPlayers;