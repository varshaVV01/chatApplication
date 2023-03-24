import React, { useContext } from 'react'
import "../Pages/style.css"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {data}=useContext(ChatContext)
  return (
    <div className='chat'>
        <div className='chatInfo'>
          <span>{data.user?.displayName}</span>
          <div className='chatIcons'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxUpjVWyhm6hQu-ybBCKvRAx0OmGrftzxLyA&usqp=CAU" alt=" "/>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUGxIPkRa7JrVkRgwjtDcQiqEKn5ZNlKcQg&usqp=CAU" alt=" " />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL972RNlaBq9UaLcHqyPQBW7PUei5laSM_6A&usqp=CAU" alt=" " />
         </div>
        </div>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat
