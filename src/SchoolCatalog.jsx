import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch courses on mount
  useEffect(() => {
    fetch("/api/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // Handle column sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filter courses by search term
  const filteredCourses = courses.filter(
    (course) =>
      course.courseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortColumn) return 0;
    let valA = a[sortColumn];
    let valB = b[sortColumn];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination: slice sortedCourses to current page
  const totalPages = Math.ceil(sortedCourses.length / rowsPerPage);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Course Name</th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits
            </th>
            <th onClick={() => handleSort("totalClockHours")}>
              Total Clock Hours
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}
