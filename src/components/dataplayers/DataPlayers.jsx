import "./DataPlayers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { PlayersColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const DataPlayers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, "Players"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data()})
        });
        setData(list);
        console.log(list)
      } catch(err){
        console.log(err);
      }
    }; 

    fetchData()

    const unsub = onSnapshot(
      collection(db, "Players"),
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
  }, []);

  console.log(data)

  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Players
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={PlayersColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataPlayers;