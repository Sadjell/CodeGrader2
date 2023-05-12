// TO-DO: Implement cards
// TO-DO: Implement add assignment
// TO-DO: Delete assignment in list after the text
// TO-DO: hrefs (all navigations)
// TO-DO: professor view course requests from student
import React, { useEffect, useState } from "react";
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {
  getCourse,
  deleteCourse,
  saveCourse,
  getCourseAssignment,
  getCourseAssignmentIds,
} from "../services/courseService";
import {
  getAssignment,
  getAssignments,
  deleteAssignment,
  saveAssignment,
  getAssignmentsByCourseId
} from "../services/assignmentService";
import { useParams } from "react-router-dom";
import Joi from "joi";
import ProfessorNavbar from "./ProfNavbar";
import ProfessorAssignmentCard from "./ViewAssignmentProf";
import { Link } from "react-router-dom";

const ProfessorAssignmentView = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [assignmentIds, setAssignmentIds] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentsHTML, setAssignmentsHTML] = useState(null);

  useEffect(() => {
    loadAssignments(assignments);
  }, [assignments])

  useEffect(() => {
    //gets the course by id
    async function fetchData() {
      const { data } = await getCourse(courseId);
      console.log(data);
      setCourse(data);
    }

    getAssignmentsByCourseId(localStorage.getItem("currentCourseId")).then((assignmentsIds) => {
      setAssignmentIds(assignments.data);

    });

    //gets the assignment ids from the course
    async function fetchAssignIdData() {
      const { data } = await getCourseAssignmentIds(courseId);
      console.log(data);
      setAssignmentIds(data);
    }

    //get assignment from each of the assignment ids from the course
    async function fetchAssignments() {
      assignmentIds.forEach((id) => {
        console.log("helloooo u");
        const data = getCourseAssignment(courseId, id);
        console.log(data);
        assignments.push(data);
      });
    }

    //fetchData();
    //fetchAssignIdData();
    //fetchAssignments();
  }, []);
  assignmentIds.forEach((id) => {
    console.log("helloooo u");
    const data = getCourseAssignment(courseId, id);
    console.log(data);
    assignments.push(data);
  });


  const loadAssignments = (assignmenList) => {
    if (assignmenList === null) {
      return null;
    }
    setAssignmentsHTML(
      assignmenList.map((assignment, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>
              <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
                <Card.Body>
                  <Card.Title style={{fontSize:'30px'}}>
                    <Button name={index} onClick={() =>{
                      //localStorage.setItem("currentIntakeId", intake._id);
                    } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{assignment.name}</Button>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        )
      }
    ))
    

  }

  // if (assignmentIds.length != 0) {
  //   //   let ids = [];
  //   //   ids.push(course._assignmentsId);
  //   //   console.log(ids[0]);
  //   for (let i = 0; i < assignmentIds.length; i++) {
  //     assignments.push(getAssignment(assignmentIds[i]));
  //     console.log(assignments);
  //     i++;
  //   }
  // }

  // console.log(assignments);
  const handleDelete = async (assignment) => {
    console.log(assignment);
    const newAssignments = assignments.filter((p) => p._id !== assignment._id);

    setAssignments(newAssignments);
    try {
      await deleteAssignment(assignment._id);
    } catch (ex) {
      console.log("delete exception");
      if (ex.respond && ex.respond.status === 404) {
        alert("Assignment has already been deleted !");
        setAssignments(assignments);
      }
    }
  };

  return (

    <div className="intake-wrapper">
    {/* Navbar */}
    <div>
    <ProfessorNavbar /></div>
  {/* Jumbotron */}
  <div className='p-5 text-center' style={{backgroundColor: '#6E9A35'}}>
    <h1 className='mb-3' style={{fontFamily: 'Bitter', color:'whitesmoke'}}>Approved Intakes</h1>
  </div>

    <div className="intake-body container" style={{paddingTop: "1%"}}>
      {assignmentsHTML}       
    </div>
  </div>
    

   
  );
};
export default ProfessorAssignmentView;


