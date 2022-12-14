import { DataGrid } from "@mui/x-data-grid";
import { transfers_userColumns } from "../../trasnfersDatatable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import * as React from 'react';
import './GSTable.scss'



const GSTable = () => {

  //const q = query(collection(db, "playersTransfer"), where("currentClub", "==", "Galatasaray")); 
  const q = query(collection(db, "users"), where("role", "==", "Player")); 
  const qr = query(q, where("currentClub", "==", "Galatasaray"));

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(qr);
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
      qr,
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
      width: 500,
      // renderCell: () => {
      //   return (
      //    // data.map((offer) => {
      //       <div className="cellAction">
      //         <Link to="/sendoffer" style={{ textDecoration: "none" }}>
      //           <div className="offerButton">Send Transfer Offer To Club</div>
      //         </Link>
      //         <Link to="/contractproposal" style={{ textDecoration: "none" }}>
      //           <div className="contractButton">Send a Contract Proposal To Player</div>
      //         </Link>

      //       </div>
      //    // })
      //   );
      // },
      renderCell: () => {
        return (
          // data.map((offer) => {

          //   <div className="buttonSet">

          //   <Link to="/sendoffer" style={{ textDecoration: "none" }}>
          //     <button className="sendOffer">Send Offer To Club</button>
          //   </Link>
          //   <Link to="/contractproposal" style={{ textDecoration: "none" }}>
          //     <button className="sendContract" disabled={offer.decision == "AWAITING DECISION"}>Send Contract Proposal To Player</button>
          //   </Link>
          // </div>
          // })

            <div className="buttonSet">

            <Link to="/sendoffer" style={{ textDecoration: "none" }}>
              <button className="sendOffer">Send Offer To Club</button>
            </Link>
            <Link to="/contractproposal" style={{ textDecoration: "none" }}>
              <button className="sendContract" >Send Contract Proposal To Player</button>
            </Link>
          </div>

        )
      }
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
        Galatasaray Players
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

export default GSTable;