import React, {useState} from 'react';
import { db} from "../../firebase";
import { doc, deleteDoc, addDoc, collection, getDocs, Firestore } from "firebase/firestore";
//import {handleDelete} from "../../index";
import './Renewing.scss';
import Navbar from "../../components/navbar/Navbar";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider, deletePlayer } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext"
import {updateDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { async } from '@firebase/util';


const  Renewing = () => {

  const user = auth.currentUser;
    const [namePlayer , setName] = useState('');
    const [title, setData] = useState('');
    const [from , setSalary] = useState('');
    const Player = auth.currentPlayers;

    const handleName =(e)=>{
      setName(user.email);
    }
    const handleData =(e)=>{
      setData(e.target.value);
    }
    const handleSalary =(e)=>{
      setSalary(e.target.value);
    }
   
    const handleSubmit = async (e)=>{
      e.preventDefault();
      handleDelete(e.namePlayer);

      await addDoc(collection(db, "requestToRenewing"), {
        "Contract expiration proposal": title,
        "Name": namePlayer,
        
        "Salary proposal": from,
      });
        alert();
        setName(user.email);
        setData("");
        setSalary("");
    }
    const colRef = collection(db,'requestToRenewing');
    
    const  handleDelete = async () => {
       
      }



  return (
    <div className="clubtoplayercom">
      <Navbar/>
    <header className="clubtoplayercom-header">
    <form 
       onSubmit={(e) => {handleSubmit(e)}}>
     {/*when Player submit the form , handleSubmit()
        function will be called .*/}

    <h2> New proposal for a Club</h2>
        <label >
        Name:
        </label><br/>
        <input type="text" placeholder="Name Lastname"defaultValue={user.email}  onChange ={(e)=>{setName(user.email)}}/><br/>
        <label >
        New contract expiration:
        </label><br/>
        <input type="text" placeholder="Insert new data" value={title} required onChange={(e) => {handleData(e)}} /><br/>
        <label >
        New Salary:
        </label><br/>
        <input type="text" placeholder="Insert new salary" value={from} required onChange={(e) => {handleSalary(e)}} /><br/>
        <input type="submit" value="Submit"/>
      </form>
    </header>
    </div>
  );


}
export default Renewing;