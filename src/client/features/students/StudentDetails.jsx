import { useState } from "react";
import { useEditStudentMutation, useGetStudentQuery } from "./studentSlice";
import { useParams } from "react-router-dom";
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="student-details">
      <h2 className="details-name">
        <b>Name: </b> 
        {showInputs ? (
          <>
            <input className="firstName-input"
              type="text"
              value={updatedStudent.firstName || student.firstName}
              onChange={(e) => setUpdatedStudent({ ...updatedStudent, firstName: e.target.value })}
            />
            <input className="lastName-input"
              type="text"
              value={updatedStudent.lastName || student.lastName}
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
          value={updatedStudent.imageUrl || student.imageUrl}
          onChange={(e) => setUpdatedStudent({ ...updatedStudent, imageUrl: e.target.value })}
        />
      ) : (
        <img src={student.imageUrl} alt={student.firstName} className="student-img" />
      )}
      <div>
        <h2>Email: {student.email}</h2>
        {showInputs && (
          <input className="email-input"
            type="text"
            value={updatedStudent.email || student.email}
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
            value={updatedStudent.gpa || student.gpa}
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
    </main>
  );
}
