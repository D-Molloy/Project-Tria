import React, { Component } from "react";
import CreateJob from "../../components/Create/CreateJob";
import Notifications, { notify } from "react-notify-toast";
import "./Create.css";
import API from "../../utils/API";

class Create extends Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }

  constructor(props) {
    super(props);

    this.state = {
      jobDate: "",
      crewName: "",
      crewMembers: "",
      jobName: "",
      custPhone: "",
      custAddress: "",
      custCity: "",
      custState: "",
      jobDescription: "",
      estimatedJobTime: "",
      crewNameDB: "",
      jobs: [],
      crews: []
    };

    this.addCrew = this.addCrew.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  clearForm() {
    this.setState({
      jobDate: "",
      crewName: "",
      crewMembers: "",
      jobName: "",
      custPhone: "",
      custAddress: "",
      custCity: "",
      custState: "",
      jobDescription: "",
      estimatedJobTime: "",
      crewNameDB: ""
    });
  }

  componentDidMount() {
    this.loadCrews();
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = () => {
    event.preventDefault();

    // create the string used in the google maps href
    let linkStreet = this.state.custAddress.replace(/\s|\.|,|-/g, "+");
    let linkCity = this.state.custCity.replace(/\s|\.|,|-/g, "+");
    let linkAddress = linkStreet + "+" + linkCity + "+" + this.state.custState;

    ///create the string used in the to display the address
    let displayAddress =
      this.state.custAddress +
      ", " +
      this.state.custCity +
      ", " +
      this.state.custState;

    let newJob = {
      jobDate: this.state.jobDate,
      crewName: this.state.crewName,
      crewMembers: this.state.crewMembers,
      jobName: this.state.jobName,
      custPhone: this.state.custPhone,
      custAddress: displayAddress,
      linkAddress: linkAddress,
      estimatedJobTime: this.state.estimatedJobTime,
      jobDescription: this.state.jobDescription
    };

    let myColor = { background: "#F58119", text: "#FFFFFF" };
    API.saveJob(newJob)
      .then(
        res => console.log(res),
        notify.show("Job Created!", "custom", 4000, myColor),
        this.clearForm()
      )
      .catch(err => console.log(err));
  };

  loadCrews = () => {
    API.getCrews()
      .then(res => {
        this.setState({ crews: res.data });
      })
      .catch(err => console.log(err));
  };

  addCrew = () => {
    let myColor = { background: "#F58119", text: "#FFFFFF" };
    API.saveCrew({
      crewNameDB: this.state.crewNameDB
    })
      .then(
        res => this.loadCrews(),
        notify.show("Crew added!", "custom", 4000, myColor)
      )
      .catch(err => console.log(err));
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container text-center">
        {isAuthenticated() && (
          <div>
            <div className="main">
              <Notifications />
            </div>
            <div className="nav-div">
              <a href="/manager/search/" className="btn btn-brown navigation">
                <i className="glyphicon glyphicon-search " />
                <span className="button-text"> Search Jobs</span>
              </a>
              <a href="/crew/" className="btn btn-brown navigation">
                <i className="glyphicon glyphicon-inbox" />
                <span className="button-text"> Crew Page</span>
              </a>
              <a
                href="#"
                className="btn btn-brown navigation"
                onClick={this.login.bind(this)}
              >
                <i className="glyphicon glyphicon-log-out" />
                <span className="button-text"> Log Out</span>
              </a>
            </div>
            <h1 className="page-title-text">Create Job</h1>
            <br />
            <CreateJob
              crews={this.state.crews}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              addCrew={this.addCrew}
              {...this.state}
            />
          </div>
        )}
        {!isAuthenticated() && (
          <div className="login-div">
            <h1 id="main-title">Welcome to Crewify!</h1>
            <br />
            <br />
            <button
              className="btn btn-lg login-button"
              style={{ cursor: "pointer" }}
              onClick={this.login.bind(this)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    );
  }
} //end class

export default Create;
