import { DataGrid } from "@mui/x-data-grid";
import { transfers_userColumns } from "../../trasnfersDatatable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import * as React from 'react';
import './searchTable.scss'


const SearchTable = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, "playersTransfer"));
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
      collection(db, "playersTransfer"),
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <Link to="/sendoffer" style={{ textDecoration: "none" }}>
              <div className="offerButton">Send Transfer Offer</div>
            </Link>
          </div>
        );
      },
    },
  ];

  console.log(data)

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const dataSearch = data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())}
        );

  console.log(dataSearch)
   
  return (
    <>

    <label htmlFor="search">
        Search Player: 
        <input id="search" type="text" placeholder="Enter Player Name..." onChange={handleSearch} />
      </label>

    <div className="search_datatable">
      <div className="search_datatableTitle">
        Player Transfer System
      </div>
      <DataGrid
        className="search_datagrid"
        rows={dataSearch}
        columns={transfers_userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
    </>
  );
};

export default SearchTable;





/*<div
className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>*/



             /*const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };*/