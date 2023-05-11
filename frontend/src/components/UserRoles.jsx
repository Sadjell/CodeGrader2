import React, { Component } from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class UserRoles extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (

      <div>

        <div className="col d-flex justify-content-center">
           <Container id='clientButtonContainer' fluid>
              <Card id='card1' className="text-center mx-auto" >
                 <Card.Body>
                    <Card.Title style={{fontSize:'30px'}}>

                    <Link to={"/studentLogin"}>
                    <Button variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px", color: "black"}}>Student Login</Button>
                    </Link>
                      
                    </Card.Title>
                 </Card.Body>
              </Card>

             <Card id='card3' className="text-center mx-auto" >
               <Card.Body>
                 <Card.Title style={{fontSize:'30px'}}>
                    <Link to={"/professorLogin"}>
                      <Button variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px", color: "black"}}>Professor Login</Button>
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
    );
  }
}

export default UserRoles;
