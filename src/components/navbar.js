import React from "react"
import { Link } from "gatsby"

export default props => (
  <div className="container mb-2 mb-sm-5">
    <nav className="navbar navbar-expand navbar-light bg-white">
      <Link className="navbar-brand" to="/">Home</Link>

      <div className="navbar-expand" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about/">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
)
