import "./percDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const PercDatatable = () => {

  const [data, setData] = useState([]);

  const Clubcolumns = [
    {
      field: "Club name",
      headerName: "Club Name",
      width: 150,
    },
    {
      field: "Position",
      headerName: "Position",
      width: 150,
    },
    {
      field: "Equal percentage",
      headerName: "Equal percentage",
      width: 150,
    },
    {
      field: "Top percentage",
      headerName: "Top percentage",
      width: 150,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, "ClubPositions"));
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
      collection(db, "ClubPositions"),
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
    <div className="percDatatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={Clubcolumns}
        pageSize={11}
        rowsPerPageOptions={[11]}
        
      />
    </div>
  );
};

export default PercDatatable;