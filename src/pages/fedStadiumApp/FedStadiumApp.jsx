import "./fedStadiumApp.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react";
import { useEffect } from "react";
//import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, query, updateDoc, onSnapshot, where, getDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import dayjs from "dayjs";
import { TextArea } from '@react-ui-org/react-ui';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FedStadiumApp = () => {
  const [data, setData] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [stadiums, SetStadiums] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState("Stadium1");
  //const [resDate, setResDate] = useState(dayjs("2023-01-01"))
  let ignore = false;
  let userName = "";
  //const [timeError, setTimeError] = useState(false);
  //const [errMessage, setErrMessage] = useState("");
  //const [docSnap, setdocSnap] = useState();
  const [disapproveMsg, setDisapproveMsg] = useState("");
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [noRes, setNoRes] = useState(false);
  const [selectedReserv, setSelectedReserv] = useState({});

  useEffect(() => {
      
      const begining = async () => {
      if(!ignore){
          let namelist = [];
          let querySnapshot = await getDocs(query(collection(db, "Stadiums")));
          querySnapshot.forEach(async (docu) => {
              
              let name = docu.get("Name");
              namelist.push({value: name, label: name})

              let oldreservs = docu.get("Reservations").split(";");
              let newreservs ="";
              console.log("got resvs");
              oldreservs.forEach((res) => {
                  let date = dayjs(res.split(",")[0].slice(1));
                  if(date.diff() > dayjs().diff()){
                      newreservs += res +";"
                  }
              });
              newreservs = newreservs.slice(0,newreservs.length-1);
              if(newreservs.split(";").length >= 2){
                  await updateDoc(docu.ref, {"Reservations": newreservs, "Available_in_2Weeks": false});
              }else{
                  await updateDoc(docu.ref, {"Reservations": newreservs, "Available_in_2Weeks": true});
              }    
              
          });
          SetStadiums(namelist);
          console.log(stadiums);
          ignore = true;
      }
  };
      begining();
      console.log("useEffect");
      
      
      
      
      



  },[]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      setData([]);
      let resrvRaw = [];
      let resrvDateClub = [];
      try {
        const querySnapshot = await getDocs(query(collection(db, "Stadiums"), where("Name", "==", selectedStadium)));
        querySnapshot.forEach((doc) => {
          console.log("Exists3");
          resrvRaw = doc.data().Reservations.split(";");
          console.log("Exists4");
        });
        resrvRaw.forEach((raw) => {
          if(raw.charAt(0) == 'U'){
            console.log("Exists");
            resrvDateClub.push({date: dayjs(raw.split(",")[0].slice(1)).subtract(3,"hour").format("YYYY-MM-DD HH:00"), club: raw.split(",")[1]});
          }
          console.log("Exists5");
        });
        
        setData(resrvDateClub);
        setNoRes(true);
      } catch(err){
        console.log(err);
      }

      
    }; 
    console.log("Exists1");
    fetchData();
    console.log("Exists2");
    
    

  }

  const handleSelect = (e) => {
        
    setSelectedStadium(e.target.value);        
}

const sendMessage = async (Status, Message, club) => {

  
  console.log("1sendMessage");
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("2sendMessage");

          const fetchData = async () => {
        console.log("4sendMessage");
            
          const docRef = doc(db, "users", user.uid);
          console.log("5sendMessage");
          let docSnap = await getDoc(docRef).catch((err)=>{console.error(err);});
          console.log("6sendMessage");
          let q = await getDocs(query(collection(db, "users"), where("name", "==", docSnap.data().name)));
          console.log("7sendMessage");
          let name = "";

          q.forEach((docu) => {
              console.log(docu.get("name"));
              name += docu.get("name");
              console.log(name);
              userName = (name);
              console.log(userName);
          });
          //setUserName(name);
          console.log(userName);
          await addDoc(collection(db, "requests"), {
            "type": Status,
            "Title": "Stadium Reservation Response",
            "SendFrom": userName,
            "SendTo": club,
            "content": Message
          });
          }; 
  console.log("3sendMessage");

          await fetchData().then(()=> {
            console.log("EsendMessage");
            window.location.reload();
          });
  

  }});
  

}

const updateApproval = async (Status, resrvs) => {

  let querySnapshot = await getDocs(query(collection(db, "Stadiums"), where("Name", "==", selectedStadium)));
  querySnapshot.forEach(async (docu) => {
      let oldreservs = docu.get("Reservations").split(";");
      let newreservs ="";
      console.log("got resvs");
      oldreservs.forEach((res) => {
          let date = dayjs(res.split(",")[0].slice(1)).subtract(3,"hour").format("YYYY-MM-DD HH:00");
          let name = res.split(",")[1];
          console.log(resrvs.date + "{}" + date + "{}" + resrvs.club + "{}" + name);
          console.log(resrvs.date == date && resrvs.club == name);
          if(resrvs.date == date && resrvs.club == name){
              
              newreservs += Status + res.slice(1) +";"
          }else{
            newreservs += res +";"
          }
      });
      newreservs = newreservs.slice(0,newreservs.length-1);
      console.log("After Update approval of: " + Status + " " + newreservs);
      await updateDoc(docu.ref, {"Reservations": newreservs}); 
  });

}

const handleApprove = async (resrv) => {

  await updateApproval("A", resrv
  ).then(async ()=> {
    await sendMessage("Approval","Your Stadium Reservation Has Been Approved",resrv.club);
    
  });
  
               
}
const handleDisapprove = async (resrv) => {
  
  await updateApproval("D", resrv
  ).then(async()=> {
    await sendMessage("Disapproval",disapproveMsg,resrv.club);
  });
  


}


  return (
    <div className="fedStadiumApp">
      
      <div className="fedStadiumAppContainer">
        <Navbar/>
        
        <form onSubmit={(e) => {handleSubmit(e)}}>
                <label>Choose a Stadium to View:</label>
                <select
                value={selectedStadium} 
                required 
                onChange={handleSelect}>
                    <option value= "" selected disabled hidde>--- Please Choose an Option ---</option>
                    {stadiums.map((stad) => (
                        <option value={stad.value}>{stad.label}</option>
                    ))}
                </select>
                <button type="Submit">View Reservations</button>
                {/* <span>{dayjs("A2002-02-02").format("YYYY-MM-DDTHH:mm:ssZ")}</span> */}
        </form>
        
        {data.length!=0 &&
        <div className="Reservations">
        {data.map((reserv) => (
          <div className="oneRes">
            <h3>{reserv.date} Reserved by {reserv.club}</h3>
            <button className="Approve" onClick={(e) => {setSelectedReserv(reserv); handleApprove(reserv);}}>Approve</button>
            <button className="Disapprove" onClick={()=> {setShowMsgBox(true); setSelectedReserv(reserv)}}>Disapprove</button><br/>
            
            {showMsgBox && (selectedReserv==reserv) &&
            <div className="MSGBox">
            <label>
              Disapprove Message:
            </label><br/>
            <TextArea type="text" placeholder="Please click here to begin typing..." 
            required cols={50} rows={6} value={disapproveMsg} onChange={(e) => {setDisapproveMsg(e.target.value)}} />
            <button className="DisapproveSend" onClick={(e)=>{handleDisapprove(reserv)}}>Send</button>
            </div>}

          </div>
        ))}  
        </div>
        }
        {data.length==0 && noRes && <span>There Are No Reservations To Approve or Disapprove</span>}

      </div>
    </div>
  )
}

export default FedStadiumApp