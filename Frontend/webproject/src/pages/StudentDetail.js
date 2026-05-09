import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentAPI } from '../services/api';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await studentAPI.getById(id);
        setStudent(data);
        setFormData({
          name: data.name ?? '',
          age: data.age ?? 18,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: formData.name, age: Number(formData.age) };
      await studentAPI.update(id, payload);
      setStudent({ ...student, ...payload });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await studentAPI.delete(id);
      navigate('/students');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page-loading">Loading...</div>;
  if (error) return <div className="page-error">Error: {error}</div>;
  if (!student) return <div className="page-error">Student not found</div>;

  return (
    <div className="detail-page">
      <h1>Student #{id} Details</h1>

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
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Age:</strong> {student.age}
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
              onClick={() => navigate('/students')}
            >
              Back to Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetail;
