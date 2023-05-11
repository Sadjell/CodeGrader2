import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authService";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


class LoginFormProfessor extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.setState((preValue) => {
      // Get the previous value of state
      return {
        ...preValue, // use the spread operator to get all the previous values of state
        errors: errors || {},
      };
    });
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data.email, data.password);
      await auth.login(data.email, data.password);
      // const { state } = this.props.location;
      window.location = "/professorCourses"; // state ? state.from.pathname : "/";
      console.log("in here");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <section className="glasscard container text-center" style={{width:'40%'}}>
        <div>
        <h4 style={{paddingTop:'3%'}}>Professor Login</h4>
          <form onSubmit={this.doSubmit}>
          <h6 style={{ marginTop: "2rem", paddingBottom:'5%' }}>
                Sign in to your account to continue.
              </h6>
            {this.renderInput("email", "Email")}
            <div style={{paddingTop:'5%'}}></div>
            {this.renderInput("password", "Password", "password")}
            <Link to={"/professorCourses"}>
                <button
                  className="btn btn-dark btn-lg"
                  style={{ marginTop: "4rem", width:'50%' }}
                  disabled={this.state.disableSubmit}
                >
                  Login
                </button>
              </Link>
          </form>
        </div>
      </section>
    );
  }
}

export default LoginFormProfessor;
