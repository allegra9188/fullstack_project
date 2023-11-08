import { useState } from "react";
import StudentCard from "./StudentCard";
import StudentDetails from "./StudentDetails";
import { useGetStudentsQuery } from "./studentSlice";
import { Link, useNavigate } from "react-router-dom";

import "./Students.less";
import "./StudentList.scss";

// reference from Book Buddy
/** Main interface for user to interact with their tasks */
export default function Students() {
  const { data: students, isLoading } = useGetStudentsQuery();

  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const searchRegex = new RegExp(filter, "i");

  return isLoading ? (
    <h2>Loading students...</h2>
  ) : (
    <main>
      <br />
      <h2>Students:</h2>
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
        <button onClick={() => navigate("/students")}>First Name</button>
        <button onClick={() => navigate("/students/sortedbylastname")}>
          Last Name
        </button>
      </div>
      <br />
      <ul className="student-list">
        {[...students]
          .filter((student) =>
            (student.firstName + student.lastName).match(searchRegex)
          )
          .sort((a, z) => a.gpa.localeCompare(z.gpa))
          .map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
      </ul>
    </main>
  );
}
