import "./upload_c.scss"
import Navbar from "../../components/navbar/Navbar"
import document from './document.png'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import moment from "moment/moment";

const Upload_c = () => {

const [ date, setDate ] = useState();
    
useEffect(async () => {
    const docRef = doc(db, "DocSubDeadlines", "TheYearlyDeadline");
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        docSnap = new Date(docSnap.data().DateTime)
        setDate(docSnap)
        console.log("Document data:", date);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}, []);


    return (
        <div>
            <Navbar />
            <div className="center">
                <div className="container">
                    <h2>Deadline:</h2><span>{moment(date).format('DD-MM-YYYY')}</span>
                    <div className="block">
                        <h1>Upload Document</h1>
                        <img src={document}></img>
                        <label className="file">
                            Upload
                            <input type="file" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload_c