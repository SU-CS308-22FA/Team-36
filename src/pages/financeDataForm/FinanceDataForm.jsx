import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import './FinanceDataForm.scss';
import { TextArea } from '@react-ui-org/react-ui';
import Navbar from '../../components/navbar/Navbar';
import ClubSidebar from '../../components/clubSidebar/ClubSidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FinanceDataUpload = () => {

  let teamName = "";
  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const getName = async () => {
          const docRef = doc(db, "users", user.uid);

          let docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            teamName = docSnap.data().name;
            setTeam(teamName);
          } else {
            console.log("No such document!");
          }

        };
        getName();
      } else {
        console.log("User is not logged in");
      }
    });

  }, []);

  const [team, setTeam] = useState(teamName);
  const [FT, setFT] = useState();   
  const[prizes, setPrize] = useState();
  const[merch, setMerch] = useState();
  const [SF, setSF] = useState();
  const [tickets, setTickets] = useState();
  const [tProfit, setTProfit] = useState();
  const [transfers, setTransfers] = useState();
  

  const handleFT = (e) => {
    setFT(e.target.value);
  }

  const handleTeam = (e) => {
    setTeam(e.target.value);
  }

  const handlePrize = (e) => {
    setPrize(e.target.value);
  }

  const handleMerch = (e) => {
    setMerch(e.target.value);
  }

  const handleSF = (e) => {
    setSF(e.target.value);
  }

  const handleTickets = (e) => {
    setTickets(e.target.value);
  }

  const handleTProfit = (e) => {
    setTProfit(e.target.value);
  }

  const handleTransfers = (e) => {
    setTransfers(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "clubFinances"), {
      "finesAndTaxes": Number(FT),
      "name": team,
      "prizes": Number(prizes),
      "shirtSales": Number(merch),
      "stadiumAndFacilities": Number(SF),
      "ticketSales": Number(tickets),
      "transferProfit": Number(tProfit),
      "transfers": Number(transfers),
      "totalSpend":(Number(FT)+Number(SF)+Number(transfers)),
      "totalRevenue": (Number(prizes)+Number(merch)+Number(tickets)+Number(tProfit)),
      "net": ((Number(prizes)+Number(merch)+Number(tickets)+Number(tProfit))-(Number(FT)+Number(SF)+Number(transfers)))
    });
    alert('Finance data was successfully uploaded! You can check the information in Financial Management page!');
    setFT("");
    setPrize("");
    setMerch("");
    setSF("");
    setTickets("");
    setTProfit("");
    setTransfers("");
  }

  return (
    <div className="sendreq">
      <header className="sendreq-header">
        <Navbar />
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {/*when user submit the form , handleSubmit()
            function will be called. */}
          <h2> Offical Financial Data Upload Form </h2>
         <p className='welcome'> Welcome {team}! Please fill all fields with the requested data! </p> 
            <label>
                Club Name:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={team} required/><br />
            {/* when user write in content input box ,
                        handleContent() function will be called.*/}
            <label >
                Revenues from Transfers:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={tProfit} required onChange={(e) => { handleTProfit(e) }} /><br />
            { /*when user write in title input box , handleTitle()
                    function will be called. */}
            <label >
                Revenues from Merchandise Sales:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={merch} required onChange={(e) => { handleMerch(e) }} /><br />
            { /*when user write in from input box , handleFrom()
                    function will be called. */}
            <label>
                Revenue from Ticket Sales:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={tickets} required onChange={(e) => { handleTickets(e) }} /><br />
            {/* when user write in sendTo input box , handleSendTo()
                    function will be called. required onChange={(e) => {handleBClub(e)}}*/}
            <label>
                Revenues from Tournament Prizes and Broadcasting:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={prizes} required onChange={(e) => { handlePrize(e) }} /><br />
            {/* when user write in content input box ,
                        handleContent() function will be called.*/}
            <label>
                Spendings on Transfers:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={transfers} required onChange={(e) => { handleTransfers(e) }} /><br />
            {/* when user write in content input box ,
                        handleContent() function will be called.*/}
            <label>
                Spendings on Stadium and Facilities:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={SF} required onChange={(e) => { handleSF(e) }} /><br />
            {/* when user write in content input box ,
                        handleContent() function will be called.*/}
            <label>
                Spendings on Fines and Taxes:
            </label><br />
            <input type="text" placeholder="The number you enter is multiplied by a million" value={FT} required onChange={(e) => { handleFT(e) }} /><br />
            {/* when user write in content input box ,
                        handleContent() function will be called.*/}
          <button type="submit" value="Submit"> Submit </button>
        </form>
      </header>
    </div>
  );

}

export default FinanceDataUpload;