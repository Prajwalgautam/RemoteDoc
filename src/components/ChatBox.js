import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import InputEmoji from 'react-input-emoji';

const format = require("timeago.js").format;
const addMessage = require("./../api/MessageRequests").addMessage;
const getMessages = require("./../api/MessageRequests").getMessages;
const getUser = require("./../api/UserRequests").getUser;



const ChatBox = ({chat, currentUser, setSendMessage, receiveMessage}) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  useEffect(() => {
    if(receiveMessage !== null && receiveMessage.chatId === chat._id){
      setMessage([...message, receiveMessage]);
    }
  },[receiveMessage])



  //fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id)=> id !== currentUser);
    const getUserData = async () =>{
      try{
        const {data} = await getUser(userId);
        setUserData(data);
      }catch(error){
        console.log(error);
      }
    }
    if(chat!==null) getUserData();
    
  },[chat, currentUser]);

  //fetching data for messages

  useEffect(() => {
    const fetchMessages = async () =>{
      try{
        const {data} = await getMessages(chat._id);
        setMessage(data);
      }catch(error){
        console.log(error);
      }
    }
    if(chat!==null) fetchMessages();
  }
  ,[chat])
  const handleChange = (newMessage) =>{
    setNewMessage(newMessage);
  }

  const handleSend = async(e)=>{
    e.preventDefault();
    const message ={
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    try{
      const {data}= await addMessage(message);
      setMessage([...message, data]);
      setNewMessage("");
    }catch(error){
      console.log(error);
    }
    //send message to socket server
    const receiverId = chat.members.find((id)=> id !== currentUser);
    setSendMessage({...message, receiverId})
  }
  // always scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: "smooth"});
  }, [message])

  return (
    <>
    <div className="ChatBox-container">
      {chat?(
        <>
        <div className="chat-header">
          <div className="follower">
          <div className="name" style={{fontSize:"0.8rem"}}>
              <span>{userData?.name}</span>
          </div>
          </div>
        </div>
        <hr style ={{width: '75%', border : '0.1px solid #ececec'}} />
        <div className="chat-body">
          
          {message.map((message)=>(
            <>
              <div  ref ={scroll}
               className={
                message.senderId===currentUser
                ? "message own"
                :"message other"
                }
                >
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            </>
          ))}
          
        </div>
        {/*chat send*/}
        <div className="chat-sender">
          <div>+</div>
          <InputEmoji
          value={newMessage}
          onChange={handleChange}
          />
          <div className="send-button button" onClick={handleSend}>Send</div>
        </div>

    </>
      ):(
        <span className='chatbox-empty-message'>
          tap on a chat to start a Conversation...
        </span>
      )}
      
    </div>
    </>
  )
}

export default ChatBox