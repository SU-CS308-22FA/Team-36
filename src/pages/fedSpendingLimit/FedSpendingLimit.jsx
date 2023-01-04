import "./fedSpendingLimit.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react"
import dayjs from "dayjs";
import { collection, getDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db, } from "../../firebase";
import { get } from "firebase/database";
import { useEffect } from "react";


const FedSpendingLimit = () => {
  
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
  const [flicker, setFlicker] = useState(true);
  useEffect(()=>{
    if(begining)
    {
        const setInfo = async () => {
            setData([]);
            
            let allSeasons = [];
            let allObjections = [];
            let querySS = await getDocs(query(collection(db,"SpendingLimits")));
            for (let i = 2; i >= 0; i--) {
                let seasonInfoList = [];
                let spendingLims = [];
                let thisMessages = [];
                let thisObjections = [];
                
                let j = 0
                querySS.forEach(async (docu)=>{
                    
                    let innerdocu = await getDoc(doc(db,"SpendingLimits/" + docu.id + "/" + "SpendingLimits/"+ (currentSeason-i).toString())); 
                    //console.log("got Spending limit of " + docu.id);
                    console.log(innerdocu.id);
                    seasonInfoList.push({season: i, club: docu.data().Name, expenses: innerdocu.data().Expenses, income: innerdocu.data().Income, spendingID: j, spendingLimit: innerdocu.data().SpendingLimit , message: innerdocu.data().Message, objection: innerdocu.data().Objection});
                    thisObjections.push({objection: innerdocu.data().Objection, spendingID: j});
                    
                    //console.log(seasonInfoList);
                    if (i == 0){
                        setSpendingLimitSet(innerdocu.data().LimitSet);
                        spendingLims.push({limit: innerdocu.data().SpendingLimit, spendingID: j, income: innerdocu.data().Income});
                        thisMessages.push(innerdocu.data().Message);
                        setMessages(thisMessages);
                        console.log(messages);
                        
                        setSpendingLimits(spendingLims);
                        console.log(spendingLims);
                        console.log(seasonInfoList);
                    }
                    
                    j++;
                });
                allObjections.push(thisObjections)
                allSeasons.push(seasonInfoList);
            }
            setObjections(allObjections);
            
            setData(allSeasons);
            console.log(data);
            }
        
        setInfo();
        console.log(data);
        setBegining(false);
        
    }


  },[]);
  
  const handleSeasonSelect =  (season) => {
    
    setSelectedSeason(season);
    //console.log("got outer spending limit");
  }
  
  const handleMessage = async (row) => {
    let docu = await getDoc(doc(db, "SpendingLimits/" + row.club + "/" + "SpendingLimits/"+ (currentSeason - row.season).toString()));
    await updateDoc(docu.ref, {"Message": true}).then(()=>{window.location.reload();});
    
    alert("Message Sent");

  }
  
  const handleSpendingLimitSet = async () => {
    let querySS = await getDocs(query(collection(db,"SpendingLimits")));
    querySS.forEach(async (docu)=>{
                
        let innerdocu = await getDoc(doc(db,"SpendingLimits/" + docu.id + "/" + "SpendingLimits/"+ (currentSeason).toString())); 
        //console.log("got Spending limit of " + docu.id);
        console.log(innerdocu.id);
        await updateDoc(innerdocu.ref, {"LimitSet": true, "SpendingLimit": spendingLimitP / 100 * innerdocu.data().Income});
        let spendingLims = spendingLimits;
        
            for (let i = 0; i < spendingLims.length; i++) {
                spendingLims[i].limit = spendingLimitP/100 * spendingLims[i].income;
                
            }
            
        
        setSpendingLimitSet(true);
        //console.log(seasonInfoList);
        
    
    });
  }

  const handleSpendingLimitUnset = async () => {
    setSpendingLimitSet(false);
    

    let querySS = await getDocs(query(collection(db,"SpendingLimits")));
    querySS.forEach(async (docu)=>{
                
        let innerdocu = await getDoc(doc(db,"SpendingLimits/" + docu.id + "/" + "SpendingLimits/"+ (currentSeason).toString())); 
        //console.log("got Spending limit of " + docu.id);
        console.log(innerdocu.id);
        await updateDoc(innerdocu.ref, {"LimitSet": false, "Message": false, "Objection":false});
        for (let j = 0; j < messages.length; j++) {
            messages[j] = false;
        }
        objections[2].forEach((club)=>{
            club.objection = false;
        });
        //console.log(seasonInfoList);
        const donothing = async () => {}

        await donothing().then(()=>{window.location.reload();});
    
    });
    
  }

    return (
    <div className="fedSpendingLimit">
      <div className="fedSpendingLimitContainer">
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
            {selectedSeason == currentSeason &&
            <div className="setPercentage">
                <label>Enter percentage between 70 and 90 for spending limit</label>
                <label>spending limit = percentage*income</label>
                <input type="number" onChange={(e)=> {setSpendingLimitP(e.target.value)}}/>
                <button disabled={spendingLimitSet || spendingLimitP < 70 || spendingLimitP > 90} onClick={()=>{handleSpendingLimitSet()}}>Set Percentage</button>
                <button disabled={!spendingLimitSet} onClick={async ()=>{handleSpendingLimitUnset()}}>Unset Percentage</button>
            </div>}
            <div>
                {data.map((season)=>(
            <div>
                    {typeof(season[0])!= "undefined" && parseInt(selectedSeason) == currentSeason-season[0].season && 
                    <div className="oneSeason">
                        <table>
                        <thead>
                        <tr>
                            <th>Club</th>
                            <th>Income</th>
                            <th>Expenses</th>
                            {parseInt(selectedSeason) != currentSeason && <th>Spending Limit</th>}
                            {parseInt(selectedSeason) != currentSeason && <th>Message Sent</th>}
                            {parseInt(selectedSeason) == currentSeason && spendingLimitSet && <th>Spending Limit</th>}
                            {parseInt(selectedSeason) == currentSeason && <th>Send Message</th>}
                            <th>Objection</th>
                        </tr>
                        </thead>
                        <tbody>
                        {season.map((row)=>(
                            <tr>
                                <td>{row.club}</td>
                                <td>{row.income}</td>
                                <td>{row.expenses}</td>
                                { parseInt(selectedSeason) != currentSeason && <td>{row.spendingLimit}</td>}
                                { parseInt(selectedSeason) != currentSeason && row.message && <td>Yes</td>}
                                { parseInt(selectedSeason) != currentSeason && !row.message && <td>No</td>}
                                { parseInt(selectedSeason) == currentSeason && spendingLimitSet && <td>{spendingLimits[row.spendingID].limit}</td>}
                                {console.log(messages)}
                                {console.log(objections)}
                                { parseInt(selectedSeason) == currentSeason && <td><button disabled={messages[row.spendingID]|| !spendingLimitSet || (row.expenses < spendingLimits[row.spendingID].limit)} onClick={()=>{messages[row.spendingID] = true; handleMessage(row)}}>Send Warning</button></td>}
                                {objections[2-season[0].season][row.spendingID].objection == true && <td>Club has objected</td>}
                                {objections[2-season[0].season][row.spendingID].objection == false && <td>No Objection</td>}
                            </tr>
                        ))}
                        </tbody>

                        </table>
                        
                        
                    </div>}
            </div>
                ))}
            </div>
            {/* {ready && <div className="viewingLimits">
            {[(currentSeason).toString(),(currentSeason-1).toString(),(currentSeason-2).toString()].map((season)=>(
                <div className="seasons">
                    {selectedSeason == currentSeason &&
                    <div className="setPercentage">

                    </div>}
                    
                    {selectedSeason == season &&
                    <div className={season}>
                        {console.log(season + " HEY0")}
                        <label>{season}</label>
                        
                        {data.map((row)=>(
                            <div className="oneClub">
                                <label>Hey</label>
                                {console.log(season + " HEY")}
                                <label>{row.club}</label>
                                <label>{row.expenses}</label>
                            </div>
                        ))}
                    </div>}
                </div>
            ))}


            </div>} */}
        </div>
      </div>
    </div>
  )
}

export default FedSpendingLimit