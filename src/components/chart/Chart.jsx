import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const data = [
  { name: "2019", Total: 0 },
  { name: "2020", Total: 0 },
  { name: "2021", Total: 0 },
  { name: "2022", Total: 0 },
  { name: "2023", Total: 0 },
];

const Chart = ({ aspect, title }) => {

  const [allData, setData] = useState([]);
  const [alternate, setAlt] = useState([]);

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchData = async () => {
            const docRef = doc(db, "users", user.uid);
            let docSnap = await getDoc(docRef);
           
          if (docSnap.exists()) {

            const q = query(collection(db, "profit5years"), where("name", "==", docSnap.data().name));

            let list = []
            try {
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
              });
              setData(list);
            } catch (err) {
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
        const REfetchData = async () => {
          const docRef = doc(db, "users", user.uid);
          let docSnap = await getDoc(docRef);
         
        if (docSnap.exists()) {

          const q = query(collection(db, "clubFinances"), where("name", "==", docSnap.data().name));

          let list = []
          try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() })
            });
            setAlt(list);
          } catch (err) {
            console.log(err);
          }

          const unsub = onSnapshot(
            q,
            (snapShot) => {
              let list = [];
              snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
              });
              setAlt(list);
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
        REfetchData()
       } else {
         console.log("User is not logged in");
       }
     });

  }, []);

let count = 0;

data.forEach((item) => {
    allData.map((one) => {
      alternate.map((two) => { 
      if (count == 0) {item.Total = one.year19; count++;}
      else if (count == 1) {item.Total = one.year20; count++}
      else if (count == 2) {item.Total = one.year21; count++}
      else if (count == 3) {item.Total = one.year22; count++}
      else {
        
        if(one.year23 == 0){
          item.Total = two.net;
        } else {item.Total = one.year23;}
        }})
   })
    
})

console.log(data);

  return (
    <div className="chart">
      <div className="title">{title}
      <p className="desc">The graph starts from 2019</p>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default Chart;