import { useState } from "react";

import {
  useDeleteStudentMutation,
  useEditStudentMutation,
  useGetStudentQuery,
} from "./studentSlice";

import { useParams, useNavigate } from "react-router-dom"; // Step 1

import "./StudentDetails.scss";


export default function StudentDetails() {

  const { id } = useParams();
  const { data: student, isLoading } = useGetStudentQuery(id);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [showInputs, setShowInputs] = useState(false)
  const [editStudent] = useEditStudentMutation();

  const handleUpdate = async () => {
    try {
      await editStudent({ id, ...updatedStudent });
      // After the update is successful, you can update the UI or perform any other necessary actions.
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };
  

  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate(); // Step 2


  /** Deletes the task */
  const onDelete = async (evt) => {
    evt.preventDefault();
    await deleteStudent(student.id);
    navigate("/"); // Step 3
  };


  if (!student) {
    return <p>There is no student with that id</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <html id="moreInfo-html">
    <main className="student-details">
      <h2 className="details-name">
        <b>Name: </b> 
        {showInputs ? (
          <>
            <input className="firstName-input"
              type="text"
              placeholder={updatedStudent.firstName || student.firstName}
              onChange={(e) => setUpdatedStudent({ ...updatedStudent, firstName: e.target.value })}
            />
            <input className="lastName-input"
              type="text"
              placeholder={updatedStudent.lastName || student.lastName}
              onChange={(e) => setUpdatedStudent({ ...updatedStudent, lastName: e.target.value })}
            />
          </>
        ) : (
          `${student.firstName} ${student.lastName}`
        )}
      </h2>
      {showInputs ? (
        <input className="imageUrl-input"
          type="text"
          placeholder={updatedStudent.imageUrl || student.imageUrl}
          onChange={(e) => setUpdatedStudent({ ...updatedStudent, imageUrl: e.target.value })}
        />
      ) : (
        <img src={student.imageUrl} alt={student.firstName} className="student-img" />
      )}
      <div>
        <h2>Email: <a href={`mail to:${student.email}`}>{student.email}</a></h2>
        {showInputs && (
          <input className="email-input"
            type="text"
            placeholder={updatedStudent.email || student.email}
            onChange={(e) => setUpdatedStudent({ ...updatedStudent, email: e.target.value })}
          />
        )}
      </div>
      <div>
        <br />
        <h2>GPA: {student.gpa}</h2>
        {showInputs && (
          <input className="gpa-input"
            type="number"
            placeholder={updatedStudent.gpa || student.gpa}
            onChange={(e) => setUpdatedStudent({ ...updatedStudent, gpa: parseFloat(e.target.value) })}
          />
        )}
      </div>
      <button className="update-btn" onClick={() => setShowInputs(!showInputs)}>
        {showInputs ? 'Hide' : 'Update'}
      </button>
      {showInputs && (
        <button className="save-btn" onClick={handleUpdate}>
          Save
        </button>
      )}
  
      <button id="delete-Btn" onClick={onDelete} aria-label="delete">
        Delete Student
      </button>

    </main>
    </html>
  );
}
