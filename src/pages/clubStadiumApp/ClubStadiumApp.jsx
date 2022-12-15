import "./clubStadiumApp.scss"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react"
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
    arrayRemove,
    getDoc,
    FieldValue,
    doc,
    updateDoc
  } from "firebase/firestore";
  import { db } from "../../firebase";
import { Select } from "@mui/material";
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { async } from "@firebase/util";
import { Navigate } from "react-router-dom";

const ClubStadiumApp = () => {

    const [stadiums, SetStadiums] = useState([]);
    const [selectedStadium, setSelectedStadium] = useState("Stadium1");
    const [resDate, setResDate] = useState(dayjs("2023-01-01"))
    let ignore = false;
    let userName = "";
    const [timeError, setTimeError] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    //const [docSnap, setdocSnap] = useState();
    useEffect(() => {
        
        const begining = async () => {
        if(!ignore){
            let querySnapshot = await getDocs(query(collection(db, "Stadiums")));
            querySnapshot.forEach(async (docu) => {
                

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
            let namelist = [];
            querySnapshot = await getDocs(query(collection(db, "Stadiums"), where("Available_in_2Weeks", "==", true)));
            querySnapshot.forEach(async (docu) => {
                let name = docu.get("Name");
                namelist.push({value: name, label: name})
            });
            
            SetStadiums(namelist);
            console.log(stadiums);
            ignore = true;
        }
    };
        begining();
        console.log("useEffect");
        
        
        
        
        



    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(resDate > dayjs() && resDate < dayjs().add(14,"day"))
        {

        
        let canReserve = true;
        let docref = doc(db, "Stadiums", selectedStadium);
        let docsnap  = await getDoc(docref);
        try{
        let resrvs = docsnap.data().Reservations.split(";");
        resrvs.forEach(async (res) => {
            let date = dayjs(res.split(",")[0].slice(1));
            if(date.add(7,"day") >= resDate && resDate >= date.subtract(7,"day"))
            {
                console.log("HERE");
                canReserve = false;
            }
        });
    }catch{}
            if(canReserve){ 
                //userName = docSnap.data().name;
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
        
                        const fetchData = async () => {
                        const docRef = doc(db, "users", user.uid);
                        let docSnap = await getDoc(docRef);
                        let q = await getDocs(query(collection(db, "users"), where("name", "==", docSnap.data().name)));
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
                        try{
                            await updateDoc(docref, "Reservations",docsnap.data().Reservations + ";U" + resDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')+ ","+userName);
                        }catch{
                            await updateDoc(docref, "Reservations","U" + resDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')+ ","+userName);
                        }
                        }; 
                        await fetchData().then(()=> {window.location.reload();});
                }});               
                
            }
            else
            {
                // can't reserve
                setTimeError(true);
                setErrMessage("The time you picked is too close to another reservation please pick a different time");
                setTimeout(()=>{
                    setTimeError(false);
                    setErrMessage("");
                }, 3000);
            }
        
        
        }
        else 
        {
            // time picked was past or after 2 weeks;
            setTimeError(true);
            setErrMessage("Please pick a time between now and two weeks from now");
            setTimeout(()=>{
                setTimeError(false);
                setErrMessage("");
            }, 3000);
        }

        
    }

    const handleSelect = (e) => {
        
        setSelectedStadium(e.target.value);        
    }
    return(
        <div className="clubStadiumApp">
            
            <div className="clubStadiumAppContainer">
                <Navbar/>
                <div className="inside">
                {/* <span>{stadiums.length}</span> */}
                {stadiums.length!=0 &&
                <form onSubmit={handleSubmit}>
                <label>Choose from Available Stadiums:</label>
                <select
                value={selectedStadium} 
                required 
                onChange={handleSelect}>
                    <option value= "" selected disabled hidde>--- Please Choose an Option ---</option>
                    {stadiums.map((stad) => (
                        <option value={stad.value}>{stad.label}</option>
                    ))}
                </select>
                <div className="TimePicker">
                    <h2>Choose DateTime</h2>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        label="Pick a date and time for the reservation"
                        renderInput={(params) => <TextField {...params} />}
                        value={resDate}
                        onChange={(e) => {setResDate(e);}}
                        />
                    </LocalizationProvider>
                    
                </div>
                <button type="Submit">Submit</button>
                {timeError&& <span>{errMessage}</span> }
                

                </form>
                }
                {stadiums.length == 0 &&
                <span>The stadiums might all be busy currently</span>
                }
                </div>
            </div>
                        
            

        </div>
    )
}

export default ClubStadiumApp