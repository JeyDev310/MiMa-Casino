import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import GiphySearchbox from '../fill/GiphySearchbox'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/giphy.scss'

class GiphySearchboxModal extends Component {

  constructor(props) {
    super(props)

    this.onGiphySearchboxModalClose = this.onGiphySearchboxModalClose.bind(this)

    this.state = {
      giphySearchboxModalShow: false,
    }
  }

  onGiphySearchboxModalClose() {
    this.setState({
      giphySearchboxModalShow: false,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Giphy Searchbox */}
        <Button
          variant="light"
          className="py-1 border-0 d-flex align-items-center justify-content-center h-100"
          disabled={this.props.disabled}
          onClick={(e) => {
            e.preventDefault()
            if (!this.props.disabled) {
              this.setState({
                giphySearchboxModalShow: true,
              })
            }
          }}
          style={{
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0)",
            borderRadius: "0px",
          }}>
          <i className="fas fa-image" style={{ fontSize: "1.2rem", }} />
        </Button>

        <Modal
          className="modal-fill-in"
          show={this.state.giphySearchboxModalShow}
          size="xl"
          onHide={this.onGiphySearchboxModalClose}>

          {/* Modal Body */}
          <GiphySearchbox
            {...this.props} {...this.state}
            submit={this.props.submit}
            close={this.onGiphySearchboxModalClose} />
          {/* / Modal Body */}

        </Modal>
        {/* / Giphy Searchbox */}
      </>
    )
  }
}

export default GiphySearchboxModal