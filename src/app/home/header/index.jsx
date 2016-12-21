import React from 'react'
// import { Link } from 'react-router'
import { Menu } from 'antd'

const MenuItem = Menu.Item

const Header = (props) => {
  return (
    <header className="header">
      {/*
        <div className="title">
        <Link to="/">React Admin</Link>
        </div>
      */}
      <div className="menu">
        <Menu mode="horizontal">
          <MenuItem>Home</MenuItem>
          <MenuItem>Manage</MenuItem>
          <MenuItem>About</MenuItem>
        </Menu>
      </div>
    </header>
  )
}

export default Header
