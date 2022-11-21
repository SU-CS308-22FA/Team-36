import "./Noti_Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { noti_userColumns } from "../../notificationsDatatable";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged  } from "firebase/auth";



const Noti_Datatable = () => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
   
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
    
      const fetchData = async () => {
      const docRef = doc(db, "users", user.uid);
      
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
     
        const q = query(collection(db, "requests"), where("SendTo", "==", docSnap.data().name)); 

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