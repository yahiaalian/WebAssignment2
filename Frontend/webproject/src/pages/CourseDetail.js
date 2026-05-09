import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    creditHours: 3,
    departmentId: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await courseAPI.getById(id);
        setCourse(data);
        setFormData({
          title: data.title ?? '',
          creditHours: data.creditHours ?? 3,
          departmentId: data.departmentId ?? '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        creditHours: Number(formData.creditHours),
        departmentId: Number(formData.departmentId),
      };
      await courseAPI.update(id, payload);
      setCourse({ ...course, ...payload });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await courseAPI.delete(id);
      navigate('/courses');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!course) return <div className="page-error">Course not found</div>;

  return (
    <div className="detail-page">
      <h1>Course #{id} Details</h1>

      {isEditing ? (
        <form onSubmit={handleSave} className="form">
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
              <strong>Title:</strong> {course.title}
            </p>
            <p>
              <strong>Credit hours:</strong> {course.creditHours}
            </p>
            <p>
              <strong>Department ID:</strong> {course.departmentId ?? '—'}
            </p>
            <p>
              <strong>Department:</strong>{' '}
              {course.departmentName ?? '—'}
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
              onClick={() => navigate('/courses')}
            >
              Back to Courses
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
