import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
import "../Pages/style.css"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar
