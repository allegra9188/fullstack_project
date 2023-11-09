import { Link } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useEditStudentMutation,
  useGetStudentQuery,
} from "./studentSlice";

// A Student Card displays a brief preview of the Student in StudentList

export default function StudentCard({ student }) {
    
    const [deleteStudent] = useDeleteStudentMutation();

    /** Deletes the task */
    const onDelete = async (evt) => {
      evt.preventDefault();
      deleteStudent(student.id);
    };

  return (
    <li className="student-card">
      <div className="student-image">
        <img className="student-img" src={student.imageUrl} alt={student.firstName} />
      </div>
      <section className="student-info">
        <h2>{student.firstName}</h2>
        <h2>{student.lastName}</h2>
        <h4>GPA: {student.gpa}</h4>
        <Link className="moreinfo" to={`/students/${student.id}`}>More Info</Link>
        <button className="deleteStudentButton" onClick={onDelete} aria-label="delete">
          Delete Student
        </button>
      </section>
    </li>
  );
}

