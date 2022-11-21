import "./playerHome.scss"
import Navbar from "../../components/navbar/Navbar"
import PlayerSidebar from "../../components/playerSidebar/PlayerSidebar"


const PlayerHome = () => {
  return (
    <div className="playerHome">
        <PlayerSidebar/>
        <div className="playerHomeContainer">
        <Navbar/>
        <div className="inside">
            <h1>Player</h1>
        </div>
        
        
        </div>
    </div>
  )
}

export default PlayerHome