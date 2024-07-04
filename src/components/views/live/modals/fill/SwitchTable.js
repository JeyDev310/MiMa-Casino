import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class SwitchTable extends Component {

  render() {
    return (
      <>
        {/* Switch Table Modal */}
        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>
          <h1 className="text-center display-4 font-weight-bold">
            Switch Table
          </h1>

          <div className="text-center text-white opacity-100 mb-3">
            Are you sure you want to quit the game and switch tables?
          </div>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.exit}
            className="font-weight-bold h5 mb-0">
            Accept
          </Button>

          <Button
            variant="default" block
            onClick={this.props.close}
            className="font-weight-bold h5 mb-0">
            Cancel
          </Button>
        </Modal.Body>
        {/* / Switch Table Modal */}
      </>
    )
  }
}

export default SwitchTable