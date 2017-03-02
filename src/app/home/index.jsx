import React from 'react'
import { Link } from 'react-router-dom'
import 'styles/app/home/index.less'

const Home = () => {
  return (
    <div className="home">
      {/* <Header /> */}
      <h1>Home</h1>
      <ul>
        <li><Link to="/count">count</Link></li>
        <li><Link to="/error/403">403</Link></li>
        <li><Link to="/error/404">404</Link></li>
      </ul>
    </div>
  )
}
export default Home
