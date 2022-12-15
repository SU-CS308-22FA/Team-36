import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./national.scss";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Clubs } from "../../datatablesource";

const National = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();

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
    }, []);

    const navigateTo = (param) => {
        console.log(param.name)
        navigate("/national/" + param.name)
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
                        columns={Clubs}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        onRowClick={(param) => navigateTo(param.row)}
                    />
                </div>
            </div>
        </div>
    )
}

export default National;