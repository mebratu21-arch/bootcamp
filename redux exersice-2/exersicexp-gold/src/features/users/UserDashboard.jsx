import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.users)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  return (
    <div className="user-dashboard">
      <h2>Gold Exercise 1: Async User Dashboard</h2>
      {status === 'loading' && <div className="loader">Loading users...</div>}
      {status === 'failed' && <div className="error">Error: {error}</div>}
      <div className="user-grid">
        {items.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboard
