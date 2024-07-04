import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { RateLimiter } from "limiter"

import GiphySearchbox from '../fill/GiphySearchbox'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/giphy.scss'

const GiphySearchboxIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.01 12C22.01 6.49 17.52 2 12.01 2C6.49001 2 2.01001 6.49 2.01001 12C2.01001 17.51 6.49001 22 12.01 22C13.51 22 14.96 21.67 16.32 21.01L21.1 21.72C21.33 21.75 21.57 21.67 21.74 21.5C21.9 21.34 21.98 21.1 21.95 20.86L21.21 15.89C21.74 14.64 22.01 13.34 22.01 12ZM7.89001 13.03C7.33001 13.03 6.87001 12.57 6.87001 12C6.87001 11.43 7.33001 10.97 7.89001 10.97C8.46001 10.97 8.92001 11.43 8.92001 12C8.92001 12.57 8.46001 13.03 7.89001 13.03ZM12 13.03C11.44 13.03 10.98 12.57 10.98 12C10.98 11.43 11.44 10.97 12 10.97C12.57 10.97 13.03 11.43 13.03 12C13.03 12.57 12.57 13.03 12 13.03ZM16.12 13.03C15.55 13.03 15.09 12.57 15.09 12C15.09 11.43 15.55 10.97 16.12 10.97C16.68 10.97 17.14 11.43 17.14 12C17.14 12.57 16.68 13.03 16.12 13.03Z" fill="white" />
</svg>

class QuickGiphySearchboxModal extends Component {

  constructor(props) {
    super(props)

    this.requestLimiter = new RateLimiter({ tokensPerInterval: 20, interval: 10000, })
    this.onHandleSubmitSendGiphy = this.onHandleSubmitSendGiphy.bind(this)
    this.onGiphySearchboxModalClose = this.onGiphySearchboxModalClose.bind(this)

    this.state = {
      giphySearchboxModalShow: false,
    }
  }

  componentDidMount() {
    const container = document.getElementById('bottom-nav-container-item')
    var elements = document.querySelectorAll('[id^="bottom-nav-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-2)) {
        case '08':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Giphy Searchbox')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(-50px, 0px)"
          })
          break
        default:
          break
      }
    }
  }

  onHandleSubmitSendGiphy(input) {
    if (this.requestLimiter.tryRemoveTokens(1)) {
      if (input) {
        var text = String(input.images.original.url)
        this.props.client.sendTextMessage(
          0,
          this.props.game.data.current_round,
          text,
        )
      }
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
        <span
          id="bottom-nav-link-08"
          className="game__action cursor-pointer nav_link__container nav_link__item mr-3 live-d-lg-flex"
          onClick={(e) => {
            e.preventDefault()
            if (!this.props.disabled) {
              this.setState({
                giphySearchboxModalShow: true,
              }, () => {
                this.props.change('optionL1', true)
              })
            }
          }}>
          <GiphySearchboxIcon />
        </span>

        <Modal
          className="modal-fill-in"
          show={this.state.giphySearchboxModalShow}
          size="xl"
          onHide={this.onGiphySearchboxModalClose}>

          {/* Modal Body */}
          <GiphySearchbox
            {...this.props} {...this.state}
            limiter={this.requestLimiter}
            submit={this.onHandleSubmitSendGiphy}
            close={this.onGiphySearchboxModalClose} />
          {/* / Modal Body */}

        </Modal>
        {/* / Giphy Searchbox */}
      </>
    )
  }
}

export default QuickGiphySearchboxModal