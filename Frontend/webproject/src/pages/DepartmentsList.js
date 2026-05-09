import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentAPI } from '../services/api';

function DepartmentsList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const data = await departmentAPI.getAll();
        setDepartments(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await departmentAPI.delete(id);
      setDepartments(departments.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading departments...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Departments</h1>
        <Link to="/departments/new" className="btn-primary">
          Add New Department
        </Link>
      </div>

      {departments.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Office</th>
              <th>Head</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.officeLocation}</td>
                <td>{dept.headName ?? (dept.headId ?? '—')}</td>
                <td>
                  <Link to={`/departments/${dept.id}`} className="link-action">
                    View/Edit
                  </Link>
                  <button
                    className="link-action link-danger"
                    onClick={() => handleDelete(dept.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
}

export default DepartmentsList;
