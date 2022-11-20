import "./broadcasting_rights_distribution.scss"
import Navbar from "../../components/navbar/Navbar"
import PercDatatable from "../../components/percDatatable/PercDatatable"
import { useState } from "react"
import { updateDoc, doc } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Broadcasting_rights_distribution = () => {
    const [distributed, setDistributed] = useState(false);
    const [fedPerc, setFedPerc] = useState(0);
    const [topPerc, setTopPerc] = useState(0);
    const [clubsPerc, setClubsPerc] = useState(0);
    const [updated, setUpdated] = useState(false);
    const [udateError, setUpdateError] = useState(false);
    

      
    
    const setPercentages = async (e) => {
        e.preventDefault();
        
        await updateDoc(doc(db, "/ClubPositions/Federation"), "Federation percentage", fedPerc
        ).catch((error) => {
            console.log("Error: " + error);
            setUpdated(false);
            setDistributed(false);
            setUpdateError(true);
        });
        

        let querySnapshotEq = await getDocs(query(collection(db, "/ClubPositions"), where("Position", "!=", 0))).catch((error => {console.log("erorr in get pos != 0: "+error)}));
        querySnapshotEq.forEach(async (docu) => {
            await updateDoc(doc(db, "/ClubPositions", ""+docu.id), "Equal percentage", (clubsPerc/querySnapshotEq.size)).catch((error => {console.log("erorr in equal update: "+error)}))
          });
        for (let i = 1; i < 7; i++) {
            let querySnapshotTop = await getDocs(query(collection(db, "/ClubPositions"), where("Position", "==", i))).catch((error => {console.log("error in get pos == i: "+error)}));
            querySnapshotTop.forEach(async (docu) => {
                // 21 parts: 1st place 6, 2nd place 5, 3rd place 4, 4th place 3, 5th place 2, 6th place 1
                await updateDoc(doc(db, "/ClubPositions", ""+docu.id), "Top percentage", (topPerc/21 * (6-i+1) )
                ).catch((error) => {
                    console.log("Error: " + error);
                    setUpdated(false);
                    setDistributed(false);
                    setUpdateError(true);
                });
            })
        }
        let querySnapshotBot = await getDocs(query(collection(db, "/ClubPositions"), where("Position", ">", 6))).catch((error => {console.log("error in get pos > 6"+error)}));
        querySnapshotBot.forEach(async (docu) => {
            await updateDoc(doc(db, "/ClubPositions", ""+docu.id), "Top percentage", 0
            ).catch((error) => {
                console.log("Error: " + error);
                setUpdated(false);
                setDistributed(false);
                setUpdateError(true);
            });
        })

        //********************************************************* 

        

        //**********************************************************/
    
    if (!udateError) {
        setUpdated(true);
        setDistributed(true)
        setTimeout(() => {
            setUpdated(false);
        }, 3000);
    }

    }


  return (
    <div className="broadcasting_rights_distribution">
      <Navbar/>
      <div className="broadcasting_rights_distributionContainer">
        
        <form onSubmit={setPercentages}>
            <h3>Fill in the percentages</h3>
            <input
              type="number"
              placeholder="Percentage to go to the federation"
              required
              onChange={(e) => setFedPerc(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Percentage to go equally to all clubs"
              required
              onChange={(e) => setClubsPerc(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Percentage to be distributed unequally among top 6 clubs"
              required
              onChange={(e) => setTopPerc(parseInt(e.target.value))}
            />
            {(((fedPerc + clubsPerc + topPerc) !== 100) || fedPerc <= 0 || clubsPerc <= 0 || topPerc <= 0) &&
            <span className="warning">Please make sure the inputs are positive and add up to 100%!</span>
            }
            <button
            disabled={((fedPerc + clubsPerc + topPerc) !== 100) || fedPerc <= 0 || clubsPerc <= 0 || topPerc <= 0} 
            type="submit">
                Set Percentages
            </button>
            <span className={(((fedPerc + clubsPerc + topPerc) !== 100) || fedPerc <= 0 || clubsPerc <= 0 || topPerc <= 0)?"warning":"valid"}>
                {fedPerc + clubsPerc + topPerc + "%"}
            </span>
            {updated && <span className="valid">
                Percentages set successfully
            </span>}
        </form>
        
        {distributed && <div className="distributed_table">
            
            <h1>Percentages Distribution</h1>
            <PercDatatable/>
            
        </div>}
      </div>
    </div>
  )
}

export default Broadcasting_rights_distribution