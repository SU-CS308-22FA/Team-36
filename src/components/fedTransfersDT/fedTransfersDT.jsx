import "./fedTransfersDT.scss";
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

const FedTransfersDT = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const fetchData = async () => {
                    const docRef = doc(db, "users", user.uid);

                    let docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {

                        //const q = query(collection(db, "transferOffers"), where("sellingClub", "==", docSnap.data().name));

                        let list = []
                        try {
                            const querySnapshot = await getDocs(collection(db, "transferOffers"));
                            querySnapshot.forEach((doc) => {
                                list.push({ id: doc.id, ...doc.data() })
                            });
                            setData(list);
                        } catch (err) {
                            console.log(err);
                        }

                        const unsub = onSnapshot(
                            collection(db, "transferOffers"),
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
                fetchData()
            } else {
                console.log("User is not logged in");
            }
        });

    }, []);

    console.log(data)


    const handleApprove = async (e, approval, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "transferOffers"), where("fedApproval", "==", approval));
        let q_club = query(q_decision, where("buyingClub", "==", from));
        let q_player = query(q_club, where("player", "==", to));
    
        let specificOffer = await getDocs(q_player);
    
        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "fedApproval", "BID APPROVED")
        })
    
    }
    
    const handleDisapprove = async (e, approval, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "transferOffers"), where("fedApproval", "==", approval));
        let q_club = query(q_decision, where("buyingClub", "==", from));
        let q_player = query(q_club, where("player", "==", to));
    
        let specificOffer = await getDocs(q_player);
    
        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "fedApproval", "BID DISAPPROVED")
        })
    
    }

    //MAKE A FUNCTION TO CHECK THE CLUB STATUS HERE
    

    return (

        <div className="container">
        <div className="myTable">
            <table>
                <tr>
                    <th>Decision</th>
                    <th>Federation Approval</th>
                    <th>Offer From</th>
                    <th>Transfer Type</th>
                    <th>Offer For</th>
                    <th>Player Current Club</th>
                    <th>Fee Offered in Millions</th>
                    <th>Action</th>
    
                </tr>
                {data.map((offer, key) => {
                    return (
                        <tr key={key}>
                            <td>{offer.decision}</td>
                            <td>{offer.fedApproval}</td>
                            <td>{offer.buyingClub}</td>
                            <td>{offer.transferType}</td>
                            <td>{offer.player}</td>
                            <td>{offer.sellingClub}</td>
                            <td>{offer.fee}</td>
                           

                            <button className="approve" disabled={offer.fedApproval != "AWAITING APPROVAL"} onClick={(e) => { handleApprove(e, offer.fedApproval, offer.buyingClub, offer.player) }}> Approve Offer</button>
                            <button className="disapprove" disabled={offer.fedApproval != "AWAITING APPROVAL"} onClick={(e) => { handleDisapprove(e, offer.fedApproval, offer.buyingClub, offer.player) }}> Disapprove Offer </button>
                            <Link to="/clubffpstatus" style={{ textDecoration: "none" }}>
                             <button className="checkStatus"> Check Club FFP Status</button>
                            </Link>
                            

                        </tr>
                    )
                })}
            </table>
        </div>
        </div>
    );

};

export default FedTransfersDT;