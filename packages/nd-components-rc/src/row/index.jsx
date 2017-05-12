import React, { PropTypes } from 'react'
import 'nd-components-style/lib/row.css'

const Row = ({ children }) => (
  <div className="nd-row">{children}</div>
)

Row.propTypes = {
  children: PropTypes.node
}

export default Row
