import "./databroadcasting.scss";
import { DataGrid } from "@mui/x-data-grid";
import { broadcasting_user } from "../../dataBroadcasting";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged  } from "firebase/auth";


const Databroadcasting = () => {

    const [data, setData] = useState([]);
  
    useEffect(() => {
     
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
      
        const fetchData = async () => {
        const docRef = doc(db, "users", user.uid);
        
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
       
          const q = query(collection(db, "ClubPositions"), where("Club name", "==", docSnap.data().name)); 
  
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
          Share of the broadcasting
        </div>
        <DataGrid
          className="broadcasting_datagrid"
          rows={data}
          columns={broadcasting_user}
          pageSize={9}
          rowsPerPageOptions={[1]}
          checkboxSelection
        />
      </div>
    );
  };

export default Databroadcasting;