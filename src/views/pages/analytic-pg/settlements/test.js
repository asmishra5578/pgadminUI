//import { MoreVertical, Edit, Trash } from "react-feather";
import { Table, Button, Card, Alert, Label, Input } from "reactstrap";
import React from "react";
import axios from "axios";
import SecureLS from "secure-ls";
import { CSVLink } from "react-csv";
import "../../../../CSS/operation.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Apiurl from "../../../../Constant/baseUrl";
const avatarGroupData1 = [
  {
    title: "Lilian",
    // img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Alberto",
    // img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Bruce",
    // img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData2 = [
  {
    title: "Diana",
    // img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Rey",
    // img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "James",
    // img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData3 = [
  {
    title: "Lee",
    // img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Mario",
    // img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Oswald",
    // img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData4 = [
  {
    title: "Christie",
    // img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Barnes",
    // img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Arthur",
    // img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

class Settlements extends React.Component {
  constructor() {
    super();
    this.state = {
      settlementlist: [],
      startDate: "",
      endDate: "",
      searchStartDate: "",
      searchEndDate: "",
      alertdisplay: "none",
      alertMessege: "",
    };
    this.getBaseUrl = new Apiurl();
  }
  async componentDidMount() {
    this.getSettlementlist();
  }
  searchStartdatehandle = (e) => {
    this.setState({
      startDate: e,
      searchStartDate: moment(e, "DDMMYYYY").format("DD MMM"),
    });
  };
  searchEnddatehandle = (e) => {
    if (this.state.startDate == "") {
      alert("Kindly first select start date");
    } else
      this.setState({
        endDate: e,
        searchEndDate: moment(e, "DDMMYYYY").format("DD MMM YYYY"),
      });
  };
  filteByDate = () => {
    this.setState({
      alertdisplay: "block",
      alertMessege: "Updating...",
    });
    var ls = new SecureLS();
    let uuid = ls.get("key1").uuid;
    let jwttoken = ls.get("key1").jwtToken;
    let fromDate = moment(this.state.startDate).format("DD-MM-YYYY");
    let toDate = moment(this.state.endDate).format("DD-MM-YYYY");

    axios({
      method: "GET",
      url: `${this.getBaseUrl.ApiBAseURL}/api/merchant/settlementDetailsDateFilter?uuid=${uuid}&dateFrom=${fromDate}&dateTo=${toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + jwttoken,
      },
    })
      .then((response) => {
        if (response.data.exception === "IDEAL_SESSION_EXPIRED") {
          alert("Session Expired");
          this.props.history.push("/");
        } else {
          console.log("getsettlement", response.data);
          if (response.data.hasOwnProperty("msg")) {
            alert("Issue in getting data:" + response.data.msg);
            this.props.history.push("/");
          } else {
            this.setState({
              settlementlist: response.data,
              alertdisplay: "block",
              alertMessege: "Updated Successfully",
            });
          }

          setTimeout(() => {
            this.setState({ alertdisplay: "none", alertMessege: "" });
          }, 3000);
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.props.history.push("/");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          this.props.history.push("/");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          this.props.history.push("/");
        }
      });
  };
  getSettlementlist() {
    var ls = new SecureLS();
    let uuid = ls.get("key1").uuid;
    let jwttoken = ls.get("key1").jwtToken;
    let fromDate = moment().subtract(1, "days").format("DD-MM-YYYY");
    let toDate = moment().format("DD-MM-YYYY");
    this.setState({
      alertdisplay: "block",
      alertMessege: "Loading...Please Wait...",
    });
    axios({
      method: "GET",
      url: `${this.getBaseUrl.ApiBAseURL}/api/merchant/settlementDetailsDateFilter?uuid=${uuid}&dateFrom=${fromDate}&dateTo=${toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + jwttoken,
      },
    }).then((response) => {
      if (response.data.exception === "IDEAL_SESSION_EXPIRED") {
        alert("Session Expired");
        this.props.history.push("/");
      } else {
        console.log("getSettleDetails", response.data);
        if (response.data.hasOwnProperty("msg")) {
          alert("Issue in getting data");
        } else {
          this.setState({ 
            alertdisplay: "block",
      alertMessege: "Updated Succesfully",
            settlementlist: response.data });
        }
      }
    });
  }
  updatedSettlement = () => {
    this.setState({
      alertdisplay: "block",
      alertMessege: "Updating...",
    });
    var ls = new SecureLS();
    let uuid = ls.get("key1").uuid;
    let jwttoken = ls.get("key1").jwtToken;
    let fromDate = moment().subtract(1, "days").format("DD-MM-YYYY");
    let toDate = moment().format("DD-MM-YYYY");

    axios({
      method: "GET",
      url: `${this.getBaseUrl.ApiBAseURL}/api/merchant/settlementDetailsDateFilter?uuid=${uuid}&dateFrom=${fromDate}&dateTo=${toDate}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + jwttoken,
      },
    }).then((response) => {
      if (response.data.exception === "IDEAL_SESSION_EXPIRED") {
        alert("Session Expired");
        this.props.history.push("/");
      } else {
        console.log("getSettleDetails", response.data);
        if (response.data.hasOwnProperty("msg")) {
          alert("Issue in getting data");
        } else {
          this.setState({ settlementlist: response.data });
        }
      }
    });
  };
  render() {
    return (
      <div>
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex" }}>
            <div>
              <h2> Settlement List</h2>
            </div>
            <div style={{ marginLeft: 10 }}>
              <Button color="primary" onClick={this.updatedSettlement}>
                Refresh Data
              </Button>
            </div>

            <div style={{ marginLeft: 10 }}>
              {/* <Button  color="success">Export Table</Button> */}
              <CSVLink
                data={this.state.settlementlist}
                filename="Settled.csv"
                style={{ color: "white" }}
              >
                <Button color="success" style={{}}>
                  Export Table
                </Button>
              </CSVLink>
            </div>
          </div>
        </Card>
        <div style={{ display: "flex", marginBottom: 10, marginTop: -20 }}>
          <div>
            <Label className="mr-1">Date Range From</Label>
            <br />
            <DatePicker
              className="form-control w-100"
              selected={this.state.startDate}
              onChange={this.searchStartdatehandle}
              peekNextMonth
              showMonthDropdown
              placeholderText="Date Range From"
              maxDate={new Date()}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Label className="mr-1">Date Range To</Label>
            <br />
            <DatePicker
              className="form-control w-100"
              selected={this.state.endDate}
              onChange={this.searchEnddatehandle}
              peekNextMonth
              showMonthDropdown
              // showYearDropdown
              placeholderText="Range To"
              minDate={this.state.startDate}
              maxDate={new Date()}
            />
          </div>

          <div style={{ marginTop: 20, marginLeft: 10 }}>
            <Button color="primary" onClick={this.filteByDate}>
              FILTER
            </Button>
          </div>
        </div>
        <div>
          <Alert color="success" style={{ display: this.state.alertdisplay }}>
            {this.state.alertMessege}
          </Alert>{" "}
        </div>
        <Table responsive className="transactiontable" bordered>
          <thead>
            <tr>
              <th>MerchantId</th>
              <th>TransactionAmount</th>
              <th>Settled Amount</th>
              <th>OrderID</th>
              <th>PaymentMode</th>
              <th>Settlement Status</th>
              <th>Settlement Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.settlementlist.length === 0 ? (
              <h3>No Data</h3>
            ) : (
              this.state.settlementlist.map((v) => {
                return (
                  <tr>
                    <td>{v.merchantId}</td>
                    <td>{v.trxamount}</td>
                    <td>{v.settle_amount_to_merchant}</td>
                    <td>{v.merchant_order_id}</td>
                    <td>{v.tr_type}</td>
                    <td>{v.settlement_status}</td>
                    <td>{v.settlement_date}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Settlements;