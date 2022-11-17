import "./upload_c.scss"
import Navbar from "../../components/navbar/Navbar"
import document from './document.png'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Upload_c = () => {


const docRef = doc(db, "DocSubDeadlines", "TheYearlyDeadline");
const docSnap = getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}


    return (
        <div>
            <Navbar />
            <div className="center">
                <div className="container">
                    <h2>Deadline: {}</h2>
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