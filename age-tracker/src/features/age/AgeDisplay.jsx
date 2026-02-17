import React from 'react'
import { useSelector } from 'react-redux'

const AgeDisplay = () => {
  const { age, loading } = useSelector((state) => state.age)

  return (
    <div className="age-display">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <span>Age: {age}</span>
      )}
    </div>
  )
}

export default AgeDisplay
