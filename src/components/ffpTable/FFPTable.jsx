import "./FFPTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { offers_usercolumns, receivedOffers_usercolumns } from "../../offersDataTable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";

const FFPTable = () => {

    const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        let list = [];
        try {
          const querySnapshot = await getDocs(collection(db, "clubFinances"));
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
          console.log(list);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
  
      // LISTEN (REALTIME)
      const unsub = onSnapshot(
        collection(db, "clubFinances"),
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
    }, []);

      console.log(data)

    const handleCheck = async (e, club, spend, revenue) => {

      e.preventDefault();

      let q_club = query(collection(db, "clubFinances"), where("name", "==", club));
      
      if (spend < ((revenue * 0.6)-20)) {
        let thisClub = await getDocs(q_club);
        thisClub.forEach(async (nady) => {
          await updateDoc(nady.ref, "ffpStatus", "SAFE")
        })
      } 
      else if (spend <= (revenue * 0.6) && spend >= ((revenue * 0.6) - 20)){
        let thisClub = await getDocs(q_club);
        thisClub.forEach(async (nady) => {
          await updateDoc(nady.ref, "ffpStatus", "IN DANGER")
        })
      }

      else {
        let thisClub = await getDocs(q_club);
        thisClub.forEach(async (nady) => {
          await updateDoc(nady.ref, "ffpStatus", "BROKEN")
        })
      }

  }

    return (  
      <div className="everything">
        <p className="desc">
            The following is an explanation of what each FFP Status means:
            <p className="safe">SAFE: This means that the club has spent far less than 60% of their revenues and is safe from breaking FFP rules.</p>
            <p className="danger">IN DANGER: This means that the club has almost spent 60% of its revenues or has spent 60% of its revenues and is almost breaking FFP rules.</p>
            <p className="broken">BROKEN: The club has spent more than 60% of its revenues and has broken FFP rules. </p>
          </p>
        <div className="myTable">
            <table>
                <tr>
                    <th>Club Name</th>
                    <th>Total Spend</th>
                    <th>Total Revenue</th>
                    <th>NET Profit</th>
                    <th>Status</th>
                    <th>Action</th>
    
                </tr>
                {data.map((offer, key) => {
                    return (
                        <tr key={key}>
                            <td>{offer.name}</td>
                            <td>{offer.totalSpend}</td>
                            <td>{offer.totalRevenue}</td>
                            <td>{offer.net}</td>
                            <td>{offer.ffpStatus}</td>
                            <button className="checkStatus" onClick={(e) => { handleCheck(e, offer.name, offer.totalSpend, offer.totalRevenue) }}> Check FFP Status</button>
                            <Link to="/sendreq" style={{ textDecoration: "none" }}>
                              <button className="sendWarning" disabled={offer.ffpStatus == "SAFE"}>Warn Club</button>
                            </Link>
                        </tr>
                    )
                })}
            </table>
        </div>
        </div>
    );
};

export default FFPTable;