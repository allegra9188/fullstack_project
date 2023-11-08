import { Link } from "react-router-dom";

// A Student Card displays a brief preview of the Student in StudentList

export default function StudentCard({ student }) {
    
    return (
        <li className="student-card">
            <div className="student-image">
                <img src={student.imageUrl} alt="" />
            </div>
            <section className="student-info">
                <h2>{student.firstName}</h2>
                <h2>{student.lastName}</h2>
            <Link to={`/students/${student.id}`}>More Info</Link>
            </section>
        </li>
    )
}