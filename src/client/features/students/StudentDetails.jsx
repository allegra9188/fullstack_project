import { useState } from "react";
import {
  useDeleteStudentMutation,
  useEditStudentMutation,
  useGetStudentQuery,
} from "./studentSlice";
import { useParams } from "react-router-dom";
import "./StudentDetails.scss";

/** Allows user to read, update, and delete a task */
export default function StudentDetails() {
  const [deleteStudent] = useDeleteStudentMutation();

  const { id } = useParams();
  const { data: student, isLoading } = useGetStudentQuery(id);


  /** Deletes the task */
  const onDelete = async (evt) => {
    evt.preventDefault();
    deleteStudent(student.id);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="student-details">

      <h1>
        {student.firstName}+{student.lastName}
      </h1>

      <br />
      <h2>{student.firstName + " " + student.lastName}</h2>

      <h2>{student.email}</h2>
      <h2>GPA: {student.gpa}</h2>
      <img src={student.imageUrl} alt={student.firstName} />
      <button onClick={onDelete} aria-label="delete">
        Delete Student
      </button>
    </main>
  );
}
