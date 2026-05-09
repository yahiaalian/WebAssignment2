import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { enrollmentAPI } from '../services/api';

function EnrollmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    grade: '',
  });

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        setLoading(true);
        const data = await enrollmentAPI.getById(id);
        setEnrollment(data);
        setFormData({
          studentId: data.studentId,
          courseId: data.courseId,
          grade: data.grade ?? '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        studentId: Number(formData.studentId),
        courseId: Number(formData.courseId),
      };
      if (formData.grade.trim()) {
        payload.grade = formData.grade.trim().slice(0, 1);
      }
      await enrollmentAPI.update(id, payload);
      setEnrollment({
        ...enrollment,
        ...payload,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await enrollmentAPI.delete(id);
      navigate('/enrollments');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!enrollment) return <div className="page-error">Enrollment not found</div>;

  return (
    <div className="detail-page">
      <h1>Enrollment #{id} Details</h1>

      {isEditing ? (
        <form onSubmit={handleSave} className="form">
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
            <label>Grade (single letter):</label>
            <input
              type="text"
              name="grade"
              maxLength={1}
              value={formData.grade}
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
              <strong>Student:</strong>{' '}
              {enrollment.studentName ??
                `(ID ${enrollment.studentId})`}
            </p>
            <p>
              <strong>Course:</strong>{' '}
              {enrollment.courseTitle ??
                `(ID ${enrollment.courseId})`}
            </p>
            <p>
              <strong>Grade:</strong> {enrollment.grade || '—'}
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
              onClick={() => navigate('/enrollments')}
            >
              Back to Enrollments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrollmentDetail;
