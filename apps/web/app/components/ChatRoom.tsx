import React from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import ChatRoomClient from './ChatRoomClient';

async function getChats(roomId : string){
    const reponse = await axios.get(`${BACKEND_URL}/chats/${roomId}`) 
    return reponse.data.chats;
} 
const ChatRoom = async ({id} : {
  id : string
}) => {
  const chats = await  getChats(id);

  return <ChatRoomClient id={id} messages={chats}></ChatRoomClient>
}

export default ChatRoom
