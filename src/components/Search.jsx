import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs, where, query, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    } catch (err) {
      setErr(true)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (e) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()){
        //create a chat in chat collection
        await setDoc(doc(db, "chats", combinedId), {messages: []});

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (error) {
      
    }
    

  }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
