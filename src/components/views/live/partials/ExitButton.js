import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
// import ExitIcon from '../icons/Exit'

import '../../../../vendor/styles/pages/chat.scss'

class ExitGame extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <Button
            id="dropdown-menu-link-2"
            size="md"
            className="mr-1"
            variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
            onClick={this.props.exit}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.69611 11.8906L8.02778 13.2222L12.75 8.5L8.02778 3.77778L6.69611 5.10944L9.13278 7.55556H0V9.44444H9.13278L6.69611 11.8906ZM15.1111 0H1.88889C1.38792 0 0.907478 0.199007 0.553243 0.553243C0.199007 0.907478 0 1.38792 0 1.88889V5.66667H1.88889V1.88889H15.1111V15.1111H1.88889V11.3333H0V15.1111C0 15.6121 0.199007 16.0925 0.553243 16.4468C0.907478 16.801 1.38792 17 1.88889 17H15.1111C16.15 17 17 16.15 17 15.1111V1.88889C17 0.85 16.15 0 15.1111 0Z" fill="white"/>
              </svg>
            {/* <ExitIcon /> */}
          </Button> 
      </>
    )
  }
}

export default ExitGame
