import "./SentContractProposals.scss";
import { DataGrid } from "@mui/x-data-grid";
import { sent_contractproposals_userColumns } from "../../offersDataTable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';



const SentContractProposalsDT = () => {

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

                        const q = query(collection(db, "TScontractProposals"), where("offerFrom", "==", docSnap.data().name));

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

    return (
            <div className="transfers_datatable">
                <div className="transfers_datatableTitle">
                    Contract Proposals Sent
                </div>
                <DataGrid
                    className="transfers_datagrid"
                    rows={data}
                    columns={sent_contractproposals_userColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                />
            </div>
    );
};

export default SentContractProposalsDT;