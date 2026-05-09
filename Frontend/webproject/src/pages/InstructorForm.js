import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instructorAPI } from '../services/api';

function InstructorForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rank: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instructorAPI.create({
        name: formData.name,
        email: formData.email,
        rank: formData.rank,
      });
      navigate('/instructors');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Add New Instructor</h1>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rank:</label>
          <input
            type="text"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={50}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Instructor
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/instructors')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default InstructorForm;
