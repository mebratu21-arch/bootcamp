import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ageUpAsync, ageDownAsync } from './ageSlice'

const AgeControls = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.age.loading)

  return (
    <div className="controls">
      <button 
        onClick={() => dispatch(ageUpAsync())}
        disabled={loading}
      >
        Age Up
      </button>
      <button 
        onClick={() => dispatch(ageDownAsync())}
        disabled={loading}
      >
        Age Down
      </button>
    </div>
  )
}

export default AgeControls
