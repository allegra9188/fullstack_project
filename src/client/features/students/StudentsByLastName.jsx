import { useState } from "react";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import { useGetStudentsQuery } from "./studentSlice";
import { useNavigate } from "react-router-dom";

import "./Students.less";
import "./StudentList.scss";

// reference from Book Buddy
/** Main interface for user to interact with their tasks */
export default function Students() {
  const { data: students, isLoading } = useGetStudentsQuery();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const searchRegex = new RegExp(filter, "i");

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
          <label>Sort By</label>
          <select id="sort-by" onChange={handleSort}>
            <option value="Please select"></option>
            <option value="first-name">First Name</option>
            <option value="last-name">Last Name</option>
            <option value="gpa">GPA</option>
          </select>
        </div>
      </div>
      <h1>Students</h1>
      <ul className="student-list">
        {[...students]
          .filter((student) =>
            (student.firstName + student.lastName).match(searchRegex)
          )
          .sort((a, z) => a.lastName.localeCompare(z.lastName))
          .map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
      </ul>
    </main>
  );
}
