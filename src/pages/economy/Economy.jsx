import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./Economy.scss"
import Navbar from "../../components/navbar/Navbar";

const Economy= () => {
    const { doc } = useContext(AuthContext);
    console.log("DOC " + doc);

    return (
        <div className="clubtoplayercom">
        <Navbar/>
        
      </div>
    );
}

export default Economy;
