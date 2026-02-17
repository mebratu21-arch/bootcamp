import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './userSlice'

// UserData Component: Step 4 & 5
const UserData = () => {
  const dispatch = useDispatch()
  
  // useSelector to access store state
  const { users, status, error } = useSelector((state) => state.users)

  // useDispatch to trigger the API call on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="error">
        <h3>Error occurred</h3>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchUsers())}>Retry</button>
      </div>
    )
  }

  return (
    <div className="user-container">
      <h1 style={{ color: '#5eead4', marginBottom: '2rem' }}>User Directory</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserData
