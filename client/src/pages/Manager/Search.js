import React, { Component } from "react";
import SearchInput from "../../components/Search/SearchInput";
import Results from "../../components/Results/Results";
import API from "../../utils/API";
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';

//  const moment = extendMoment(Moment);

class Search extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      crewName: "",
      startDate: "",
      endDate: "",
      jobName: "",
      jobs: [],
      crews: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadJobs = this.loadJobs.bind(this);
    // this.loadCrews = this.loadCrews.bind(this);
  }

  componentDidMount() {
    this.loadCrews();
  }

  //component did mount to load getCrews()

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  filterDate = () => {
    const start = this.state.startDate;
    const end = this.state.endDate;
    // const range = moment().range(start, end);

    console.log(start);

    let jobsCopy = this.state.jobs;
    // let jobsCopyDate = this.state.jobs.jobDate
    console.log("This is the jobs copy", jobsCopy);

    let newOne = jobsCopy.filter(
      jobCopy => (jobCopy.jobDate >= start && jobCopy.jobDate <= end) === true
    );
    console.log("This is the jobs copy after filter", newOne);
    this.setState({
      jobs: newOne
    });
  };

  ///should take parameters from the searchinput to use in the query
  //bind this in the constructor
  loadJobs = crewQuery => {
    API.getJobByCrewName(crewQuery)
      // .then(res => console.log(res.data))
      .then(res => {
        this.setState({ jobs: res.data }, () => {
          console.log("This.state.jobs from Results.js", this.state.jobs);
          this.filterDate();
        });
      })
      .catch(err => console.log(err));
  };

  //this funciton is going to get crews from the DB will be
  //props for the drop down.

  loadCrews = () => {
    API.getCrews()
      // .then(res => console.log(res.data))
      .then(res => {
        this.setState({ crews: res.data }, () => {
          console.log("This.state.crews", this.state.crews);
        });
      })
      .catch(err => console.log(err));
  };

  //this.state.{key} is set as parameters used in load jobs
  handleFormSubmit = event => {
    let crewQuery = this.state.crewName;
    // event.preventDefault();
    // alert("Form Submitted");
    this.loadJobs(crewQuery);
  };

  render() {
    return (
      <div className="container text-center">
        <h1>Search Jobs</h1>
        <br />
        <a href="/manager/" className="btn btn-info">
          Back
        </a>
        <br />
        <SearchInput
          crews={this.state.crews}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <br />
        <br />
        <Results jobs={this.state.jobs} />
        <br />
        <br />
      </div>
    );
  }
} //end class

export default Search;
