import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { db} from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import './SendReq.scss';
//import Popup from 'reactjs-popup';
 
const SendReq = () => {
    const [wtype , setType] = useState('');
    const [title, setTitle] = useState('');
    const [from , setFrom] = useState('');
    const [sendTo , setSendTo] = useState('');
    const [content , setContent] = useState('');

    // function to update state of wtype with
    // value enter by user in form
    const handleType =(e)=>{
      setType(e.target.value);
    }
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
        "type": wtype,
        "Title": title,
        "SendFrom": from,
        "SendTo": sendTo,
        "content": content
      });
        alert('A form was submitted with type :"' + wtype +
        '" ,from :"'+from +'" and to :"' + sendTo + '"');
        setType("");
        setTitle("");
        setFrom("");
        setSendTo("");
        setContent("");
    }
  return (
    <div className="sendreq">
    <header className="sendreq-header">
    <form onSubmit={(e) => {handleSubmit(e)}}>
     {/*when user submit the form , handleSubmit()
        function will be called .*/}
    <h2> Federation Warning and Request Form </h2>
        <label >
          Type:
        </label><br/>
        <input type="text" placeholder="Warning or Request?" value={wtype} required onChange={(e) => {handleType(e)}} /><br/>
          { /*when user write in type input box , handleType()
              function will be called. */}
        <label >
          Title:
        </label><br/>
        <input type="text" placeholder="FFP, income statement, etc" value={title} required onChange={(e) => {handleTitle(e)}} /><br/>
          { /*when user write in title input box , handleTitle()
              function will be called. */}
        <label >
          From:
        </label><br/>
        <input type="text" placeholder="Your Name" value={from} required onChange={(e) => {handleFrom(e)}} /><br/>
            { /*when user write in from input box , handleFrom()
               function will be called. */}
        <label>
          To:
        </label><br/>
        <input type="text" placeholder="Which Club?" value={sendTo} required onChange={(e) => {handleSendTo(e)}} /><br/>
          {/* when user write in sendTo input box , handleSendTo()
              function will be called.*/}
        <label>
          Content:
        </label><br/>
        <input type="text" placeholder="Description" value={content} required onChange={(e) => {handleContent(e)}} /><br/>
              {/* when user write in content input box ,
                  handleContent() function will be called.*/}
        <input type="submit" value="Submit"/>
      </form>
    </header>
    </div>
  );
}
 
export default SendReq;