import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./download_d.scss"
import Navbar from "../../components/navbar/Navbar";
import document from './document.png'
const Download_document= () => {
    const { doc } = useContext(AuthContext);
    console.log("DOC " + doc);

    return (
        <div className="clubtoplayercom">
        <Navbar/>
      <header className="clubtoplayercom-header">
      <h2> You selected one file, click to download your file!</h2>          
      <img src={document}></img>

    
      <h1><a href={doc} target="_blank" download="myFile">Download file</a></h1>
  

       
      </header>
      </div>
    );
}

export default Download_document;
