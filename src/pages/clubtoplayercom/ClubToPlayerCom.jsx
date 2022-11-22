import React, {useState} from 'react';
import { db} from "../../firebase";
//import {CardPlayer} from "../../components/cardplayers"
//import { getDatabase } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
//import { getDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './ClubToPlayerCom.scss';
import CardPlayers from '../../components/cardplayers/CardPlayers';
import { getDatabase, ref, child, get } from "firebase/database";
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DataPlayers from "../../components/dataplayers/DataPlayers"
const  ClubToPlayerCom = () => {
    const navigate = useNavigate()

    //var Name;
     //const dbRef = ref(getDatabase());
    /*get(child(db, `Players/${Name}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
*/


    const handleAdd = () => {
        navigate("../addplayers")
      }
      const handleNewProposal = () => {
        navigate("../newproposal")
      }
  return (
    <div className="clubtoplayercom">
        <Navbar />
    <header className="clubtoplayercom-header">
    <form onAdd={handleAdd}>
        <button type="Add" onClick={handleAdd}>AddPlayer</button>
        <form onAdd={handleNewProposal}></form>
        <button type="New contract proposal" onClick={handleNewProposal}>New contract proposal</button>
        </form>
        
    </header>
    </div>
  );


}


export default ClubToPlayerCom;