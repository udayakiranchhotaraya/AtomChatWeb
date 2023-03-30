import React from 'react'

const Input = () => {
  return (
    <div className='input'>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Type Something..." />
        <div className='send'>
          <button type="button" class="btn btn-primary">Send</button>
        </div>
    </div>
  )
}

export default Input
