import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { departmentAPI } from '../services/api';

function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    officeLocation: '',
    headId: '',
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const data = await departmentAPI.getById(id);
        setDepartment(data);
        setFormData({
          name: data.name ?? '',
          officeLocation: data.officeLocation ?? '',
          headId: data.headId != null ? data.headId : '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        officeLocation: formData.officeLocation,
      };
      if (formData.headId) {
        payload.headId = Number(formData.headId);
      }
      await departmentAPI.update(id, payload);
      setDepartment({ ...department, ...payload });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await departmentAPI.delete(id);
      navigate('/departments');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!department) return <div className="page-error">Department not found</div>;

  return (
    <div className="detail-page">
      <h1>Department #{id} Details</h1>

      {isEditing ? (
        <form onSubmit={handleSave} className="form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label>Office location:</label>
            <input
              type="text"
              name="officeLocation"
              value={formData.officeLocation}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={200}
            />
          </div>
          <div className="form-group">
            <label>Head instructor ID (optional):</label>
            <input
              type="number"
              name="headId"
              min={1}
              value={formData.headId}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="detail-view">
          <div className="detail-info">
            <p>
              <strong>Name:</strong> {department.name}
            </p>
            <p>
              <strong>Office:</strong> {department.officeLocation}
            </p>
            <p>
              <strong>Head:</strong>{' '}
              {department.headName ?? '(not set)'} (ID:{' '}
              {department.headId ?? '—'})
            </p>
          </div>
          <div className="detail-actions">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/departments')}
            >
              Back to Departments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentDetail;
