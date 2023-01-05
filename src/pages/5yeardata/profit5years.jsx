import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import './profit5years.scss';
import { TextArea } from '@react-ui-org/react-ui';
import Navbar from '../../components/navbar/Navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
 
const Profit5years = () => {

  let userName = "";
    const [club , setClub] = useState(userName);
    const [y19, setY19] = useState('');
    const [y20 , setY20] = useState('');
    const [y21 , setY21] = useState('');
    const [y22 , setY22] = useState('');
    const [y23 , setY23] = useState('');


  
  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const getName = async () => {
          const docRef = doc(db, "users", user.uid);

          let docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            userName = docSnap.data().name;
            setClub(userName);
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

    // function to update state of wtype with
    // value enter by user in form
    const handleClub =(e)=>{
      setClub(e.target.value);
    }
    // function to update state of title with
    // value enter by user in form
    const handleY19 =(e)=>{
      setY19(e.target.value);
    }
    // function to update state of from with value
    // enter by user in form
    const handleY20 =(e)=>{
      setY20(e.target.value);
    }
    // function to update state of sendTo with value
    // enter by user in form
    const handleY21 =(e)=>{
      setY21(e.target.value);
    }
      // function to update state of content with
      // value enter by user in form
    const handleY22 =(e)=>{
      setY22(e.target.value);
    }

    const handleY23 =(e)=>{
        setY23(e.target.value);
      }
    // below function will be called when user
    // click on submit button .
    const handleSubmit = async (e)=>{
      e.preventDefault();
      await addDoc(collection(db, "profit5years"), {
        "name": club,
        "year19": Number(y19),
        "year20": Number(y20),
        "year21": Number(y21),
        "year22": Number(y22),
        "year23": Number(y23)
      });
        alert('NET Profit from last 5 years has successfully been uploaded! You can check it in Manage Finances page!');
        setY19("");
        setY20("");
        setY21("");
        setY22("");
        setY23("");
    }



  return (
    <div className="sendreq">
    <header className="sendreq-header">
      <Navbar/>
    <form onSubmit={(e) => {handleSubmit(e)}}>
     {/*when user submit the form , handleSubmit()
        function will be called .*/}
    <h2> Official NET Profit of 5 Years Form </h2>
        <label >
          Club Name:
        </label><br/>
        <input type="text" value={club} required/><br/>
          { /*when user write in title input box , handleTitle()
              function will be called. */}
        <label >
          2019 NET Profit:
        </label><br/>
        <input type="text" placeholder="number you enter will be multiplied by a million..." value={y19} required onChange={(e) => {handleY19(e)}}/><br/>
            { /*when user write in from input box , handleFrom()
               function will be called. */}
        <label>
          2020 NET Profit:
        </label><br/>
        <input type="text" placeholder="number you enter will be multiplied by a million..." value={y20} required onChange={(e) => {handleY20(e)}} /><br/>
          {/* when user write in sendTo input box , handleSendTo()
              function will be called.*/}
        <label>
          2021 NET Profit:
        </label><br/>
        <input type="text" placeholder="number you enter will be multiplied by a million..." value={y21} required onChange={(e) => {handleY21(e)}} /><br/>
          {/* when user write in sendTo input box , handleSendTo()
              function will be called.*/}
        <label>
          2022 NET Profit:
        </label><br/>
        <input type="text" placeholder="number you enter will be multiplied by a million..." value={y22} required onChange={(e) => {handleY22(e)}} /><br/>
          {/* when user write in sendTo input box , handleSendTo()
              function will be called.*/}
         <label>
          2023 NET Profit {" (Please leave empty if you have already uploaded financal data)"}:
        </label><br/>
        <input type="text" placeholder="number you enter will be multiplied by a million..." value={y23} onChange={(e) => {handleY23(e)}} /><br/>
          {/* when user write in sendTo input box , handleSendTo()
              function will be called.*/}
        <button type="submit" value="Submit"> Submit </button>
      </form>
    </header>
    </div>
  );
}
 
export default Profit5years;