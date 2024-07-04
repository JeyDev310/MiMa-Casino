import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import NewGame from '../../live/modals/msg/NewGame'
import StatusMessage from '../../live/modals/msg/StatusMessage'

import '../../../../vendor/styles/pages/chat.scss'

class MessageModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Message Modal */}
        <Modal
          className="modal-fill-in"
          show={this.props.messageModalShow}
          size="lg"
          onHide={this.props.close}
          onEnter={this.props.enter}>

          {this.props.messageModalContent === 1 && (
            <>
              {/* New Game Modal */}
              <NewGame {...this.props} />
              {/* / New Game Modal */}
            </>
          )}

          {this.props.messageModalContent === 2 && (
            <>
              {/* Status Message Modal */}
              <StatusMessage {...this.props}
                close={this.props.close} />
              {/* / Status Message Modal */}
            </>
          )}

        </Modal>
        {/* / Message Modal */}
      </>
    )
  }
}

export default MessageModal
