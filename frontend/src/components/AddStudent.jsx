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
        <section className="glasscard container text-center" style={{width:'40%'}}>
          <form>
            <div className="form-group" style={{ paddingBottom: "2rem" }}>
              <h4>Add Student</h4>
              <h6 style={{ marginTop: "2rem" }}>
                Please input the following information to add a student.
              </h6>
              <label for="name" style={{ paddingTop: "2rem" }}>
                Student Name
              </label>
              <input
                type="text"
                className="form-control container text-center"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Name"
                style={{ width: "15rem" }}
              />
              <label for="email" style={{ paddingTop: "2rem" }}>
                Student Email
              </label>
              <input
                type="text"
                className="form-control container text-center"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Email"
                style={{ width: "15rem" }}
              />
              <label for="password" style={{ paddingTop: "2rem" }}>
                Student Password
              </label>
              <input
                type="text"
                className="form-control container text-center"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Student Password"
                style={{ width: "15rem" }}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-lg">
              <NavLink className="nav-link" to="/professorCourses">
                Add Student
              </NavLink>
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default AddStudent;
