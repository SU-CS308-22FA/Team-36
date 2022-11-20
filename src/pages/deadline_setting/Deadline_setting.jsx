import "./deadline_setting.scss"
import Navbar from "../../components/navbar/Navbar"
import { updateDoc, doc } from "firebase/firestore";
import { DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { useState } from "react";
import { db } from "../../firebase";


/*************/
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

/*************'YYYY-MM-DDTHH:mm:ss.SSS[Z]'**/


const Deadline_setting = () => {

    const [value, setValue] = useState(dayjs('2022-01-01T00:00:00.000Z'));
    const [updated, setUpdated] = useState(false);
    const [udateError, setUpdateError] = useState(false);
    
    const setDeadline = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "/DocSubDeadlines/TheYearlyDeadline"), "DateTime", value.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'
            )).catch((error) => {
                console.log("Error: " + error);
                setUpdated(false);
                setUpdateError(true);
            });
        if (!udateError) {
            setUpdated(true);
            setTimeout(() => {
                setUpdated(false);
            }, 3000);
        }

    }

  return (
    <div className="deadline_setting">
      <Navbar/>
      <div className="deadline_settingContainer">
        <form onSubmit={setDeadline}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                label="Pick a date and time for t deadline"
                renderInput={(params) => <TextField {...params} />}
                value={value}
                onChange={(e) => {setValue(e);}}
                />
            </LocalizationProvider>
            <button disabled = {value.diff() < dayjs().diff()} type = "submit">Set Deadline</button>
            
            {value.diff() < dayjs().diff() && <span>Please pick a future date and time!</span>}
            {updated && <span>Deadline set successfully!</span>}

            {/* <h1>{value.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')}</h1> */}
        </form>
      </div>
    </div>
  )
}

export default Deadline_setting