import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./Fines.scss"
import Navbar from "../../components/navbar/Navbar";
import Datafinestoplayers from "../../components/dataFinesToPlayers/Datafinestoplayers"

const Fines= () => {
    const { doc } = useContext(AuthContext);
    console.log("DOC " + doc);

    return (
        <div className="clubtoplayercom">
        <Navbar/>
        <Datafinestoplayers/>
      </div>
    );
}

export default Fines;
