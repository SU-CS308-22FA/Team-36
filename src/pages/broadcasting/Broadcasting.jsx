import Databroadcasting from "../../components/DataBroadcasting/Databroadcasting"
import Navbar from "../../components/navbar/Navbar"
import "./Broadcasting.scss"


const Broadcasting = () => {
    return (
      <div className="broadcasting">
        <div className="broadcastingContainer">
            <Navbar/>
            <Databroadcasting />
        </div>
      </div>
    )
  }
  export default Broadcasting;