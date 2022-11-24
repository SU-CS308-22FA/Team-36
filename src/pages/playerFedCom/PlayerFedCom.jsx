import "./PlayerFedCom.scss"
import Navbar from "../../components/navbar/Navbar"
import { db } from "../../firebase"
import { useEffect } from "react"
import { useState } from "react"
import { collection, getDocs } from "firebase/firestore"

const PlayerFedCom = () => {

    const [users, setUsers] = useState([]);
    const callUps = collection(db, "National Team Callups")

    useEffect(() => {
    
        const getCallUp = async () => {

            const data = await getDocs(callUps);
            setUsers(data.docs.map((doc) => ({...doc.data()})));
            
        };

        getCallUp();
    }, ); 

    return (
      <div className="PlayerFedCom">
            <Navbar/>
            <h2>National Callup</h2>
            <br />
            <body>
                <div>
                    {users.map ((user) => {
                         return (
                         <div> 
                            <div> 
                                <h3>Name: {user.PlayerName}</h3> 
                            </div>
                            <br /> 
                            <div> 
                                <h3>Subject: </h3> 
                                <h4>{user.Offer}</h4>
                            </div>
                            <br />
                            <div> 
                                <h3>Accecpt or Reject:</h3>
                                <select id="userResponse">
                                    <option value="Accecpt">Accecpt</option>
                                    <option value="Reject">Reject</option>
                                </select>
                                <button class="selectOption">Select Option</button>
                            </div>
                         </div>
                         )
                    })}
                </div>
            </body>
      </div>
      
    )
  }
  
  export default PlayerFedCom