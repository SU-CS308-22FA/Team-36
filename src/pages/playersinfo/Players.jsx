import "./players.scss"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { PlayerDetails } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";

const Players = () => {
    const [data, setData] = useState([]);
    const { club } = useParams();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchData = async () => {
                    let list = []
                    try {
                        const q = query(collection(db, "users"), where("currentClub", "==", club))
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((item) => {
                            list.push({ id: item.id, ...item.data() })
                        });
                        setData(list);
                        console.log(data)
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchData()
            } else {
                console.log("User not logged");
            }
        });
    }, []);

    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">Players</div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={PlayerDetails}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Players