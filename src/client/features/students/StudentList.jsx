// StudentList.jsx
import React, { useState } from "react";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import { useGetStudentsQuery } from "./studentSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PaginationLogic from "./PaginationLogic";

import "./Students.less";
import "./StudentList.scss";

/** Main interface for user to interact with their tasks */
export default function Students() {
  const { data: students, isLoading } = useGetStudentsQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const searchRegex = new RegExp(filter, "i");

  if (isLoading) {
    return <h2>Loading students...</h2>;
  }

  // Check if the current route is "/students" for pagination
  const isStudentsRoute = location.pathname === "/students";

  return (
    <main>
      <br />
      <form>
        <input
          type="text"
          placeholder="Search Student..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      <button>
        <Link to="/students/add">Add Student</Link>
      </button>
      <div className="sortBy-container">
        <p>Sort by:</p>
        <button onClick={() => navigate("/students/sortedbygpa")}>GPA</button>
        <button onClick={() => navigate("/students/sortedbylastname")}>
          Last Name
        </button>
      </div>
      <br />
      <h2>Students:</h2>
      {isStudentsRoute ? (
        <PaginationLogic students={students} searchRegex={searchRegex} />
      ) : (
        <ul className="student-list">
          {[...students]
            .filter((student) => (student.firstName + student.lastName).match(searchRegex))
            .sort((a, z) => a.firstName.localeCompare(z.firstName))
            .map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
        </ul>
      )}
    </main>
  );
}
