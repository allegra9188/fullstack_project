// PaginationLogic.jsx
import React, { useState } from "react";
import StudentCard from "./StudentCard";

const PaginationLogic = ({ students, searchRegex }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredAndSortedStudents = students
    .filter((student) => (student.firstName + student.lastName).match(searchRegex))
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const paginatedStudents = filteredAndSortedStudents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredAndSortedStudents.length / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <ul className="student-list">
        {paginatedStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </ul>
      <div className="pagination">
        <p>Page {currentPage} of {totalPages}</p>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default PaginationLogic;
