import { useEffect, useState } from "react";
import api from '../../utils/axios';
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from '../../context/AuthContext';

export default function SailorDashboard() {
  const { user } = useAuth();
  const [sailor, setSailor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [formData, setFormData] = useState({
    division: '',
    trade: '',
    medicalFit: true,
    phone: '',
    address: ''
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchSailorData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching sailor data for user ID:', user._id);
        const { data } = await api.get('/sailors/' + user._id);
        setSailor(data);
        console.log('Sailor data:', data);
      } catch (err) {
        console.error('Error fetching sailor:', err.response?.status, err.message);
        if (err.response?.status === 404) {
          setError('No sailor profile found. Create one to get started.');
          // Fetch divisions for creating profile
          fetchDivisions();
        } else {
          setError(err.response?.data?.message || err.message || 'Failed to load sailor data');
        }
        setSailor(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchDivisions = async () => {
      try {
        const { data } = await api.get('/divisions');
        setDivisions(data);
      } catch (err) {
        console.error('Error fetching divisions:', err.message);
      }
    };

    fetchSailorData();
  }, [user?._id]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const { data } = await api.post('/sailors', {
        user: user._id,
        ...formData
      });
      setSailor(data);
      setError(null);
      console.log('Profile created:', data);
    } catch (err) {
      console.error('Error creating profile:', err.message);
      setError(err.response?.data?.message || 'Failed to create sailor profile');
    } finally {
      setCreating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  return (
    <DashboardLayout title="Sailor Dashboard">
      <h1>Sailor Panel</h1>
      <p>View your profile, division details, and notifications here.</p>
      
      {loading && <p>Loading sailor data...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      
      {sailor && !loading && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h2>Your Profile</h2>
          <p><strong>Name:</strong> {sailor.user?.name || 'N/A'}</p>
          <p><strong>Service No:</strong> {sailor.user?.serviceNo || 'N/A'}</p>
          <p><strong>Trade:</strong> {sailor.trade || 'N/A'}</p>
          <p><strong>Division:</strong> {sailor.division?.name || 'N/A'}</p>
          <p><strong>Medical Fit:</strong> {sailor.medicalFit ? 'Yes' : 'No'}</p>
          {sailor.phone && <p><strong>Phone:</strong> {sailor.phone}</p>}
          {sailor.address && <p><strong>Address:</strong> {sailor.address}</p>}
        </div>
      )}

      {!sailor && !loading && error && (
        <form onSubmit={handleCreateProfile} style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '500px' }}>
          <h3>Create Your Sailor Profile</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label><strong>Division:</strong></label>
            <select
              name="division"
              value={formData.division}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Select Division</option>
              {divisions.map(div => (
                <option key={div._id} value={div._id}>{div.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label><strong>Trade:</strong></label>
            <input
              type="text"
              name="trade"
              value={formData.trade}
              onChange={handleInputChange}
              placeholder="e.g., Engineer, Gunner"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label><strong>Phone:</strong></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Contact number"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label><strong>Address:</strong></label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Residential address"
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label>
              <input
                type="checkbox"
                name="medicalFit"
                checked={formData.medicalFit}
                onChange={handleInputChange}
              />
              {' '}<strong>Medically Fit</strong>
            </label>
          </div>

          <button
            type="submit"
            disabled={creating}
            style={{
              padding: '10px 20px',
              backgroundColor: creating ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: creating ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {creating ? 'Creating...' : 'Create Profile'}
          </button>
        </form>
      )}
    </DashboardLayout>
  );
}
