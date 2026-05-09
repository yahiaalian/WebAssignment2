import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/App.css';

// Pages
import Dashboard from '../pages/Dashboard';
import StudentsList from '../pages/StudentsList';
import StudentDetail from '../pages/StudentDetail';
import StudentForm from '../pages/StudentForm';
import CoursesList from '../pages/CoursesList';
import CourseDetail from '../pages/CourseDetail';
import CourseForm from '../pages/CourseForm';
import DepartmentsList from '../pages/DepartmentsList';
import DepartmentDetail from '../pages/DepartmentDetail';
import DepartmentForm from '../pages/DepartmentForm';
import InstructorsList from '../pages/InstructorsList';
import InstructorDetail from '../pages/InstructorDetail';
import InstructorForm from '../pages/InstructorForm';
import EnrollmentsList from '../pages/EnrollmentsList';
import EnrollmentDetail from '../pages/EnrollmentDetail';
import EnrollmentForm from '../pages/EnrollmentForm';
import Login from '../pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <h1 className="logo">School Management System</h1>
            <ul className="nav-links">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li className="nav-section">
                <span>Students</span>
                <ul className="nav-submenu">
                  <li>
                    <Link to="/students">List</Link>
                  </li>
                  <li>
                    <Link to="/students/new">Add New</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-section">
                <span>Courses</span>
                <ul className="nav-submenu">
                  <li>
                    <Link to="/courses">List</Link>
                  </li>
                  <li>
                    <Link to="/courses/new">Add New</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-section">
                <span>Departments</span>
                <ul className="nav-submenu">
                  <li>
                    <Link to="/departments">List</Link>
                  </li>
                  <li>
                    <Link to="/departments/new">Add New</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-section">
                <span>Instructors</span>
                <ul className="nav-submenu">
                  <li>
                    <Link to="/instructors">List</Link>
                  </li>
                  <li>
                    <Link to="/instructors/new">Add New</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/enrollments">Enrollments</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />

            {/* Students */}
            <Route path="/students" element={<StudentsList />} />
            <Route path="/students/new" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetail />} />

            {/* Courses */}
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            {/* Departments */}
            <Route path="/departments" element={<DepartmentsList />} />
            <Route path="/departments/new" element={<DepartmentForm />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />

            {/* Instructors */}
            <Route path="/instructors" element={<InstructorsList />} />
            <Route path="/instructors/new" element={<InstructorForm />} />
            <Route path="/instructors/:id" element={<InstructorDetail />} />

            {/* Enrollments */}
            <Route path="/enrollments" element={<EnrollmentsList />} />
            <Route path="/enrollments/new" element={<EnrollmentForm />} />
            <Route path="/enrollments/:id" element={<EnrollmentDetail />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2026 School Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
