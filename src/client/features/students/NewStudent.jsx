import { useState } from "react";
import { useCreateStudentMutation } from "./studentSlice";
/** Form for creating new tasks */
export default function NewStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");

  // const [description, setDescription] = useState("");
  const [createStudent] = useCreateStudentMutation();
  const create = async (evt) => {
    evt.preventDefault();
   // Create a student object with the entered data
   const newStudent = {
    firstName,
    lastName,
    email,
    gpa,
  };
  // Call the createStudent mutation with the new student data
  createStudent(newStudent);
  // Clear the form fields
  setFirstName("");
  setLastName("");
  setEmail("");
  setGpa("");
};
return (
  <form onSubmit={create}>
    <div>
      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div>
      <label>GPA:</label>
      <input
        type="number"
        value={gpa}
        onChange={(e) => setGpa(e.target.value)}
        required
      />
    </div>
    <button>Create Student</button>
  </form>
);
}