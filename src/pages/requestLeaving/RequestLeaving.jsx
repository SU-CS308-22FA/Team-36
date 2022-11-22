import React, {useState} from 'react';
import { auth, db } from "../../firebase";
import './RequestLeaving.scss';
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext"
import { addDoc, collection } from "firebase/firestore";

const  RequestLeaving = () => {

    const user = auth.currentUser;

    const [Name , setName] = useState('');
    const [textMotivation, setMotivation] = useState('');

    const handleName =(e)=>{
        setName(e.target.value);
      }
      const handleMotivation =(e)=>{
        setMotivation(e.target.value);
      }

      const handleRequestLeaving = async (e)=>{
        e.preventDefault();
        await addDoc(collection(db, "requestToLeaving"), {
          "Name": Name,
          "Motivation": textMotivation,
        });
          alert();
          setName("");
          setMotivation("");
      }


    return (
        <div className="clubtoplayercom">
        <Navbar/>
      <header className="clubtoplayercom-header">
      <form 
      onSubmit={(e) => { handleRequestLeaving(e)}}>
    <h2> New request to leaving:</h2>
        <label >
        Requester:
        </label><br/>
        <input type="text"    defaultValue={user.email} required onChange={(e) => {handleName(e)}} /><br/>
        <label >
        Motivation:
        </label><br/>
        <input type="text" placeholder="Insert motivation"  required onChange={(e) => {handleMotivation(e)}} /><br/>

</form>
</header>
</div>

    );
}

export default RequestLeaving;
