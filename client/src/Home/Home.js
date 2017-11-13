import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  state = {
    jobs: [],
    crew: "",
    jobName: "",
    phoneNumber: "",
    address: "",
    estimatedJobTime: "",
    jobDescription: ""
  };

  componentDidMount() {
    this.loadJobs();
  }

  loadJobs = () => {
    API.getJobs()
      .then(res =>
        this.setState({ jobs: res.data, crew: "", jobName: "", phoneNumber: "", address: "", estimatedJobTime: "", jobDescription: "" })
      )
      .catch(err => console.log(err));
  };

  deleteJob = id => {
    API.deleteJob(id)
      .then(res => this.loadJobs())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.crew && this.state.jobName && this.state.phoneNumber && this.state.address && this.state.estimatedJobTime && this.state.jobDescription) {
      API.saveJob({
        crew: this.state.crew,
        jobName: this.state.jobName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        estimatedJobTime: this.state.estimatedJobTime,
        jobDescription: this.state.jobDescription
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              
              <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="crew"
                placeholder="Crew (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="jobName"
                placeholder="Name of Job (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="phoneNumber"
                placeholder="Phone Number (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Adress (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="estimatedJobTime"
                placeholder="Estimated Job Time (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="jobDescription"
                placeholder="Description of Job (Optional)"
              />
              <FormBtn
                disabled={!(this.state.crew && this.state.jobName && this.state.phoneNumber && this.state.address && this.state.estimatedJobTime && this.state.jobDescription)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
