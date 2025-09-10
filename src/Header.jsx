import { useContext } from "react";
import logo from "./assets/logo.png";
import { CourseContext } from "./App";

export default function Header() {
  // Access the enrolledCourses array from CourseContext
  // so we can dynamically display the number of enrolled classes
  const { enrolledCourses } = useContext(CourseContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {enrolledCourses.length}
      </div>
    </div>
  );
}
