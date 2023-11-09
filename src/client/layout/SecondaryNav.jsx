import { useNavigate } from "react-router-dom";

export default function SecondaryNav() {
  const navigate = useNavigate();

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
  return (
    <div>
      <label>Sort By</label>
      <select id="sort-by" onChange={handleSort}>
        <option value="Please select"></option>
        <option value="first-name">First Name</option>
        <option value="last-name">Last Name</option>
        <option value="gpa">GPA</option>
      </select>
    </div>
  );
}
