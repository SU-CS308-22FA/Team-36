import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { db} from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import './club_req.scss';
import { TextArea } from '@react-ui-org/react-ui';
import Navbar from '../../components/navbar/Navbar';
 
const Club_req = () => {
    const [wtype , setType] = useState('');
    const [title, setTitle] = useState('');
    const [from , setFrom] = useState('');
    const [sendTo , setSendTo] = useState('');
    const [content , setContent] = useState('');


    // function to update state of title with
    // value enter by user in form
    const handleTitle =(e)=>{
      setTitle(e.target.value);
    }
    // function to update state of from with value
    // enter by user in form
    const handleFrom =(e)=>{
      setFrom(e.target.value);
    }
    // function to update state of sendTo with value
    // enter by user in form
    const handleSendTo =(e)=>{
      setSendTo(e.target.value);
    }
      // function to update state of content with
      // value enter by user in form
    const handleContent =(e)=>{
      setContent(e.target.value);
    }
    // below function will be called when user
    // click on submit button .
    const handleSubmit = async (e)=>{
      e.preventDefault();
      await addDoc(collection(db, "requests"), {
        "type": "Request from club",
        "Title": title,
        "SendFrom": from,
        "SendTo": "Federation Representative",
        "content": content
      });
        alert('A form was submitted with type :"' + wtype +
        '" ,from :"'+from +'" and to :"' + sendTo + '"');
        setTitle("");
        setFrom("");
        setSendTo("Federation Representative");
        setContent("");
    }



  return (
    <div className="club_req">
        
    <header className="club_req-header">
      <Navbar/>
    <form onSubmit={(e) => {handleSubmit(e)}}>
     {/*when user submit the form , handleSubmit()
        function will be called .*/}
    <h2> Request to Federation </h2>
            { /*when user write in type input box , handleType()
              function will be called. */}
        <label >
          Title:
        </label><br/>
        <input type="text" placeholder="Title for your request" value={title} required onChange={(e) => {handleTitle(e)}} /><br/>
          { /*when user write in title input box , handleTitle()
              function will be called. */}
        <label >
          From:
        </label><br/>
        <input type="text" placeholder="Your Name" value={from} required onChange={(e) => {handleFrom(e)}} /><br/>
            { /*when user write in from input box , handleFrom()
               function will be called. */}
        <label>
          Your request:
        </label><br/>
        <TextArea type="text" placeholder=" Please type your request here..." 
         required cols={50} rows={6} value={content} onChange={(e) => {handleContent(e)}} />
          <br/>
              {/* when user write in content input box ,
                  handleContent() function will be called.*/}
        <button type="submit" value="Submit"> Submit </button>
      </form>
    </header>
    </div>
  );
}
 
export default Club_req;