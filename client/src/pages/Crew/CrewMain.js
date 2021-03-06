import React, { Component } from "react";
import API from "../../utils/API";
import MyJobs from "../../components/Jobs/MyJobs";
import "./CrewMain.css";

class CrewMain extends Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  constructor(props) {
    super(props);

    this.state = {
      actualJobTime: "",
      jobNotes: "",
      completed: "",
      _id: "",
      jobs: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getJobs();
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

  handleFormSubmit = event => {
    event.preventDefault();

    let jobData = {
      actualJobTime: this.state.actualJobTime,
      jobNotes: this.state.jobNotes,
      completed: true
    };

    let id = event.target.value;

    API.updateJob(id, jobData)
      .then(res => this.getJobs())
      .catch(err => console.log(err));
  };

  getJobs() {
    API.findOpenJobs()
      .then(res => {
        this.setState({ jobs: res.data });
      })
      .catch(err => console.log(err));
  }

  getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container text-center">
        {isAuthenticated() && (
          <div>
            <div className="nav-div">
              <a href="/manager/search/" className="btn btn-brown navigation">
                <i className="glyphicon glyphicon-search" />
                <span className="button-text"> Search Jobs</span>
              </a>
              <a href="/manager/create/" className="btn btn-brown navigation">
                <i className="glyphicon glyphicon-pencil" />
                <span className="button-text"> Create Job</span>
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
            <h1 className="page-title-text">Open Jobs: {this.getDate()}</h1>
            <br />
            <br />
            {this.state.jobs.length === 0 && (
              <h3 className="page-title-text">
                <i>All Jobs Complete!</i>
              </h3>
            )}
            <MyJobs
              jobs={this.state.jobs}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
} //end class login

export default CrewMain;
