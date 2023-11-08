import { useState } from "react";
import { useDeleteStudentMutation, useEditStudentMutation, useGetStudentQuery } from "./studentSlice";
import { useParams } from "react-router-dom";
import "./StudentDetails.scss"

/** Allows user to read, update, and delete a task */
export default function StudentDetails() {
  // const [editStudent] = useEditStudentMutation();
  // const [deleteStudent] = useDeleteStudentMutation();

  // const [description, setDescription] = useState(student.description);

  const { id } = useParams();
  const { data: student, isLoading } = useGetStudentQuery(id);
  console.log(id);
  // /** Updates the task's `done` status */
  // const toggleTask = async (evt) => {
  //   const done = evt.target.checked;
  //   editStudent({ ...student, done });
  // };

  // /** Saves the task's description */
  // const save = async (evt) => {
  //   evt.preventDefault();
  //   editStudent({ ...student, description });
  // };

  // /** Deletes the task */
  // const onDelete = async (evt) => {
  //   evt.preventDefault();
  //   deleteStudent(student.id);
  // };

  return isLoading ?(
    <p>Loading...</p>
  ) : (
    <main className="student-details">
      <h1>{student.firstName}+{student.lastName}</h1>
      <h2>{student.email}</h2>
      <h2>{student.gpa}</h2>
      <img src={student.imageUrl} alt={student.firstName} />
    </main>
  




    // <li>
    //   <form onSubmit={save}>
    //     <input type="checkbox" checked={task.done} onChange={toggleTask} />
    //     <input
    //       type="text"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       required
    //     />
    //     <button>Save</button>
    //     <button onClick={onDelete} aria-label="delete">
    //       🞪
    //     </button>
    //   </form>
    // </li>
  );
}
