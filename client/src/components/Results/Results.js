import React, { Component } from "react";
import "./Results.css";


class Results extends Component {
  renderJobs = props => {
    // if (this.props.jobs.length === 0) {
    //   return <h3> No Jobs found! </h3>;
    // }

    return (
    this.props.jobs.map(job => (
      <div className="row job-row">
        <div className="col">
          <p>{job.jobName}</p>
        </div>
        <div className="col">
          <p>{job.crewName}</p>
        </div>
        <div className="col">
          <p>{job.custAddress}</p>
        </div>
        <div className="col">
          <p>{job.jobDate}</p>
        </div>
        <div className="col">
          <p>{job.completed.toString()}</p>
        </div>
      </div>
    ))
    );
  };

  render() {
    return (
      <div className="text-center container background-region">
        <h3>Search Results</h3>
        <div className="row job-list-header">
          <div className="col">
            <p>Job Name</p>
          </div>
          <div className="col">
            <p>Job Crew </p>
          </div>
          <div className="col">
            <p>Address</p>
          </div>
          <div className="col">
            <p>Job Date</p>
          </div>
          <div className="col">
            <p>Completed?</p>
          </div>
        </div>
        <div className="container text-center border">{this.renderJobs()}</div>
      </div>
    ); //end return
  } //end render
} ///end Search

export default Results;
