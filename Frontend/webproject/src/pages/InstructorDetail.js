import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { instructorAPI } from '../services/api';

function InstructorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rank: '',
  });

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        setLoading(true);
        const data = await instructorAPI.getById(id);
        setInstructor(data);
        setFormData({
          name: data.name ?? '',
          email: data.email ?? '',
          rank: data.rank ?? '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
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
        email: formData.email,
        rank: formData.rank,
      };
      await instructorAPI.update(id, payload);
      setInstructor({ ...instructor, ...payload });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await instructorAPI.delete(id);
      navigate('/instructors');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!instructor) return <div className="page-error">Instructor not found</div>;

  return (
    <div className="detail-page">
      <h1>Instructor #{id} Details</h1>

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
              <strong>Name:</strong> {instructor.name}
            </p>
            <p>
              <strong>Email:</strong> {instructor.email}
            </p>
            <p>
              <strong>Rank:</strong> {instructor.rank}
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
              onClick={() => navigate('/instructors')}
            >
              Back to Instructors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorDetail;
