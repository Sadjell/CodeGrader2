import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserRoles from "./components/UserRoles";
//import LoginForm from "./components/LoginProf";
import ProfessorCourses from "./components/ViewCoursesProf";
import AddCourse from "./components/AddCourseView";
import ProfessorAssignmentView from "./components/ViewAssignmentProf";
import AddAssignment from "./components/AddAssignmentView";
import AddStudent from "./components/AddStudentView";
import StudentAssignmentView from "./components/ViewAssignmentStud";
import AddSubmission from "./components/SubmitAssignment";
import StudentSubmissionView from "./components/SubmissionViewStud";
import ProfessorSubmissionView from "./components/SubmissionViewProf";
import StudentCourses from "./components/ViewCoursesStud";
//import StudentRequestCourse from "./components/StudentRequestCourse";
import NoMatch from "./components/NoMatch.jsx";
import LoginFormProfessor from "./components/LoginProf";
import LoginFormStudent from "./components/LoginStud";
import { getCourses } from "./services/courseService";

//ToDo Refactor Router Paths, Include ids
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserRoles />} />
        <Route path="/professorLogin" element={<LoginFormProfessor />} />
        <Route path="/studentLogin" element={<LoginFormStudent />} />
        <Route
          path="/professorCourses/:courseId/professorAssignmentView/addAssignment"
          element={<AddAssignment />}
        />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/profAssignmentView" element={<ProfessorAssignmentView />} />
        <Route
          path="/professorCourses/:courseId"
          element={<ProfessorAssignmentView />}
        />
        <Route path="/professorCourses" element={<ProfessorCourses />} />
        <Route path="/addCourse" element={<AddCourse />} />

        <Route
          path="/professorCourses/:courseId/professorAssignmentView/:assignmentId"
          element={<ProfessorSubmissionView />}
        />

        

        <Route path="/studentCourses" element={<StudentCourses />} />
        <Route
          path="/studentCourses/:courseId"
          element={<StudentAssignmentView />}
        />
        <Route
          path="/studentCourses/:courseId/studentAssignmentView/:assignmentId"
          element={<StudentSubmissionView />}
        />
        <Route
          path="/studentCourses/:courseId/studentAssignmentView/:assignmentId/addSubmission"
          element={<AddSubmission />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  ); //<Route path="/requestCourse" element={<StudentRequestCourse />} />
}

export default App;
