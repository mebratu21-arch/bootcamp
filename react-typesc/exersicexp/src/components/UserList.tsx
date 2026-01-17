import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="card">Loading users...</div>;
  if (error) return <div className="card error">Error: {error}</div>;

  return (
    <div className="card">
      <h2>Exercise 5: User List</h2>
      <div className="user-list">
        {users.slice(0, 5).map((user) => (
          <div key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
