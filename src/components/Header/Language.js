import React from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
export default function Language() {
  return (
      <NavDropdown title="Viet Nam" id="languages" className='languages'>
          <NavDropdown.Item >English</NavDropdown.Item>

          <NavDropdown.Item >Viet Nam</NavDropdown.Item>

      </NavDropdown>
  )
}
