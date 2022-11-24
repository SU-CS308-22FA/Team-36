import React, {useState} from 'react';
import { db} from "../../firebase";
import { doc, deleteDoc, addDoc, collection, getDocs, Firestore } from "firebase/firestore";
//import {handleDelete} from "../../index";
import './NewProposal.scss';
import Navbar from "../../components/navbar/Navbar";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext"
import {updateDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { async } from '@firebase/util';
//import { deletePlayer} from "firebase/auth"


const  NewProposal = () => {

    const [namePlayer , setName] = useState('');
    const [title, setData] = useState('');
    const [from , setSalary] = useState('');
    const Player = auth.currentPlayers;

    const handleName =(e)=>{
      setName(e.target.value);
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

      await addDoc(collection(db, "Players"), {
        "Name": namePlayer,
        "Contract expiration": title,
        "Salary": from,
      });
        alert();
        setName("");
        setData("");
        setSalary("");
    }
    const colRef = collection(db,'Players');
    
    const  handleDelete = async (e) => {
       
        console.log("current name:",e)
        Firestore().collection('Players').doc(e).delete();
        const deletePlayer = document.querySelector('.delete')
        await deleteDoc(doc(db, "Players", Player.uid));
        //const docRef = doc(db,'Players',e.id.value)
        deleteDoc(docRef);
        
        e.preventDefault();
        setName(e.target.value);
        const docRef = doc(db, "players", e.collection.Name)
        await deleteDoc(docRef);
        /*
        const ref = collection(db, "Players");
        const g = query (ref, where ("name","==", e.name));
        const snapshot = await getDocs();
*/
      }

      const handleDeleteee = (e) => {
        const deletePlayer = document.querySelector('.delete')
        const credential = EmailAuthProvider.credential(Player.namePlayer)
        reauthenticateWithCredential(Player, credential).then(async () => {
            console.log(Player.namePlayer + " logged")
            await deleteDoc(doc(db, "Players", Player.uid)).then(() => {
                console.log("Deleted firestore data")
            }).catch((error) => {
                console.log("Did not delete: " + error)
            })
            deletePlayer(Player).then(() => {
                console.log("\nPlayer has been deleted.\n")
                
            }).catch((error) => {
                console.log("Error: " + error)
            })
        }).catch((error) => {
            //setDeleteError(true)
            console.log("Error: " + error)
        })
    }
    



  return (
    <div className="clubtoplayercom">
      <Navbar/>
    <header className="clubtoplayercom-header">
    <form 
    onSubmit={(e) => { handleDeleteee(e)}}>
    <h2> New proposal for a player</h2>
        <label >
        Name:
        </label><br/>
        <input type="text" placeholder="Name Lastname" value={namePlayer} required onChange={(e) => {handleName(e)}} /><br/>
          { /*when Player write in type input box , handleName()
              function will be called. */}
        <label >
        New contract expiration:
        </label><br/>
        <input type="text" placeholder="Insert new data" value={title} required onChange={(e) => {handleData(e)}} /><br/>
          { /*when Player write in title input box , handleData()
              function will be called. */}
        <label >
        New Salary:
        </label><br/>
        <input type="text" placeholder="Insert new salary" value={from} required onChange={(e) => {handleSalary(e)}} /><br/>
            { /*when Player write in from input box , handleSalary()
               function will be called. */}
        <input type="submit" value="Submit"/>
      </form>
    </header>
    </div>
  );


}
export default NewProposal;