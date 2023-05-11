// TO-DO: Implement connection to database where the input of the form meet the schema requirements and course is added
// TO-DO: hrefs (all navigations)
import React, { Component } from "react";
import Joi from "joi";
import ProfessorNavbar from "./ProfessorNavbar";
import { NavLink } from "react-router-dom";

class AddStudent extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div>
        <ProfessorNavbar />
        <section className="glasscard">
          <form>
            <div className="form-group" style={{ paddingBottom: "2rem" }}>
              <h4>Create New Student</h4>
              <h6 style={{ marginTop: "2rem" }}>
              </h6>
              <label for="name" style={{ paddingTop: "2rem" }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Name"
                style={{ width: "15rem", marginLeft: "8rem" }}
              />
              <label for="email" style={{ paddingTop: "2rem" }}>
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Email"
                style={{ width: "15rem", marginLeft: "8rem" }}
              />
              <label for="password" style={{ paddingTop: "2rem" }}>
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Password"
                style={{ width: "15rem", marginLeft: "8rem" }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <NavLink className="nav-link" to="/professorCourses">
                Submit
              </NavLink>
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default AddStudent;
