import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentAPI } from '../services/api';

function DepartmentForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    officeLocation: '',
    headId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        officeLocation: formData.officeLocation,
      };
      if (formData.headId) {
        payload.headId = Number(formData.headId);
      }
      await departmentAPI.create(payload);
      navigate('/departments');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Add New Department</h1>
      {error && <div className="page-error">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="form">
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
            Create Department
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/departments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;
