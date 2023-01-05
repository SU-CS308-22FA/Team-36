import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from "../../components/navbar/Navbar";
import document from './document.png'
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";


const handleSomma = async (e) => { 
    
    e.preventDefault();
    //SELEZIONARE SOLO LE QUERY CON FinesToPlayers.FROM == ClubFin.NAME
    //SOMMARE LA FINES ALL'INCOME GIà PRESENTE IN ClubFin
    //const docRef = doc(db, "FinesToPlayers", FinesToPlayers.uid);  
    //let docSnap = await getDoc(docRef);
    //let www = query(collection(db, "FinesToPlayers"), where("from", "==", "Fenerbahce"))
    const fetchData = async () => {
    const docRef = doc(db, "users");
    let docSnap = await getDoc(docRef);
    //let ccc = query(collection(db, "ClubFin"), where("Income", "!=", 0));
    //let cccc = query(collection(db,"FinesToPlayers"));
    let ccccc = query(collection(db, "ClubFin"), where ("Name", "==",docSnap.data().name))
    let xx = await getDocs(ccccc);
    xx.forEach(async (oo) => {
        await updateDoc(oo.ref, "Income", "" )
    })
};fetchData()

}

const handlePayment = async (e) => { 
    e.preventDefault();
    const docRef = doc(db, "users");
    let docSnap = await getDoc(docRef);
    let cc = query(collection(db, "FinesToPlayers"), where("fines", "!=", 0));
    let x = await getDocs(cc);
    x.forEach(async (o) => {
        await updateDoc(o.ref, "fines", "paid")
    })
    let ccccc = query(collection(db, "ClubFin"), where ("Name", "==", docSnap.data().name))
    let xx = await getDocs(ccccc);
    xx.forEach(async (oo) => {
        await updateDoc(oo.ref, "Income", "" )
    })
   

}




const PaymentFines= () => {
    const { doc } = useContext(AuthContext);
    console.log("DOC " + doc);

 const [showPopUp, setShowPopUp] = useState(false);

  function togglePopUp() {
    setShowPopUp(!showPopUp);
  }

    return (
        <div className="clubtoplayercom">
        <Navbar/>
      <header className="clubtoplayercom-header">
      <h2> Click to complete the Payment!</h2>          
      <img src={document}></img>

      <button className="paymentClick"  onClick={(e) => { handlePayment(e)}}> Click to conferm all the payment</button>


       
        </header>

      </div>

      
    );
}

export default PaymentFines;
