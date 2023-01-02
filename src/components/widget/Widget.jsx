import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setData } from "@progress/kendo-intl";
import { TramSharp } from "@mui/icons-material";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;
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


    switch (type) {
        case "user":
          data = {
            title: "FFP STATUS",
            isMoney: false,
            dataAssociated: "SAFE",
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
        case "order":
          data = {
            title: "STADIUM AND FACILITIES SPENDING",
            isMoney: true,
            icon: (
              <ShoppingCartOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          break;
        case "earning":
          data = {
            title: "FINES AND TAXES",
            isMoney: true,
            icon: (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
              />
            ),
          };
          break;
        case "product":
          data = {
            title: "TRANSFER SPENDINGS (M)",
            query:"transferOffers",
            isMoney: true,
            dataAssociated: Tsum,
            icon: (
              <AccountBalanceWalletOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            ),
          };
          break;
        default:
          break;
      }

      


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.dataAssociated}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;