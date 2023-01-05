import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./download_c.scss"
import Navbar from "../../components/navbar/Navbar";
import Datadownload_c from "../../components/datadownload_c/Datadownload_c"
/**/
const DownloadC = () => {
    const { doc } = useContext(AuthContext);
    console.log("DOC " + doc);

    const xx = 1;
    return (
        <div className="clubtoplayercom">
        <Navbar/>
        <Datadownload_c/>
      </div>
    );
}

export default DownloadC;
