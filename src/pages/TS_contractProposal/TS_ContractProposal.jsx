import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import './TS_ContractProposal.scss';
import TSNavbar from '../../components/TSnavbar/TSNavbar';


const TSContractProposal = () => {

  const [duration, setDuration] = useState('');
  const [salary, setSalary] = useState('');
  const [player, setPlayer] = useState('');
  const [type, setType] = useState('');
  const[from, setFrom] = useState('');
  const[decision, setDecision] = useState("AWAITING DECISION");


  const handleDuration = (e) => {
    setDuration(e.target.value);
  }

  const handleSalary = (e) => {
    setSalary(e.target.value);
  }

  const handlePlayer = (e) => {
    setPlayer(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }
  
  const handleFrom = (e) => {
    setFrom(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "TScontractProposals"), {
      "duration": duration,
      "salaryOffer": salary,
      "player": player,
      "transferType": type,
      "offerFrom": from,
      "decision": decision
    });
    alert('A contract proposal was sent to ' + player +' from ' + from + ' successfully!!');
    setPlayer("");
    setDuration("");
    setSalary("");
  }

  return (
    <div className="sendreq">
      <header className="sendreq-header">
        <TSNavbar />
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {/*when user submit the form , handleSubmit()
            function will be called. */}
          <h2> Offical Contract Proposal Form </h2>
          <label >
            Type of Transfer:
          </label><br />
          <select name="type" id="type_select" required onChange={(e) => { handleType(e) }}>
            <option value="" selected disabled hidde>--- Please Choose an Option ---</option>
            <option value="Buy"> Buy Player </option>
            <option value="Loan"> Loan Player </option>
          </select>
          { /*when user write in type input box , handleType()
                  function will be called. */}
                  **** By entering the player name and the name of your club manually, you confirm your offer ****
          <label >
            Confirm Player Name:
          </label><br />
          <input type="text" placeholder="Please capitalize first and lastname of player" value={player} required onChange={(e) => { handlePlayer(e) }} /><br />
          { /*when user write in title input box , handleTitle()
                  function will be called. */}
         <label >
            Confirm Club Name:
          </label><br />
          <input type="text" placeholder="Please capitalize first letter" value={from} required onChange={(e) => { handleFrom(e) }} /><br />
          { /*when user write in title input box , handleTitle()
                  function will be called. */}
          <label >
            Salary Offeres:
          </label><br />
          <input type="text" placeholder="80k per week, 5M per year, etc." value={salary} required onChange={(e) => { handleSalary(e) }} /><br />
          { /*when user write in from input box , handleFrom()
                   function will be called. */}
          <label>
            Duration of Coontract:
          </label><br />
          <input type="text" placeholder="3 years, 3 months, etc." value={duration} required onChange={(e) => { handleDuration(e) }} /><br />
          {/* when user write in sendTo input box , handleSendTo()
                  function will be called. required onChange={(e) => {handleBClub(e)}}*/}
          <button type="submit" value="Submit"> Submit </button>
        </form>
      </header>
    </div>
  );

}

export default TSContractProposal;