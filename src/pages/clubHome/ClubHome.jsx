import "./clubHome.scss"
import Navbar from "../../components/navbar/Navbar"
import ClubSidebar from "../../components/clubSidebar/ClubSidebar"


const ClubHome = () => {
  return (
    <div className="clubHome">
        <ClubSidebar/>
        <div className="clubHomeContainer">
            <Navbar/>
            <div className="inside">
                <h1>Club</h1>        
            </div>
        
        
        </div>
    </div>
  )
}

export default ClubHome