import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import NewStudent from "./NewStudent";
import Student from "./Student";
import { useGetStudentsQuery } from "./studentSlice";

import "./Students.less";

/** Main interface for user to interact with their tasks */
export default function Students() {
  const token = useSelector(selectToken);
  const { data: students, isLoading } = useGetStudentsQuery();

  if (!token) {
    return <p>You must be logged in to see your Students.</p>;
  }

  return (
    <div className="students">
      <h1>Students</h1>
      <h2>Add New Student</h2>
      <NewStudent />
      <h2>Your Students</h2>
      {isLoading && <p>Loading students...</p>}
      {students && (
        <ul>
          {students.map((student) => (
            <Student key={student.id} student={student} />
          ))}
        </ul>
      )}
    </div>
  );
}
