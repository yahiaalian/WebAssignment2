import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../services/api';

function StudentForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.create({
        name: formData.name,
        age: Number(formData.age),
      });
      navigate('/students');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Add New Student</h1>
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
          <label>Age:</label>
          <input
            type="number"
            name="age"
            min={18}
            max={100}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Student
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/students')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
