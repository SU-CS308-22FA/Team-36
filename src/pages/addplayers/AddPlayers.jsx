import React, {useState} from 'react';
import { db} from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import './AddPlayers.scss';
import Navbar from "../../components/navbar/Navbar";
const  AddPlayers = () => {

    const [namePlayer , setName] = useState('');
    const [title, setData] = useState('');
    const [from , setSalary] = useState('');

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
  return (
    <div className="clubtoplayercom">
      <Navbar/>
    <header className="clubtoplayercom-header">
    <form onSubmit={(e) => {handleSubmit(e)}}>
    <h2> Add player on your Club and propose contract</h2>
        <label >
        Name:
        </label><br/>
        <input type="text" placeholder="Name Lastname" value={namePlayer} required onChange={(e) => {handleName(e)}} /><br/>
        <label >
        Contract expiration:
        </label><br/>
        <input type="text" placeholder="Insert data" value={title} required onChange={(e) => {handleData(e)}} /><br/>
        <label >
        Salary:
        </label><br/>
        <input type="text" placeholder="Insert salary" value={from} required onChange={(e) => {handleSalary(e)}} /><br/>
        <input type="submit" value="Submit"/>
      </form>
    </header>
    </div>
  );


}
export default AddPlayers;