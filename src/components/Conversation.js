import React, { useEffect } from 'react'
import { useState } from 'react';

const getUser = require("./../api/UserRequests").getUser;
const Conversation = ({data, currentUserId}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            try{
                const id = userId;
                const { data } = await getUser(id);
                setUserData(data);
              }catch(error){
                console.log(error);
              }
        }
        getUserData();
        
    },[])

  return (
    <>
      <hr style ={{width: '75%', border : '0.1px solid #ececec'}} />
      <div className="name" style={{fontSize:"0.8rem"}}>
        <span>{userData?.name}</span>
      </div>
      <hr style ={{width: '75%', border : '0.1px solid #ececec'}} />
    </>
  )
}

export default Conversation