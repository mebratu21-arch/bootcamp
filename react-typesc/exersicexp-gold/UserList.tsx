import { useDataFetching } from './useDataFetching';
import './UserList.css';

// Define the User type from JSONPlaceholder API
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

export function UserList() {
  const { data, loading, error, refetch, invalidateCache, cacheInfo } = 
    useDataFetching<User[]>(API_URL, { maxAge: CACHE_MAX_AGE });

  const handleRefresh = async () => {
    await refetch();
  };

  const handleClearAndRefresh = async () => {
    invalidateCache();
    await refetch();
  };

  const formatCacheAge = (ageMs: number | null): string => {
    if (ageMs === null) return 'No cache';
    
    const seconds = Math.floor(ageMs / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s ago`;
    }
    return `${seconds}s ago`;
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div>
          <h2>User Directory</h2>
          <p className="user-list-subtitle">
            Fetched from JSONPlaceholder API with caching
          </p>
        </div>
        <div className="cache-status">
          <span className="cache-indicator">
            {cacheInfo.isCached ? '💾 Cached' : '🌐 Fresh'}
          </span>
          <span className="cache-age">
            {formatCacheAge(cacheInfo.cacheAge)}
          </span>
        </div>
      </div>

      <div className="action-bar">
        <button 
          className="btn btn-primary"
          onClick={handleRefresh}
          disabled={loading}
        >
          🔄 Refresh
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleClearAndRefresh}
          disabled={loading}
        >
          🗑️ Clear Cache & Refresh
        </button>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Failed to Load Users</h3>
          <p className="error-message">{error.message}</p>
          <button className="btn btn-retry" onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="user-grid">
          {data.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-card-header">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className="user-company">{user.company.name}</p>
                </div>
              </div>
              
              <div className="user-card-body">
                <div className="user-detail">
                  <span className="detail-icon">📧</span>
                  <span className="detail-text">{user.email}</span>
                </div>
                <div className="user-detail">
                  <span className="detail-icon">📱</span>
                  <span className="detail-text">{user.phone}</span>
                </div>
                <div className="user-detail">
                  <span className="detail-icon">🌐</span>
                  <span className="detail-text">{user.website}</span>
                </div>
                <div className="user-detail">
                  <span className="detail-icon">📍</span>
                  <span className="detail-text">
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
              </div>
              
              <div className="user-card-footer">
                <p className="catchphrase">"{user.company.catchPhrase}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && data && (
        <div className="user-list-footer">
          <p>Total Users: <strong>{data.length}</strong></p>
          <p className="cache-note">
            ℹ️ Data is cached for {CACHE_MAX_AGE / 60000} minutes. 
            Use "Refresh" to fetch new data or "Clear Cache & Refresh" to force invalidation.
          </p>
        </div>
      )}
    </div>
  );
}
