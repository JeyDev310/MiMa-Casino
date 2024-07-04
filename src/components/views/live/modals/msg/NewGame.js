import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class NewGame extends Component {

  constructor(props) {
    super(props)

    this.modalTimeout = 0

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    this.modalTimeout = setTimeout(() => {
      this.props.close()
    }, 2500)
  }

  componentWillUnmount() {
    clearTimeout(this.modalTimeout)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* New Game Modal */}

        <Modal.Body className="bg-transparent" style={{ borderRadius: "15px", }}>
          <h1 className="text-center display-1 font-weight-bold mb-1">New Game</h1>
          <div className="text-center text-white opacity-100 mb-0">Get ready to play</div>
        </Modal.Body>

        {/* / New Game Modal */}
      </>
    )
  }
}

export default NewGame