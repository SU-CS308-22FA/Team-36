import "./clubpay.scss"
import Navbar from "../../components/navbar/Navbar"
import card from './card.png'

const ClubPay = () => {

    return (
        <div >
            <div >
                <Navbar />
                <div className="login">
                    <img src={card} alt="" />
                    <div className="grid">
                        <label>Card Number</label>
                        <input type="text" />
                        <label>Full name</label>
                        <input type="text" />
                        <label>CVS</label>
                        <input type="text" />
                        <label>Expiry</label>
                        <input type="text" />
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClubPay