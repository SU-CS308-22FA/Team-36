import React from 'react';
import './GSCard.scss';
import { Link } from "react-router-dom";


const GSCard = ({title, imageURL, body}) => {

    return(
        <div className= 'card-container'>
            <div className='image-container'>
                <img src= {imageURL} alt=''/>
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    <h3>{title}</h3>
                </div>
                <div className='card-body'>
                    <p>{body}</p>
                </div>
            </div>
            
            <div className='btn'>
            <Link to="/galatasarayplayers" style={{ textDecoration: "none" }}>
                <button>
                    <a>
                        View Players
                    </a>
                </button>
            </Link>
                
            </div>
        </div>
    )

}

export default GSCard;