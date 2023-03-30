import React, { useEffect, useState } from 'react'

const Chats = () => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <div className="userChat">
        <div className="userChatInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats
