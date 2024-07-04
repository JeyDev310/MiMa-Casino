import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { RateLimiter } from "limiter"

import axios from 'axios'

import {
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerPanelNotifications extends Component {

  constructor(props) {
    super(props)

    this.messageTimer = 0

    this.requestLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 250, })

    this.state = {
      init: false,
      data: [],
      show: false,
      message: '',
      count: 0,
    }
  }

  async componentDidMount() {
    this.parseLastMessage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.game_started !== this.props.game.data.game_started) {
      this.resetAll()
    }
    if (prevProps.game.burn !== this.props.game.burn) {
      this.parseLastBurnCard()
    }
    if (prevProps.game.messages !== this.props.game.messages) {
      this.parseLastMessage()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.messageTimer)
  }

  parseLastBurnCard() {
    this.setState({
      count: this.state.count + 1,
    })
  }

  parseLastMessage() {
    try {
      if (this.props.game.messages.length > 0) {
        if (this.props.game.messages[this.props.game.messages.length - 1].data.includes('tipped the dealer')) {

          var extract = function (string) {
            var amount = string.match(/[0-9]+([,.][0-9]+)?/)
            var unit = string.replace(/[0-9]+([,.][0-9]+)?/, "")
            if (amount && unit) {
              return {
                amount: +amount[0].replace(",", "."),
                currency: unit,
              }
            }
            return null
          }

          var extractedUsername = this.props.game.messages[this.props.game.messages.length - 1].user
          var extractedAmount = extract(this.props.game.messages[this.props.game.messages.length - 1].data)

          this.setState({
            show: true,
            message: `+$${extractedAmount.amount} ${truncateUsername(extractedUsername)} tipped the Dealer`,
            data: [...this.state.data,
            {
              id: String((Math.random() + 1).toString(36).substring(7)),
              content: `tipped $${extractedAmount.amount}`,
              user: String(truncateUsername(extractedUsername)),
              amount: String(extractedAmount.amount),
            }],
          }, () => {

            this.messageTimer = setTimeout(() => {
              this.setState({
                show: false,
                message: '',
              }, () => {
                this.getRandomGiphyByInput('Thank You')
              })
            }, 2500)

          })

        }
      }
    } catch { }
  }

  async getRandomGiphyByInput(input) {
    if (this.requestLimiter.tryRemoveTokens(1)) {
      await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${process.env.REACT_APP_GIPHY_DEV_API_KEY}&tag=${input}`
      ).then(res => {
        if (res.status === 200) {
          if (res.data) {
            var text = String(res.data.data.images.original.url)
            this.props.client.sendTextMessage(
              0,
              this.props.game.data.current_round,
              text,
            )
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  resetAll() {
    this.setState({
      count: 0,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Panel Notifications */}
        <Card className="d-flex w-100 mt-2 mb-3 bg-light border-0 shadow-none" style={{
          borderRadius: "15px",
        }}>
          <Row noGutters className="row-bordered">
            <Col sm={6} className="d-flex align-items-center px-4 py-2">
              <div className='w-100'>
                <div className="text-muted text-tiny font-weight-bold">LATEST DEALER TIP</div>
                <strong className="font-weight-bold">
                  <div className="text-left text-white opacity-100 mb-0 h5 font-weight-bold">
                    <div className="d-flex justify-content-between">
                      <span className="d-flex">
                        {this.state.data.length > 0
                          ? this.state.data
                            .slice(-1)
                            .map(message =>
                              <div
                                key={message.id}
                                className="mb-1 d-flex align-items-center justify-content-start">
                                <span
                                  className="font-weight-bold small"
                                  style={{ cursor: "default", }}>
                                  <span className="mr-1 font-weight-bold">
                                    {message.user}
                                  </span>
                                  <span>
                                    {message.content}
                                  </span>
                                </span>
                              </div>
                            )
                          : <div
                            className="mb-1 d-flex align-items-center justify-content-start">
                            <span
                              className="font-weight-bold small"
                              style={{ cursor: "default", }}>
                              <span>No tips yet...</span>
                            </span>
                          </div>}
                      </span>

                      {this.state.data.length > 0 && (
                        <span className="d-flex status-icon-circle-animation">
                          <i className="fas fa-circle text-danger" />
                        </span>
                      )}
                    </div>
                  </div>
                </strong>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center px-4 py-2">
              <div className="w-100">
                <div className="text-muted text-tiny font-weight-bold">BURN CARDS</div>
                <strong className="font-weight-bold">
                  <div className="text-left text-white opacity-100 mb-0 h5 font-weight-bold">
                    {this.state.count}/3
                  </div>
                </strong>
              </div>
            </Col>
          </Row>
        </Card>
        {/* / Dealer Panel Notifications */}
      </>
    )
  }
}

export default DealerPanelNotifications