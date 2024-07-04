import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { RSButton } from 'reactsymbols-kit'

import GiphySearchbox from '../fill/GiphySearchbox'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/giphy.scss'

class LiveChatGiphySearchbox extends Component {

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
        {/* Live Chat Giphy Searchbox Modal */}
        <RSButton
          size='medium'
          value=''
          background='rgba(43, 43, 51, 0)'
          color="#FFFFFF"
          iconName='FaImage'
          iconSize={20}
          onClick={(e) => {
            e.preventDefault()
            if (!this.props.disabled) {
              this.setState({
                giphySearchboxModalShow: true,
              })
            }
          }}
          className='w-100'
          style={{
            padding: "0",
            borderRadius: "0px 0px 0px 15px",
            zIndex: "0",
            pointerEvents: this.props.disabled
              ? "none"
              : "initial",
            opacity: this.props.disabled
              ? "0.6"
              : "1.0",
          }} />

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
        {/* / Live Chat Giphy Searchbox Modal */}
      </>
    )
  }
}

export default LiveChatGiphySearchbox