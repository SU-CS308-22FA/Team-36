import Navbar from "../../components/navbar/Navbar"
import { db} from "../../firebase";
import './PlayerToClubCom.scss';
import { useNavigate } from "react-router-dom";

const  PlayerToClubCom = () => {

    const navigate = useNavigate()

    const sendToRequestLeaving = () => {
        navigate("../RequestLeaving")
      }
      const sendToRewening = () => {
        navigate("../Renewing")
      }

    return (
        
    <div className="playertoclub">
        
         
    <div className="title">Choose between:
 
          <button type="requestLeaving" onClick={sendToRequestLeaving}>Request leaving </button>
    
          <button type="renewing" onClick={sendToRewening}>Renewing</button>
 
    </div>
    </div>

    );
}

export default PlayerToClubCom;