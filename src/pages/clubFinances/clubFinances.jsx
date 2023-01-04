import ClubSidebar from "../../components/clubSidebar/ClubSidebar";
import Navbar from "../../components/navbar/Navbar";
import "./clubFinances.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";

const ClubFinancesPage = () => {
  return (
    <div className="home">
      <ClubSidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="FFP" />
          <Widget type="transfers" />
          <Widget type="stadiumFaci" />
          <Widget type="finesTaxes" />
        </div>
        <div className="widgetsRevenue">
            <Widget type="transferProfit" />
            <Widget type="ticketSales" />
            <Widget type="shirtSales" />
            <Widget type="prizes" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="NET Profit Over Last 5 Years" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transfers</div>
          <Link to="/transfersystem" style={{ textDecoration: "none" }}><button className="toTS"> Go to Transfer System</button></Link>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default ClubFinancesPage;