import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';

function CourseForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    creditHours: 3,
    departmentId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseAPI.create({
        title: formData.title,
        creditHours: Number(formData.creditHours),
        departmentId: Number(formData.departmentId),
      });
      navigate('/courses');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Add New Course</h1>
      {error && <div className="page-error">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <label>Credit hours (1–4):</label>
          <input
            type="number"
            name="creditHours"
            min={1}
            max={4}
            value={formData.creditHours}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department ID:</label>
          <input
            type="number"
            name="departmentId"
            min={1}
            value={formData.departmentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Course
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/courses')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
