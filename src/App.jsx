import { createContext, useState } from "react";
import SchoolCatalog from "./SchoolCatalog";
import ClassSchedule from "./ClassSchedule";
import Header from "./Header";

// Create context
export const CourseContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    // prevent duplicate enrollments
    if (!enrolledCourses.find((c) => c.courseNumber === course.courseNumber)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses(
      enrolledCourses.filter((c) => c.courseNumber !== courseNumber)
    );
  };

  return (
    <CourseContext.Provider
      value={{ enrolledCourses, enrollCourse, dropCourse }}
    >
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </CourseContext.Provider>
  );
}
