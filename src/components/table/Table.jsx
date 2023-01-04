import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const List = () => {

  const [sold, setData] = useState([]);
  const [bought, setBData] = useState([]);

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


        const REfetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            let docSnap = await getDoc(docRef);
           
          if (docSnap.exists()) {

            const q = query(collection(db, "transferOffers"), where("sellingClub", "==", docSnap.data().name));

            let list = []
            try {
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
              });
              setBData(list);
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
                setBData(list);
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
        REfetchData()
        
       } else {
         console.log("User is not logged in");
       }
     });

  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">From</TableCell>
            <TableCell className="tableCell">To</TableCell>
            <TableCell className="tableCell">Player</TableCell>
            <TableCell className="tableCell">Transfer Type</TableCell>
            <TableCell className="tableCell">fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sold.map((row) => (
            <TableRow key={row.buyingClub}>
              <TableCell className="tableCell">{row.buyingClub}</TableCell>
              <TableCell className="tableCell">
                {/* <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div> */}
                  {row.sellingClub}
              </TableCell>
              <TableCell className="tableCell">{row.player}</TableCell>
              <TableCell className="tableCell">{row.transferType}</TableCell>
              <TableCell className="tableCell">{"₺ " + row.fee*1000000}</TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell> */}
            </TableRow>
          ))}

          {bought.map((Brow) => (
            <TableRow key={Brow.buyingClub}>
            <TableCell className="tableCell">{Brow.buyingClub}</TableCell>
            <TableCell className="tableCell">
              {/* <div className="cellWrapper">
                <img src={row.img} alt="" className="image" />
                {row.product}
              </div> */}
                {Brow.sellingClub}
            </TableCell>
            <TableCell className="tableCell">{Brow.player}</TableCell>
            <TableCell className="tableCell">{Brow.transferType}</TableCell>
            <TableCell className="tableCell">{"₺ " + Brow.fee*1000000}</TableCell>
            {/* <TableCell className="tableCell">{row.method}</TableCell> */}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;