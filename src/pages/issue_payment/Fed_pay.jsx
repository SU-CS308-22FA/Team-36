import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import './popup.css'
import "./fed_pay.scss";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Clubs } from "../../datatablesource";

const Fed_pay = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [admin, setAdmin] = useState();
    const [open, setOpen] = useState(false);
    const [club, setClub] = useState();
    const [type, setType] = useState();
    const [amount, setAmount] = useState();

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
                // console.log(data)
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
                //here
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
        console.log(param.name, ' it is here')
        navigate("/pay_fed_player/" + param.name)
    }

    const openForm = (club) => {
        setOpen(true)
        setClub(club.name)
        console.log(club.name)
    }

    /**
     * Select player to add to national team. It sends a notification to the player.
     * @param {json} player 
     */
    const handlePay = async (e) => {
        // console.log()
        //here
        console.log(type, amount, admin.email, club)
        e.preventDefault();
        try {
            await addDoc(collection(db, "FinesToClubs"), {
                "type": type,
                "fines": amount,
                "from": admin.email,
                "to": club
            });
            alert("Payment alert sent to " + club)
        } catch (err) {
            console.log(err);
        }
        setOpen(false)
    }

    const actionColumn = [
        {
            field: "national",
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
                    <div className="datatableTitle">Clubs</div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={Clubs.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        onRowDoubleClick={(param) => navigateTo(param.row)}
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
                                        <option value= "" selected disabled hidde>--- Choose an Option ---</option>
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

export default Fed_pay;