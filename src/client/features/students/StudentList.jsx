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
  // Check if the current route is "/students" for pagination
  const isStudentsRoute = location.pathname === "/students";
  if (isLoading) {
    return <h2>Loading students...</h2>;
  }

  const handleSort = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "last-name") {
      navigate("/students/sortedbylastname");
    }
    if (e.target.value === "first-name") {
      navigate("/students");
    }
    if (e.target.value === "gpa") {
      navigate("/students/sortedbygpa");
    }
  };

  return isLoading ? (
    <h2>Loading students...</h2>
  ) : (
    <main>
      <div className="search-and-sort-container">
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <div>
          <label>Sort By:</label>
          <select id="sort-by" onChange={handleSort}>
            <option value="Please select"></option>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
            <option value="gpa">GPA</option>
          </select>
        </div>
      </div>
      <h2>Students:</h2>
      {isStudentsRoute ? (
        <PaginationLogic students={students} searchRegex={searchRegex} />
      ) : (
        <ul className="student-list">
          {[...students]
            .filter((student) =>
              (student.firstName + student.lastName).match(searchRegex)
            )
            .sort((a, z) => a.firstName.localeCompare(z.firstName))
            .map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
        </ul>
      )}
    </main>
  );
}
