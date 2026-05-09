import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI } from '../services/api';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await studentAPI.getAll();
        setStudents(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await studentAPI.delete(id);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading students...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Students</h1>
        <Link to="/students/new" className="btn-primary">
          Add New Student
        </Link>
      </div>

      {students.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`/students/${student.id}`} className="link-action">
                    View/Edit
                  </Link>
                  <button
                    className="link-action link-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found. <Link to="/students/new">Add one now</Link></p>
      )}
    </div>
  );
}

export default StudentsList;
