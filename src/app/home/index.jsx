import React from 'react'
import { Link } from 'react-router-dom'
import 'styles/app/home/index.less'

export default class Home extends React.Component {
  render () {
    return (
      <div className="home">
        <ul>
          <li><Link to="/count">count</Link></li>
          <li><Link to="/todo">todo</Link></li>
          <li><Link to="/error/403">403</Link></li>
          <li><Link to="/error/404">404</Link></li>
        </ul>
      </div>
    )
  }
}
