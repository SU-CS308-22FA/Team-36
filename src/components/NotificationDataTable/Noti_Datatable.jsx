import "./Noti_Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { noti_userColumns } from "../../notificationsDatatable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
//import { FirebaseAuth } from '@firebase/auth-types'
import { auth, db } from "../../firebase";

const Noti_Datatable = () => {

  const user = auth.currentUser;
  const [data, setData] = useState([]);

  const clubRef = collection(db, "requests");
  //const clubName = collection(db, "users");
  //const q = query(clubRef, where("SendTo", "==", user.uid));

  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
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
      collection(db, "requests"),
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
    <div className="noti_datatable">
      <div className="noti_datatableTitle">
        Alerts and Notifications
      </div>
      <DataGrid
        className="noti_datagrid"
        rows={data}
        columns={noti_userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Noti_Datatable;