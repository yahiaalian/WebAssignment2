import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentAPI } from '../services/api';

function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const data = await enrollmentAPI.getAll();
        setEnrollments(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await enrollmentAPI.delete(id);
      setEnrollments(enrollments.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading enrollments...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Enrollments</h1>
        <Link to="/enrollments/new" className="btn-primary">
          Add New Enrollment
        </Link>
      </div>

      {enrollments.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.id}</td>
                <td>{enrollment.studentName ?? `#${enrollment.studentId}`}</td>
                <td>{enrollment.courseTitle ?? `#${enrollment.courseId}`}</td>
                <td>{enrollment.grade || '-'}</td>
                <td>
                  <Link to={`/enrollments/${enrollment.id}`} className="link-action">
                    View/Edit
                  </Link>
                  <button
                    className="link-action link-danger"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No enrollments found.</p>
      )}
    </div>
  );
}

export default EnrollmentsList;
