import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollmentAPI } from '../services/api';

function EnrollmentForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    grade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        studentId: Number(formData.studentId),
        courseId: Number(formData.courseId),
      };
      if (formData.grade.trim()) {
        payload.grade = formData.grade.trim().slice(0, 1);
      }
      await enrollmentAPI.create(payload);
      navigate('/enrollments');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-page">
      <h1>Add New Enrollment</h1>
      {error && <div className="page-error">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="number"
            name="studentId"
            min={1}
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course ID:</label>
          <input
            type="number"
            name="courseId"
            min={1}
            value={formData.courseId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Grade (single letter, optional):</label>
          <input
            type="text"
            name="grade"
            maxLength={1}
            value={formData.grade}
            onChange={handleChange}
            placeholder="e.g. A"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Create Enrollment
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/enrollments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentForm;
