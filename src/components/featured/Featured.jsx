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

  let spending = 0;
  let Tsum = 0;
  let revenue = 0;
  let Tprofit = 0;

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            let docSnap = await getDoc(docRef);
           
          if (docSnap.exists()) {

            const q = query(collection(db, "clubFinances"), where("name", "==", docSnap.data().name));

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
        Tsum = offer.transfers;
        spending += offer.transfers;
        spending += offer.stadiumAndFacilities;
        spending += offer.finesAndTaxes;

        Tprofit = offer.transferProfit;
        revenue += offer.transferProfit;
        revenue += offer.shirtSales;
        revenue += offer.ticketSales;
        revenue += offer.prizes
    })

    let percentage = (Tsum/spending)*100;

    let revPercentage = (Tprofit/revenue)*100;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Spendings</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={percentage.toFixed(0) + "%"} strokeWidth={5} />
        </div>
        <p className="amount">{"₺"}{spending*1000000}</p>
        <p className="desc">
          The percentage in chart above represents the percentage that spendings on transfers takes up. The number below it represents total spending.
        </p>
        <div className="revFeaturedChart">
        <CircularProgressbar value={revPercentage} text={revPercentage.toFixed(0) + "%"} strokeWidth={5} />    
        </div>
        <p className="revAmount">{"₺"}{revenue*1000000}</p>
        <p className="desc">
            The percentage in the chart above represents the percentage that revenue from transfers takes up. The number below it represents total revenue.
        </p>
        <p className="amount">{"₺"}{(revenue*1000000) - (spending*1000000)}</p>
        <p className="desc">
           The number above represents NET profit.
        </p>
      </div>
    </div>
  );
};

export default Featured;