import SearchTable from "../../components/tableWithSearch/searchTable"
import Navbar from "../../components/navbar/Navbar"
import "./Transfers.scss"


const Transfers = () => {
    return (
      <div className="transfers">
        <div className="transfersContainer">
            <Navbar/>
            <SearchTable />
        </div>
      </div>
    )
  }
  export default Transfers;