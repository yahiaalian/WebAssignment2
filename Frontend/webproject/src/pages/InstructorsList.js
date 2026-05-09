import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { instructorAPI } from '../services/api';

function InstructorsList() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const data = await instructorAPI.getAll();
        setInstructors(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await instructorAPI.delete(id);
      setInstructors(instructors.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading instructors...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Instructors</h1>
        <Link to="/instructors/new" className="btn-primary">
          Add New Instructor
        </Link>
      </div>

      {instructors.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rank</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td>{instructor.id}</td>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td>{instructor.rank}</td>
                <td>
                  <Link to={`/instructors/${instructor.id}`} className="link-action">
                    View/Edit
                  </Link>
                  <button
                    className="link-action link-danger"
                    onClick={() => handleDelete(instructor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No instructors found.</p>
      )}
    </div>
  );
}

export default InstructorsList;
