import "./clubSpendingLimit.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react"
import dayjs from "dayjs";
import { collection, getDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db, } from "../../firebase";
import { get } from "firebase/database";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged  } from "firebase/auth";

const ClubSpendingLimit = () => {

    const [currentSeason, setCurrentSeason] = useState(parseInt(dayjs().format("YYYY")));
    const [selectedSeason, setSelectedSeason] = useState();
    const [ready, setReady] = useState(false);
    const [data, setData] = useState([]);
    const [begining, setBegining] = useState(true);
    const [spendingLimitSet, setSpendingLimitSet] = useState(false);
    const [spendingLimitP, setSpendingLimitP] = useState(0);
    const [messages, setMessages] = useState([]);
    const [objections, setObjections] = useState([]);
    const [spendingLimits, setSpendingLimits] = useState([]);
 
    useEffect(()=>{
        if(begining)
        {
            let userName = "";
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
                        }; 
                        await fetchData()
                        
                        const setInfo = async () => {
                            setData([]);
                            
                            let allSeasons = [];
                            let allObjections = [];
                            let querySS = await getDocs(query(collection(db,"SpendingLimits/"+userName+"/SpendingLimits")));
                            
                                let seasonInfoList = [];
                                let spendingLims = [];
                                let thisMessages = [];
                                let thisObjections = [];
                                
                                
                                querySS.forEach(async (docu)=>{
                                    
                                     
                                    //console.log("got Spending limit of " + docu.id);
                                    
                                    allSeasons.push({season: docu.id, club: userName, expenses: docu.data().Expenses, income: docu.data().Income, spendingLimit: docu.data().SpendingLimit , message: docu.data().Message, objection: docu.data().Objection});
                                    allObjections.push(docu.data().Objection);
                                    if(docu.id == currentSeason){
                                        setSpendingLimitSet(docu.data().LimitSet)
                                    }
                                    //console.log(seasonInfoList);
                                    
                                    
                                    
                                });
                                
                                
                            
                            setObjections(allObjections);
                            
                            setData(allSeasons);
                            console.log(data);
                            }
                        
                        setInfo();
                        console.log(data);
                        setBegining(false);

                }});
            
            
        }
    
    
      },[]);

      const handleSeasonSelect =  (season) => {
    
        setSelectedSeason(season);
        //console.log("got outer spending limit");
      }

      const handleObject = async (season) => {
        let docu = await getDoc(doc(db, "SpendingLimits/" + season.club + "/" + "SpendingLimits/"+ season.season.toString()));
        await updateDoc(docu.ref, {"Objection": true}).then(()=>{window.location.reload();});
        
        alert("Objection Sent");
    
      }

    return (
        <div className="clubSpendingLimit">
          <div className="clubSpendingLimitContainer">
            <Navbar/>
            <div className="inside">
                <div className="seasonSelect">
                    
                    <div>
                        <input type="radio" id={(currentSeason - 2).toString()} name="seasons" value={(currentSeason - 2).toString()}
                        onClick={(e)=>{handleSeasonSelect(e.target.value);}}
                        ></input>
                        <label>{(currentSeason - 2).toString()}</label>
                    </div>
                    <div>
                        <input type="radio" id={(currentSeason - 1).toString()} name="seasons" value={(currentSeason - 1).toString()}
                        onClick={(e)=>{handleSeasonSelect(e.target.value);}}
                        ></input>
                        <label>{(currentSeason - 1).toString()}</label>
                    </div>
                    <div>
                        <input type="radio" id={(currentSeason).toString()} name="seasons" value={(currentSeason).toString()}
                        onClick={(e)=>{handleSeasonSelect(e.target.value);}}
                        ></input>
                        <label>{(currentSeason).toString()}</label>
                    </div>
                    </div>
                    
                    {data.map((season)=>(
            <div>
                    {typeof(season.season)!= "undefined" && parseInt(selectedSeason) == season.season && 
                    <div className="oneSeason">
                        <table>
                        <thead>
                        <tr>
                            <th>Club</th>
                            <th>Income</th>
                            <th>Expenses</th>
                            <th>Spending Limit</th>
                            <th>Message</th>
                            {season.message && <th>Objection</th>}
                        </tr>
                        </thead>
                        <tbody>
                        
                            <tr>
                                <td>{season.club}</td>
                                <td>{season.income}</td>
                                <td>{season.expenses}</td>
                                { parseInt(selectedSeason) != currentSeason && <td>{season.spendingLimit}</td>}
                                { parseInt(selectedSeason) == currentSeason && spendingLimitSet && <td>{season.spendingLimit}</td>}
                                { parseInt(selectedSeason) == currentSeason && !spendingLimitSet && <td>Spending Limit has not been set yet</td>}
                                { season.message && <td>You have exceeded the spending limit</td>}
                                { !season.message && <td>No Message</td>}                                
                                
                                {season.message && season.objection == true && <td>You have objected</td>}
                                {season.message && season.objection == false && <td><button onClick={()=>{handleObject(season);}}>Object</button></td>}
                            </tr>
                        
                        </tbody>

                        </table>
                        
                        
                    </div>}
            </div>
                ))}
                </div>
            </div>
          </div>
        
                )
}
export default ClubSpendingLimit