import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { userAPI } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data.data.user);
    } catch (err) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>🎉 Welcome to Dashboard!</h1>
        
        <div className="profile-section">
          <h2>Your Profile</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="label">User ID:</span>
                <span className="value">{profile?.id || user?.id}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{profile?.email || user?.email}</span>
              </div>
              {profile?.created_at && (
                <div className="info-row">
                  <span className="label">Member Since:</span>
                  <span className="value">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="token-section">
          <h3>🔐 Authentication Status</h3>
          <p className="success-message">✅ You are logged in with a valid JWT token!</p>
          <p className="info-text">
            This page is protected and only accessible to authenticated users.
          </p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
