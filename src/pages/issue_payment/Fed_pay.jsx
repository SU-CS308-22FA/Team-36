import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./fed_pay.scss";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Clubs } from "../../datatablesource";

const Fed_pay = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [admin, setAdmin] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const q = query(collection(db, "users"), where("role", "==", "Club"))
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAdmin(user);
                /**
                 * Get the players for the club that has been selected using the param in the url.
                 */
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

    /**
     * Navigates user to the selected club.
     * @param {json} param 
     */
    const navigateTo = (param) => {
        console.log(param.name)
        navigate("/pay/" + param.name)
    }

    /**
     * Select player to add to national team. It sends a notification to the player.
     * @param {json} player 
     */
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
                    <div className="datatableTitle">Clubs</div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={Clubs.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        onRowClick={(param) => navigateTo(param.row)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Fed_pay;