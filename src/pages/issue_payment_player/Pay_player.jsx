import "./pay_player.scss"
import "./popup.css"
import Navbar from "../../components/navbar/Navbar"
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { PlayerDetails } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";

const Pay_player = () => {
    const [data, setData] = useState([]);
    const { clubName } = useParams();
    const [admin, setAdmin] = useState();
    const [open, setOpen] = useState(false);
    const [player, setPlayer] = useState();
    const [amount, setAmount] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(clubName)
                setAdmin(user);
                /**
                 * Get the players for the club that has been selected using the param in the url.
                 */
                const fetchData = async () => {
                    let list = []
                    try {
                        const q = query(collection(db, "users"), where("currentClub", "==", clubName))
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

    const openForm = (player) => {
        setOpen(true)
        setPlayer(player.name)
        console.log(player.name)
    }

    const handlePay = async (e) => {
        // console.log()
        //here
        console.log(type, amount, admin.email, player)
        e.preventDefault();
        try {
            await addDoc(collection(db, "FinesToPlayers"), {
                "type": type,
                "fines": amount,
                "from": admin.email,
                "to": player
            });
            alert("Payment alert sent to " + player)
        } catch (err) {
            console.log(err);
        }
        setOpen(false)
    }

    const actionColumn = [
        {
            field: "club_fine",
            headerName: "Select",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="viewButton"
                            onClick={() => handleSelect(params.row)}
                        >
                            Select
                        </div>
                    </div>
                );
            },
        },
    ];

    const fineColumn = [
        {
            field: "player_fine",
            headerName: "Payment Due",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="deleteButton"
                            onClick={() => openForm(params.row)}
                        >
                            Fine
                        </div>
                    </div>
                );
            },
        },
    ];

    const onClose = () => {
        console.log('here')
        setOpen(false)
    }

    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">Players</div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={PlayerDetails.concat(actionColumn).concat(fineColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                    />
                </div>
            </div>
            {
                open &&
                <div onClick={onClose} className='overlay'>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className='modalContainer'
                    >
                        <div className='modalRight'>
                            <p className='closeBtn' onClick={onClose}>
                                X
                            </p>
                            <div className='content'>
                                <form onSubmit={handlePay}>
                                    <label for="payment">Payment Type</label>
                                    <select name="payment" id="payment" required onChange={(e) => setType(e.target.value)}>
                                        <option value="" selected disabled hidde>--- Choose an Option ---</option>
                                        <option value="Tax">Tax</option>
                                        <option value="fine">Fine</option>
                                    </select>
                                    {/* <input type="submit" value="Submit" /> */}
                                    <input className='inp' type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)} />
                                    <div className='btnContainer'>
                                        <button className='btnPrimary' type="submit">
                                            <span className='bold'>Send</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Pay_player 