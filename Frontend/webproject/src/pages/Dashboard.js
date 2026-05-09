import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1>School Management System</h1>
      <p className="dashboard-subtitle">
        Manage students, courses, departments, and instructors.{' '}
        <Link to="/login">Log in</Link>
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Students</h2>
          <p>Manage student information and enrollment</p>
          <Link to="/students" className="btn-primary">
            View Students
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Courses</h2>
          <p>Manage available courses and curriculum</p>
          <Link to="/courses" className="btn-primary">
            View Courses
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Departments</h2>
          <p>Manage departments and their heads</p>
          <Link to="/departments" className="btn-primary">
            View Departments
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Instructors</h2>
          <p>Manage instructor information</p>
          <Link to="/instructors" className="btn-primary">
            View Instructors
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Enrollments</h2>
          <p>Manage student course enrollments</p>
          <Link to="/enrollments" className="btn-primary">
            View Enrollments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
