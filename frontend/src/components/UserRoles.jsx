import React, { Component } from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './styles/userRoles.css';

class UserRoles extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div style={{height:'100%',width:'100%'}} className="" id="UserRolesScreen">
        <div className="container text-center" style={{alignContent:'center', gravity:'center', paddingTop:'12%',width:'30%'}}>
        <h1 style={{padding:'5%'}}>Code Grader 2.0</h1>
        <Card variant="outlined" className='border border-4 rounded-2' style={{borderColor:'#F58216'}}>
        <div id="loginForm" className='form-container text-center' style={{ height:'100%', opacity:'100%'}}>
            <div className="student-login-button" style={{padding: "7%"}}>
              <Link to={'/studentLogin'}>
              <Button
                type="submit"
                className="btn btn-dark btn-lg"
                style={{width:'70%',backgroundColor: 'grey'}}
                >Student Login</Button>
              </Link>
            </div>
            <div className="professor-login-button" style={{padding: "7%"}}>
              <Link to={'/professorLogin'}>
              <Button
                type="submit"
                className="btn btn-dark btn-lg"
                style={{width:'70%',backgroundColor: 'grey'}}
                >Professor Login</Button>
              </Link>
            </div>
        </div>
        </Card>
        </div>
      </div>
  )
      /*<div>

        <div className="col d-flex justify-content-center">
           <Container id='clientButtonContainer' fluid>
              
             <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
               <Card.Body>
                 <Card.Title style={{fontSize:'30px'}}>
                 <Link to={"/studentLogin"}>
                    <Button variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Student Login</Button>
                    </Link>
                    <Link to={"/professorLogin"}>
                      <Button variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Professor Login</Button>
                    </Link>
                    
                 </Card.Title>
               </Card.Body>
             </Card>
           </Container>
         </div>

      </div>

      

      /*
      <section className="glasscard">
        <div className="title" style={{ marginBottom: "3rem" }}>
          <h3 style={{ color: "black", marginRight: "2rem" }}>
            Which user are you?
          </h3>
          <h4
            style={{
              color: "black",
              marginTop: "1rem",
              marginRight: "2rem",
            }}
          >
            Select one option to continue.
          </h4>
        </div>
        <div className="cards">
          <div className="card">
            <img
              className="professorpfp"
              src="styles/images/professor.png"
              alt=""
            />
            <div className="card-info">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{ marginLeft: "2rem" }}>QU Professor</h3>
                <div className="enter">
                  <Link to={"/professorLogin"}>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#487cec",
                        marginLeft: "8.8rem",
                      }}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: "3rem" }}>
            <img
              className="studentpfp"
              src="styles/images/student.png"
              alt=""
            />
            <div className="card-info">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{ marginLeft: "2rem" }}>QU Student</h3>
                <div className="enter">
                  <Link to={"/studentLogin"}>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#487cec",
                        marginLeft: "10rem",
                      }}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */
  }
}

export default UserRoles;
