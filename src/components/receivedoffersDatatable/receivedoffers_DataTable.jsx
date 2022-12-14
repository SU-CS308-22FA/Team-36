import "./receivedoffers_DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { offers_usercolumns, receivedOffers_usercolumns } from "../../offersDataTable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';


const ReceivedOffers_DataTable = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const fetchData = async () => {
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
                fetchData()
            } else {
                console.log("User is not logged in");
            }
        });

    }, []);

    console.log(data)

    const handleAccept = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "transferOffers"), where("decision", "==", deci));
        let q_club = query(q_decision, where("buyingClub", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "OFFER ACCEPTED")
        })

    }

    const handleDecline = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "transferOffers"), where("decision", "==", deci));
        let q_club = query(q_decision, where("buyingClub", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "OFFER DECLINED")
        })
    }

    const handleNegotiate = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "transferOffers"), where("decision", "==", deci));
        let q_club = query(q_decision, where("buyingClub", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "CLUB WOULD LIKE TO NEGOTIATE THE OFFER PLEASE GET IN TOUCH")
        })

    }

    const handleClubChange = async (e) => {

        e.preventDefault();

        data.map(async (offer) => {

            let q_decision = query(collection(db, "transferOffers"), where("decision", "==", offer.decision));
            let q_club = query(q_decision, where("buyingClub", "==", offer.buyingClub));
            let q_player = query(q_club, where("player", "==", offer.player));

            let specificOffer = await getDocs(q_player);
            console.log(offer.player);

            data.map(async (playeroffer) => {
                //let q_playerdecision = query(collection(db, "TSContractProposals"), where("decision", "==", playeroffer.decision));
                let q_playerclub = query(collection(db, "TSContractProposals"), where("offerFrom", "==", offer.buyingClub));
                let q_playername = query(q_playerclub, where("player", "==", offer.player));

                let CspecificOffer = await getDocs(q_playername);

                if (specificOffer.decision == "OFFER ACCEPTED") {
                    if (CspecificOffer.decision == "OFFER ACCEPTED") {

                        data.map(async (user) => {
                            let q_playerFind = query(collection(db, "users"), where("name", "==", offer.player));
                            let q_clubFind = query(q_playerFind, where("currentClub", "==", playeroffer.buyingClub));

                            let theplayer = await getDocs(q_clubFind);

                            theplayer.forEach(async (doc) => {
                                await updateDoc(doc.ref, "currentClub", offer.buyingClub)
                            })
                        })
                    }
                }

            })

        })
    }

    return (
       
        <div className="myTable">
          <table>
            <tr>
              <th>Decision</th>
              <th>Offer From</th>
              <th>Transfer Type</th>
              <th>Offer For</th>
              <th>Fee Offered</th>
              <th>Action</th>
            </tr>
            {data.map((offer, key) => {
              return (
                <tr key={key}>
                  <td>{offer.decision}</td>
                  <td>{offer.buyingClub}</td>
                  <td>{offer.transferType}</td>
                  <td>{offer.player}</td>
                  <td>{offer.fee}</td>
                  <button className="acceptOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleAccept(e, offer.decision, offer.buyingClub, offer.player)}}> Accept Offer</button>
                  <button className="declineOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleDecline(e, offer.decision, offer.buyingClub, offer.player) }}> Decline Offer </button>
                  <button className="negotiate" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleNegotiate(e, offer.decision, offer.buyingClub, offer.player) }}> Invite to Negotiation</button>
                </tr>
              )
            })}
          </table>
        </div>
      );


};

export default ReceivedOffers_DataTable;