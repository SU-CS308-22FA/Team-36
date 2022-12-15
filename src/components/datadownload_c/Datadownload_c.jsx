//import "./databroadcasting.scss";
import { DataGrid } from "@mui/x-data-grid";
import { download_cc_user } from "../../datadownload_c";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Datadownload_c = () => {

    const [data, setData] = useState([]);
  
    useEffect(() => {
     
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
      
        const fetchData = async () => {
        const docRef = doc(db, "users", user.uid);
        
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
       
          const q = query(collection(db, "users"), where("name", "==", docSnap.data().name)); 
  
          let list = []
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data()})
          });
          setData(list);
        } catch(err){
          console.log(err);
        }
  
        const unsub = onSnapshot(
          q,
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
        } else {
          console.log("No such document!");
        }
        
      }; 
      fetchData()
        } else {
          console.log("User is not logged in");
        }
      });
      
    }, []);
  
    console.log(data)
    const { docc } = useContext(AuthContext);
    const actionColumn = [
      {
        field: "action",
        headerName: "Download",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link  to="../download_d" style={{ textDecoration: "none" }}>Download
              </Link>

            </div>
          );
        },
      },
    ];
     
    return (
      <div className="noti_datatable">
        <div className="noti_datatableTitle">
        <h1>Available documents:</h1>
        </div>
        <DataGrid
          className="broadcasting_datagrid"
          rows={data}
          columns={download_cc_user.concat(actionColumn)}
          pageSize={3}
          rowsPerPageOptions={[1]}
          checkboxSelection
        />
      </div>
    );
  };

export default Datadownload_c;