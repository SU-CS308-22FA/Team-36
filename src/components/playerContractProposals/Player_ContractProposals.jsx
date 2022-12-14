import "./Player_ContractProposals.scss";
import { DataGrid } from "@mui/x-data-grid";
import { received_contractproposals_userColumns } from "../../offersDataTable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import { AccessAlarmTwoTone } from "@mui/icons-material";



const ReceivedContractProposalsDT = () => {

    const [data, setData] = useState([]);

    const user = auth.currentUser;

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const fetchData = async () => {
                    const docRef = doc(db, "users", user.uid);

                    let docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {

                        const q = query(collection(db, "TScontractProposals"), where("player", "==", docSnap.data().name));

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

    // const actionColumn = [
    //     {
    //       field: "action",
    //       headerName: "Action",
    //       width: 500,
    //       renderCell: () => {
    //         return (
    //           <div className="cellAction">
    //             <div className="acceptButton">Accept Proposal</div>
    //             <div className="rejectButton">Decline Proposal</div>
    //             <div className="negotiateButton">Invite to Negotiation</div>
    //           </div>
    //         );
    //       },
    //     },
    //   ];

    const handleAccept = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "TScontractProposals"), where("decision", "==", deci));
        let q_club = query(q_decision, where("offerFrom", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "OFFER ACCEPTED")
        })

    }

    const handleDecline = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "TScontractProposals"), where("decision", "==", deci));
        let q_club = query(q_decision, where("offerFrom", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "OFFER DECLINED")
        })
    }

    const handleNegotiate = async (e, deci, from, to) => {

        e.preventDefault();
        let q_decision = query(collection(db, "TScontractProposals"), where("decision", "==", deci));
        let q_club = query(q_decision, where("offerFrom", "==", from));
        let q_player = query(q_club, where("player", "==", to));

        let specificOffer = await getDocs(q_player);

        specificOffer.forEach(async (offer) => {
            await updateDoc(offer.ref, "decision", "PLAYER WOULD LIKE TO NEGOTIATE THE OFFER PLEASE GET IN TOUCH")
        })

    }

    // return (

    //     <div className="table">

    //         {data.map((offer) => (
    //             < div className="row" >
    //                 <label>
    //                     Decision:   {offer.decision}
    //                 </label>
    //                 <label>
    //                     Offer From: {offer.offerFrom}
    //                 </label>
    //                 <label>
    //                     Offer Type: {offer.transferType}
    //                 </label>
    //                 <label>
    //                     Salary Offered: {offer.salaryOffer}
    //                 </label>
    //                 <label>
    //                     Contract Duration: {offer.duration}
    //                 </label>

    //                 <button className="acceptOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleAccept(e, offer.decision, offer.offerFrom, offer.player)}}> Accept Offer</button>
    //                 <button className="declineOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleDecline(e, offer.decision, offer.offerFrom, offer.player) }}> Decline Offer </button>
    //                 <button className="negotiate" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleNegotiate(e, offer.decision, offer.offerFrom, offer.player) }}> Invite to Negotiation</button>
    //             </div>
    //         )
    //         )}
    //     </div >

    // );

    return (
        <div className="myTable">
          <table>
            <tr>
              <th>Decision</th>
              <th>Offer From</th>
              <th>Transfer Type</th>
              <th>Salary Offered</th>
              <th>Duration Proposed</th>
              <th>Action</th>
            </tr>
            {data.map((offer, key) => {
              return (
                <tr key={key}>
                  <td>{offer.decision}</td>
                  <td>{offer.offerFrom}</td>
                  <td>{offer.transferType}</td>
                  <td>{offer.salaryOffer}</td>
                  <td>{offer.duration}</td>
                  <button className="acceptOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleAccept(e, offer.decision, offer.offerFrom, offer.player)}}> Accept Offer</button>
                  <button className="declineOffer" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleDecline(e, offer.decision, offer.offerFrom, offer.player) }}> Decline Offer </button>
                  <button className="negotiate" disabled={offer.decision != "AWAITING DECISION"} onClick={(e) => { handleNegotiate(e, offer.decision, offer.offerFrom, offer.player) }}> Invite to Negotiation</button>
                </tr>
              )
            })}
          </table>
        </div>
      );

};

export default ReceivedContractProposalsDT;