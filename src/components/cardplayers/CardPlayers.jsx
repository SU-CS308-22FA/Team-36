import React, { Component }  from 'react';
import "./CardPlayers.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import { db, ref, onValue} from "firebase/firestore";
const CardPlayers = () => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    var team = "Fenerbahce";
    return(
        <div className="CardPlayers">
    <header className="clubtoplayercom-header">
     {/*when user submit the form , handleSubmit()
        function will be called .*/}
    <h2> {team}</h2>
        <label >
        here put Name and Surname of the player from database
        </label><br/>
        <label >
        here put Contract expiration from database
        </label><br/>
        <label >
        here put Salary proposal from database
        </label><br/>
        <a href="#" className="card-link">contract renewals/ </a>
        <a href="#" className="card2-link">fines</a>
    </header>
    </div>
    );
}
      /*  <div className="cardPlayers" style={{width: '18rem',textAlign: 'center',alignItems: 'center'}}>
  <div className="card-body">
    <h5 className="card-title">Joao Pedro</h5>
    <h6 className="card-subtitle mb-2 text-muted">Fenerbahce</h6>
    <p className="card-text">Contract expiration: 11/10/2024 Salary: 250000</p>
    <a href="#" className="card-link">contract renewals/ </a>
        <a href="#" className="card2-link">fines</a>
  </div>
</div>*/
export default CardPlayers;