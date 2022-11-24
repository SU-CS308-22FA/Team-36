import "./upload_c.scss"
import Navbar from "../../components/navbar/Navbar"
import document from './document.png'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Upload_c = () => {

    const user = auth.currentUser;
    const [date, setDate] = useState();
    const [file, setFile] = useState("");
    const [fileDoc, setFileDoc] = useState("")
    const storage = getStorage();
    const [uploaded, setUploaded] = useState(false)
    const [deadline_past, setDeadline_past] = useState(false);
    const metadata = {
        contentType: 'application/pdf'
    };
    const storageRef = ref(storage, 'application/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    useEffect(async () => {
        const docRef = doc(db, "DocSubDeadlines", "TheYearlyDeadline");
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            docSnap = new Date(docSnap.data().DateTime)
            setDate(docSnap)
            let current = new Date();
            if (current >= date) {
                console.log("this is " + current >= date)
                setDeadline_past(true)
            }
            // console.log("Document data:", date);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }, []);

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User does not have permission")
                        break;
                    case 'storage/canceled':
                        console.log("Canceled")
                        break;
                    case 'storage/unknown':
                        console.log("Unknown error")
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFileDoc(downloadURL)
                    await updateDoc(doc(db, "users", user.uid), {
                        "document": downloadURL
                    });
                    setUploaded(true)
                });
            });
    }

    return (
        <div>
            <Navbar />
            <div className="center">
                <div className={!uploaded ? "container" : "container_u"} >
                    <h2 className="deadline">Deadline:</h2><span className={deadline_past ? "late" : "time"}>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    {
                        !uploaded &&
                        <div className={deadline_past ? "past" : "block"}>
                            <h1>Upload Document</h1>
                            <img src={document}></img>
                            <label className="file" >
                                Choose
                                <input type="file" onChange={handleChange} disabled={deadline_past}/>
                            </label>
                            {
                                file &&
                                <label className="file" onClick={handleUpload}>Upload!</label>
                            }
                        </div>
                    }
                    {
                        uploaded &&
                        <iframe className="pdf"
                            src={fileDoc}
                            frameBorder="0"
                            scrolling="auto"
                            height="100%"
                            width="100%"
                        ></iframe>
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload_c