import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseAPI.getAll();
        setCourses(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await courseAPI.delete(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading courses...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Courses</h1>
        <Link to="/courses/new" className="btn-primary">
          Add New Course
        </Link>
      </div>

      {courses.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Credit hrs</th>
              <th>Dept ID</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.creditHours}</td>
                <td>{course.departmentId}</td>
                <td>{course.departmentName ?? '—'}</td>
                <td>
                  <Link to={`/courses/${course.id}`} className="link-action">
                    View/Edit
                  </Link>
                  <button
                    className="link-action link-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default CoursesList;
