import "./PlayerFedCom.scss"
import Navbar from "../../components/navbar/Navbar"
import { db } from "../../firebase"
import { useState, useEffect } from "react"
import { collection, getDocs, setData, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

function PlayerFedCom()  {

    
    const auth = getAuth();
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState(false);
    const callUps = collection(db, "National Team Callups");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          let list = []
          try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data()})
            });
            setData(list);
            console.log(list)
          } catch(err){
            console.log(err);
          }
        }; 
    
        fetchData()
      }, []);

      //console.log(data);

    function handleSelect(data) {
        setSelected(data);
    };
    

    const getCallUp = async () => {

        const data = await getDocs(callUps);
        setUsers(data.docs.map((doc) => ({...doc.data()})));

        console.log("getCallUp");
        
    };

        

    getCallUp();

    

    const handleStatus = (e) =>{
        if(e.target.value == "Accecpt"){
            setSelected = true;
        }
        else if(e.target.value == "Reject"){
            setSelected = false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoc
    }

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
                            <form onSubmit={(e) => {handleSubmit(e)}}> 
                                <h3>Accecpt or Reject:</h3>
                                <select name="status" id="status_select" required onChange = {(e) => {handleStatus(e)}}>
                                    <option value="" selected disable hidde>----Please choose option----</option>
                                    <option value="Accecpt">Accecpt</option>
                                    <option value="Reject">Reject</option>
                                </select>
                                <button  class="selectOption">Select Option</button>
                            </form>
                            
                        </div>
                        )

                    })}
                    
                </div>
            </body>
    </div>
    
    )
                    
}
  
export default PlayerFedCom;