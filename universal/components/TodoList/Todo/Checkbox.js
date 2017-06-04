import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ done, handleCheck }) => (
  <span className="dib">
    <input
      className="mr2 pointer"
      type="checkbox"
      checked={done}
      onChange={handleCheck}
    />
  </span>
)

Checkbox.propTypes = {
  done: PropTypes.bool.isRequired,
  handleCheck: PropTypes.func.isRequired,
}

export default Checkbox
