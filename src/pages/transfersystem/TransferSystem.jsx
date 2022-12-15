import React from 'react';
import GSCard from '../../components/GalatasarayCard/GSCard'
import FBCard from '../../components/FenerbahceCard/FBCard';
import TSNavbar from '../../components/TSnavbar/TSNavbar';
import TSSidebar from '../../components/TSsidebar/TSSidebar';
import './TransferSystem.scss'

function TransferSystem() {

    return(
        <div className='TransferSystemHome'>
            <TSSidebar/>
            <div className= 'TransferSystem'>
                <TSNavbar/>
                <div className='inside'>

                    <GSCard 
                        title='GALATASARAY'
                        imageURL='https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Galatasaray_Sports_Club_Logo.svg/687px-Galatasaray_Sports_Club_Logo.svg.png'
                        body='Please click on VIEW PLAYERS button to see the list of players that play for GALATASARAY'
                    />
                    

                    <FBCard 
                        title='FENERBAHCE'
                        imageURL='https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Fenerbah%C3%A7e.svg/1200px-Fenerbah%C3%A7e.svg.png'
                        body='Please click on VIEW PLAYERS button to see the list of players that play for FENERBAHCE'
                    />
                </div>

            </div>
        </div>
    )

}

export default TransferSystem;