import "./select.scss"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { PlayerDetails } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";

const Select = () => {
    const [data, setData] = useState([]);
    const { club } = useParams();
    const [admin, setAdmin] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin(user);
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

    const handleSelect = async (player) => {
        console.log()
        try {
            await addDoc(collection(db, "requests"), {
                "type": "Selection",
                "Title": "National",
                "SendFrom": admin.email,
                "SendTo": player.email,
                "content": "Congratulations " + player.name + "! You have been selected for the national team."
            });
            alert(player.email + " has been notified.")
        } catch (err) {
            console.log(err);
        }
    }

    const actionColumn = [
        {
            field: "national",
            headerName: "Select",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="deleteButton"
                            onClick={() => handleSelect(params.row)}
                        >
                            Select
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">Players</div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={PlayerDetails.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Select 