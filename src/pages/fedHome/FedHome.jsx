import "./fedHome.scss"
import FedSidebar from "../../components/fedSidebar/FedSidebar"
import Navbar from "../../components/navbar/Navbar"


const FedHome = () => {
  return (
    <div className="fedHome">
        <FedSidebar/>
        
        <div className="fedHomeContainer">
            <Navbar/>
            <div className="inside">
                <h1>Fed</h1>
            </div>
        
        </div>
    </div>
  )
}

export default FedHome