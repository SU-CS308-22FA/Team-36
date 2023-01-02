import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import './SendTransferOffer.scss';
import { TextArea } from '@react-ui-org/react-ui';
import TSNavbar from '../../components/TSnavbar/TSNavbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SendTransferOffer = () => {

  const [data, setData] = useState([]);
  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const fetchData = async () => {
          const docRef = doc(db, "users", user.uid);

          let docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const q = query(collection(db, "users"), where("name", "==", docSnap.data().name));

            let list = []
            try {
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
              });
              setData(list);
            } catch (err) {
              console.log(err);
            }

            const unsub = onSnapshot(
              q,
              (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                  list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
              },
              (error) => {
                console.log(error);
              }
            );

            return () => {
              unsub();
            };
          } else {
            console.log("No such document!");
          }

        };
        fetchData()
      } else {
        console.log("User is not logged in");
      }
    });

  }, []);

  const [bclub, setBClub] = useState('');
  const [fee, setFee] = useState('');
  const [player, setPlayer] = useState('');
  const [sclub, setSClub] = useState('');
  const [type, setType] = useState('');
  const[decision, setDecision] = useState("AWAITING DECISION");
  const [approval, setApproval] = useState("AWAITING APPROVAL");


  const handleBClub = (e) => {
    setBClub(e.target.value);
  }

  const handleFee = (e) => {
    setFee(e.target.value);
  }

  const handlePlayer = (e) => {
    setPlayer(e.target.value);
  }

  const handleSClub = (e) => {
    setSClub(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "transferOffers"), {
      "buyingClub": bclub,
      "fee": fee,
      "player": player,
      "sellingClub": sclub,
      "transferType": type,
      "decision": decision,
      "fedApproval": approval
    });
    alert('A transfer offer of "' + fee + '" was sent to :"' + sclub +
      '" from :"' + bclub + '" for the "' + type + '" of: "' + player);
    setFee("");
    setSClub("");
    setBClub("");
    setPlayer("");
  }

  return (
    <div className="sendreq">
      <header className="sendreq-header">
        <TSNavbar />
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {/*when user submit the form , handleSubmit()
            function will be called. */}
          <h2> Offical Transfer Offer Form </h2>
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
                  **** By entering the player name, your club name, and the name of the player's current club, You confirm your offer. ****
          <label >
            Confirm Player Name:
          </label><br />
          <input type="text" placeholder="Please capitalize first and lastname of player" value={player} required onChange={(e) => { handlePlayer(e) }} /><br />
          { /*when user write in title input box , handleTitle()
                  function will be called. */}
          <label >
            Fee:
          </label><br />
          <input type="text" placeholder="Enter a number in millions" value={fee} required onChange={(e) => { handleFee(e) }} /><br />
          { /*when user write in from input box , handleFrom()
                   function will be called. */}
          <label>
            Confirm Buying Club:
          </label><br />
          <input type="text" placeholder="Please capitalize the first letter" value={bclub} required onChange={(e) => { handleBClub(e) }} /><br />
          {/* when user write in sendTo input box , handleSendTo()
                  function will be called. required onChange={(e) => {handleBClub(e)}}*/}
          <label>
            Confirm Player's Current Club:
          </label><br />
          <input type="text" placeholder="Please capitalize the first letter" value={sclub} required onChange={(e) => { handleSClub(e) }} /><br />
          {/* when user write in content input box ,
                      handleContent() function will be called.*/}
          <button type="submit" value="Submit"> Submit </button>
        </form>
      </header>
    </div>
  );

}

export default SendTransferOffer;