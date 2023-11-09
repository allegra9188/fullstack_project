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

  return isLoading ? (
    <h2>Loading students...</h2>
  ) : (
    <main>
      <h1>Students</h1>
      <form>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
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
