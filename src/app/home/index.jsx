import React from 'react'
import { Link } from 'react-router'
// import Header from './header'

const Home = () => {
  return (
    <div className="home">
      {/* <Header /> */}
      <h1>Home</h1>
      <Link to="/count">count</Link>
      <Link to="/error/403">403</Link>
      <Link to="/error/404">404</Link>
    </div>
  )
}
export default Home
