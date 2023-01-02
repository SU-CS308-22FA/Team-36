import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Featured = () => {
    const [transferData, setTData] = useState([]);

  let Tsum = 0;

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            let docSnap = await getDoc(docRef);
           
          if (docSnap.exists()) {

            const q = query(collection(db, "transferOffers"), where("buyingClub", "==", docSnap.data().name));

            let list = []
            try {
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
              });
              setTData(list);
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
                setTData(list);
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

    transferData.map(async (offer) => {
        Tsum += offer.fee;
    })

    console.log(Tsum);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Spendings</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="amount">{Tsum*1000000}</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Spending Limit</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;