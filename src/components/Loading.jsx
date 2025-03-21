import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center position-absolute start-50 top-50">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>  
  )
}

export default Loading
