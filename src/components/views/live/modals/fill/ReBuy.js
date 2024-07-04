import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Media, Modal, Row } from 'react-bootstrap'

// import { RSButton } from 'reactsymbols-kit'

import { formatPrice } from '../../utilities/TextPreprocessing'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'

class ReBuy extends Component {

  constructor(props) {
    super(props)

    this.requestTimer = null
    this.responseTimer = null

    this.renderReBuyButtonGroup = this.renderReBuyButtonGroup.bind(this)
    this.onHandleRefreshPresence = this.onHandleRefreshPresence.bind(this)
    this.onHandlePresenceUpdate = this.onHandlePresenceUpdate.bind(this)
    this.onHandleReBuyResponse = this.onHandleReBuyResponse.bind(this)
    this.onChangeReBuyAmount = this.onChangeReBuyAmount.bind(this)
    this.onChangeReBuyAmountByOption = this.onChangeReBuyAmountByOption.bind(this)
    this.onSubmitReBuy = this.onSubmitReBuy.bind(this)
    this.onSubmitKeypress = this.onSubmitKeypress.bind(this)

    this.state = {
      init: false,
      joinable: false,
      playing: false,
      spectator: true,
      isFetching: false,
      reBuyInput: '',
      reBuyAmount: 0,
      reBuyResponse: null,
      reBuyAmountHint: 'Please enter a valid re-buy amount.',
      reBuyAmountHintColor: 'text-white',
      projectedBalance: null,
      remainingDeposit: null,
    }
  }

  componentDidMount() {
    this.onHandleRefreshPresence()
    this.props.client.sendReBuyRequest()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.presence !== this.props.game.presence) {
      this.onHandleRefreshPresence()
    }
    if (prevProps.game.rebuy_res !== this.props.game.rebuy_res) {
      this.onHandleReBuyResponse()
    }
  }

  componentWillUnmount() {
    clearInterval(this.requestTimer)
    clearInterval(this.responseTimer)
  }

  onChangeReBuyAmount(e) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        reBuyInput: e.target.value,
      })
      let amount = Number(parseFloat(e.target.value).toFixed(2))
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= amount &&
        amount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        amount <= Number(parseFloat(this.props.game.rebuy.live_deposit).toFixed(2)) &&
        amount > 0
      ) {
        this.setState({
          reBuyAmount: e.target.value,
          reBuyAmountHint: `Continue the game with a re-buy of $${amount}.`,
          reBuyAmountHintColor: 'text-white',
          projectedBalance: Number(parseFloat(this.props.game.rebuy.player_balance + amount).toFixed(2)),
          remainingDeposit: Number(parseFloat(this.props.game.rebuy.live_deposit - amount).toFixed(2)),
        })
      } else {
        this.setState({
          reBuyAmount: 0,
          reBuyAmountHint: `Please enter a valid re-buy amount.`,
          reBuyAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        reBuyInput: e.target.value,
      })
      let amount = Number(parseFloat(e.target.value).toFixed(2))
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= amount &&
        amount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        amount <= Number(parseFloat(this.props.game.rebuy.practice_deposit).toFixed(2)) &&
        amount > 0
      ) {
        this.setState({
          reBuyAmount: e.target.value,
          reBuyAmountHint: `Continue the game with a re-buy of $${amount}.`,
          reBuyAmountHintColor: 'text-white',
          projectedBalance: Number(parseFloat(this.props.game.rebuy.player_balance + amount).toFixed(2)),
          remainingDeposit: Number(parseFloat(this.props.game.rebuy.practice_deposit - amount).toFixed(2)),
        })
      } else {
        this.setState({
          reBuyAmount: 0,
          reBuyAmountHint: `Please enter a valid re-buy amount.`,
          reBuyAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    }
  }

  onChangeReBuyAmountByOption(value) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        reBuyInput: value,
      })
      let amount = Number(parseFloat(value).toFixed(2))
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= amount &&
        amount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        amount <= Number(parseFloat(this.props.game.rebuy.live_deposit).toFixed(2)) &&
        amount > 0
      ) {
        this.setState({
          reBuyAmount: amount,
          reBuyAmountHint: `Continue the game with a re-buy of $${amount}.`,
          reBuyAmountHintColor: 'text-white',
          projectedBalance: Number(parseFloat(this.props.game.rebuy.player_balance + amount).toFixed(2)),
          remainingDeposit: Number(parseFloat(this.props.game.rebuy.live_deposit - amount).toFixed(2)),
        })
      } else {
        this.setState({
          reBuyAmount: 0,
          reBuyAmountHint: `Please enter a valid re-buy amount.`,
          reBuyAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        reBuyInput: value,
      })
      let amount = Number(parseFloat(value).toFixed(2))
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= amount &&
        amount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        amount <= Number(parseFloat(this.props.game.rebuy.practice_deposit).toFixed(2)) &&
        amount > 0
      ) {
        this.setState({
          reBuyAmount: amount,
          reBuyAmountHint: `Continue the game with a re-buy of $${amount}.`,
          reBuyAmountHintColor: 'text-white',
          projectedBalance: Number(parseFloat(this.props.game.rebuy.player_balance + amount).toFixed(2)),
          remainingDeposit: Number(parseFloat(this.props.game.rebuy.practice_deposit - amount).toFixed(2)),
        })
      } else {
        this.setState({
          reBuyAmount: 0,
          reBuyAmountHint: `Please enter a valid re-buy amount.`,
          reBuyAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    }
  }

  onSubmitReBuy() {
    if (!this.props.game.data.demo_mode) {
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= this.state.reBuyAmount &&
        this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.live_deposit).toFixed(2)) &&
        this.state.reBuyAmount > 0
      ) {
        this.setState({
          isFetching: true,
        }, () => {
          this.requestTimer = setTimeout(() => {
            this.props.client.sendReBuyProcess(
              0,
              this.props.game.data.current_round,
              parseFloat(this.state.reBuyAmount).toFixed(2),
            )
          }, 500)
        })
      }
    } else {
      if (
        Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= this.state.reBuyAmount &&
        this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
        this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.practice_deposit).toFixed(2)) &&
        this.state.reBuyAmount > 0
      ) {
        this.setState({
          isFetching: true,
        }, () => {
          this.requestTimer = setTimeout(() => {
            this.props.client.sendReBuyProcess(
              0,
              this.props.game.data.current_round,
              parseFloat(this.state.reBuyAmount).toFixed(2),
            )
          }, 500)
        })
      }
    }
  }

  onSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (!this.props.game.data.demo_mode) {
        if (
          Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= this.state.reBuyAmount &&
          this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
          this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.live_deposit).toFixed(2)) &&
          this.state.reBuyAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            this.requestTimer = setTimeout(() => {
              this.props.client.sendReBuyProcess(
                0,
                this.props.game.data.current_round,
                parseFloat(this.state.reBuyAmount).toFixed(2),
              )
            }, 500)
          })
        }
      } else {
        if (
          Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2)) <= this.state.reBuyAmount &&
          this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2)) &&
          this.state.reBuyAmount <= Number(parseFloat(this.props.game.rebuy.practice_deposit).toFixed(2)) &&
          this.state.reBuyAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            this.requestTimer = setTimeout(() => {
              this.props.client.sendReBuyProcess(
                0,
                this.props.game.data.current_round,
                parseFloat(this.state.reBuyAmount).toFixed(2),
              )
            }, 500)
          })
        }
      }
    }
  }

  onHandleRefreshPresence() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence
    ) {
      if (!this.props.game.presence.user_has_joined) {
        if (this.props.game.presence.joined_players < this.props.game.presence.max_players) {
          this.setState({
            init: false,
            joinable: true,
            playing: false,
            spectator: true,
          })
        } else {
          this.setState({
            init: false,
            joinable: false,
            playing: false,
            spectator: true,
          })
        }
      } else {
        this.setState({
          init: true,
          joinable: false,
          playing: true,
          spectator: false,
        })
      }
    }
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence &&
      this.props.game.player
    ) {
      this.setState({
        init: true,
        joinable: false,
        playing: true,
        spectator: false,
      })
    }
  }

  onHandlePresenceUpdate() {
    if (this.props.game.presence) {
      return `Joined Players: ${this.props.game.presence.joined_players}/${this.props.game.presence.max_players}`
    }
    return null
  }

  renderReBuyButtonGroup() {
    if (this.props.game.rebuy) {
      var minReBuy = Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2))
      var maxReBuy = Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2))
      var x11ReBuy = Number(parseFloat(Math.round(Number(((maxReBuy - minReBuy) / 4) + minReBuy))).toFixed(2))
      var x21ReBuy = Number(parseFloat(Math.round(Number(((maxReBuy - minReBuy) / 2) + minReBuy))).toFixed(2))
      return (
        <Row className="mb-3">
          <Col className="p-1">
          {minReBuy > 0 && (
            <Button variant="default" className="w-100 mb-2 d-flex flex-column align-items-center" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.reBuyInput === minReBuy ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeReBuyAmountByOption(minReBuy) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(minReBuy)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px", display: "inline",  whiteSpace: "nowrap"}}>Choose Amount</div>
            </Button>            
          )}
          </Col>
          <Col className="p-1">
          {x11ReBuy > 0 && (
            <Button variant="default" className="w-100 mb-2 d-flex flex-column align-items-center" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.reBuyInput === x11ReBuy ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeReBuyAmountByOption(x11ReBuy) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x11ReBuy)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px", display: "inline",  whiteSpace: "nowrap"}}>Choose Amount</div>
            </Button>
            
          )}
          </Col>
          <Col className="p-1">
          {x21ReBuy > 0 && (
            <Button variant="default" className="w-100 mb-2 d-flex flex-column align-items-center" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.reBuyInput === x21ReBuy ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeReBuyAmountByOption(x21ReBuy) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x21ReBuy)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px", display: "inline",  whiteSpace: "nowrap"}}>Choose Amount</div>
            </Button>
            
          )}
          </Col>
          <Col className="p-1">
          {maxReBuy > 0 && (
            <Button variant="default" className="w-100 mb-2 d-flex flex-column align-items-center" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.reBuyInput === maxReBuy ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeReBuyAmountByOption(maxReBuy) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(maxReBuy)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px", display: "inline",  whiteSpace: "nowrap"}}>Choose Amount</div>
            </Button>
            
          )}
          </Col>
        </Row>
      )
    } else {
      return (null)
    }
  }

  onHandleReBuyResponse() {
    this.setState({
      isFetching: false,
      reBuyResponse: this.props.game.rebuy_res,
    }, () => {
      if (this.props.game.rebuy_res.status === 'success') {
        this.responseTimer = setTimeout(() => {
          this.props.close()
        }, 500)
      } else {
        this.responseTimer = setTimeout(() => {
          this.setState({
            reBuyResponse: null,
          })
        }, 500)
      }
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.props.game.profile && this.props.game.player && this.props.game.rebuy && !this.state.reBuyResponse && !this.state.isFetching
          ? <>
            {this.props.game.rebuy.player_maximum_re_buy > 0
              ? <>
                {/* Re-Buy Modal */}
                <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end"> 
                    <Form.Label
                      className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                      style={{marginTop: "2px"}}
                      onClick={this.props.close}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                      </svg>
                      </span>
                    </Form.Label>                   

                  </div>
                  <div>
                    <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                      Re-Buy
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>
                  <Row className="my-3 fill-modal-mobile-hidden" style={{width: "80%"}}>
                    <Col
                      // sm={4} md={4}                                       
                      style={{ opacity: `${this.state.remainingDeposit ? "0.75" : "1.0"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        // pill variant="default"
                        className={`d-flex align-items-center p-2`} style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.82 17.1H13.42V21.58H11.82V17.1ZM12.1 16.66V7.22L13.14 6.94V16.7L12.1 16.66ZM11.82 2.7H13.42V6.54L11.82 6.82V2.7ZM16.2 9.44C16.2 9.44 16.0867 9.37333 15.86 9.24C15.6333 9.10667 15.3333 8.96 14.96 8.8C14.5867 8.62667 14.18 8.47333 13.74 8.34C13.3 8.20667 12.8667 8.14 12.44 8.14C12.1067 8.14 11.8333 8.19333 11.62 8.3C11.4067 8.40667 11.3 8.58667 11.3 8.84C11.3 9.08 11.4067 9.27333 11.62 9.42C11.8333 9.56667 12.1333 9.7 12.52 9.82C12.92 9.94 13.3933 10.0867 13.94 10.26C14.82 10.5267 15.58 10.8333 16.22 11.18C16.86 11.5267 17.3533 11.9733 17.7 12.52C18.0467 13.0533 18.22 13.7667 18.22 14.66C18.22 15.5133 18.0667 16.2333 17.76 16.82C17.4533 17.3933 17.04 17.8533 16.52 18.2C16 18.5467 15.42 18.8 14.78 18.96C14.14 19.1067 13.4867 19.18 12.82 19.18C12.14 19.18 11.4267 19.1133 10.68 18.98C9.94667 18.8333 9.23333 18.64 8.54 18.4C7.84667 18.1467 7.21333 17.8533 6.64 17.52L8.32 14.1C8.32 14.1 8.45333 14.18 8.72 14.34C8.98667 14.5 9.34 14.68 9.78 14.88C10.22 15.08 10.7067 15.26 11.24 15.42C11.7867 15.58 12.3333 15.66 12.88 15.66C13.3067 15.66 13.6 15.6067 13.76 15.5C13.9333 15.38 14.02 15.2267 14.02 15.04C14.02 14.76 13.8733 14.5467 13.58 14.4C13.2867 14.24 12.9 14.0933 12.42 13.96C11.9533 13.8133 11.4333 13.6467 10.86 13.46C10.0333 13.18 9.35333 12.8667 8.82 12.52C8.28667 12.16 7.89333 11.74 7.64 11.26C7.38667 10.7667 7.26 10.1733 7.26 9.48C7.26 8.42667 7.50667 7.54667 8 6.84C8.49333 6.13333 9.14 5.6 9.94 5.24C10.7533 4.86667 11.6267 4.68 12.56 4.68C13.2533 4.68 13.92 4.76667 14.56 4.94C15.2133 5.1 15.82 5.3 16.38 5.54C16.9533 5.78 17.4533 6.00667 17.88 6.22L16.2 9.44Z" fill="white"/>
                            </svg>
                          </div>                            
                        </span>

                        <Media.Body className="ml-2 text-left">
                              <span className="text-medium font-weight-bold">
                                {!this.props.game.data.demo_mode
                                  ? <>
                                    {this.state.remainingDeposit
                                      ? <span>{formatPrice(this.state.remainingDeposit)}</span>
                                      : <span>{formatPrice(this.props.game.rebuy.live_deposit)}</span>
                                    }
                                  </>
                                  : <>
                                    {this.state.remainingDeposit
                                      ? <span>{formatPrice(this.state.remainingDeposit)}</span>
                                      : <span>{formatPrice(this.props.game.rebuy.practice_deposit)}</span>
                                    }
                                  </>}
                              </span>
                              <div className="chat-status small text-body font-weight-bold pt-1">
                                <span className="text-medium font-weight-bold text-body">
                                  {!this.props.game.data.demo_mode
                                    ? <>
                                      {this.state.remainingDeposit
                                        ? <span>Remaining Deposit</span>
                                        : <span>Deposit</span>
                                      }
                                    </>
                                    : <>
                                      {this.state.remainingDeposit
                                        ? <span>Remaining Deposit (Play Money)</span>
                                        : <span>Deposit (Play Money)</span>
                                      }
                                    </>}
                                </span>
                              </div>
                        </Media.Body>                                  
                      </Badge>
                    </Col>

                    <Col
                      // sm={4} md={4}
                      className="ml-3"
                      style={{ opacity: `${this.state.remainingDeposit ? "0.75" : "1.0"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        pill variant="default"
                        className="d-flex align-items-center p-2" style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.103 15.0014C12.1272 15.6348 11.928 16.2566 11.5401 16.7585C11.1613 17.2309 10.6631 17.5938 10.0968 17.8098C9.41526 18.0479 8.69723 18.1648 7.97521 18.1554H2V5.88525H8.81225C9.32942 5.88691 9.83347 6.04778 10.2555 6.34603C10.6755 6.64887 11.0089 7.05598 11.2226 7.52698C11.4495 7.999 11.5678 8.51562 11.569 9.03914C11.5605 9.61522 11.4065 10.1799 11.1215 10.6809C10.8309 11.2175 10.3612 11.6354 9.79376 11.8619C10.457 12.0419 11.0443 12.4309 11.468 12.9709C11.8996 13.5587 12.123 14.273 12.103 15.0014ZM4.78561 8.30472V10.8538H7.5566C7.76676 10.8504 7.9737 10.8013 8.16284 10.7098C8.35066 10.6186 8.50648 10.4731 8.61017 10.2922C8.72238 10.0742 8.77701 9.83128 8.76891 9.58641C8.78147 9.34278 8.73185 9.09997 8.62462 8.88074C8.5344 8.70548 8.4001 8.55662 8.2349 8.44871C8.06241 8.35419 7.86896 8.30469 7.67218 8.30472H4.78561ZM9.23086 14.4398C9.22951 14.2005 9.17532 13.9645 9.07212 13.7485C8.9714 13.5559 8.82826 13.3885 8.65351 13.2589C8.47684 13.1332 8.26423 13.0675 8.04727 13.0717H4.78561V15.7504H7.91742C8.15521 15.7565 8.39 15.6967 8.59572 15.5776C8.793 15.4743 8.95419 15.3135 9.05767 15.1167C9.17069 14.9094 9.22552 14.6755 9.21641 14.4398H9.23086Z" fill="#F1F1F1"/>
                            <path d="M20.373 9.47118L19.9977 9.21196C19.7812 9.08235 19.5216 8.95269 19.2185 8.80867C18.8866 8.66283 18.5439 8.54247 18.1936 8.44863C17.8299 8.35831 17.457 8.31002 17.0823 8.30465C16.6943 8.28018 16.3079 8.37034 15.9711 8.56387C15.8452 8.64632 15.7431 8.76008 15.6748 8.89394C15.6064 9.02779 15.5742 9.17706 15.5814 9.32711C15.5768 9.44994 15.6004 9.5722 15.6504 9.68452C15.7005 9.79684 15.7755 9.89627 15.87 9.9752C16.1266 10.1758 16.4211 10.3228 16.7359 10.4072L18.1792 10.8105C18.8847 10.9924 19.5674 11.2533 20.2143 11.5882C20.7507 11.8417 21.213 12.2285 21.5566 12.7116C21.8964 13.2594 22.0624 13.8969 22.0328 14.5405C22.0503 15.1493 21.9164 15.753 21.6431 16.2976C21.3971 16.769 21.0407 17.1742 20.604 17.4785C20.164 17.7728 19.6754 17.9873 19.1607 18.1122C18.5932 18.2464 18.0119 18.314 17.4286 18.3137C16.8128 18.3142 16.1988 18.2516 15.5958 18.1266C14.9801 18.0016 14.3764 17.8232 13.7917 17.5937C13.2327 17.3773 12.6962 17.1072 12.1897 16.7872L13.4309 14.3101C13.5738 14.431 13.7284 14.5371 13.8927 14.6269C14.1914 14.8114 14.5053 14.9704 14.8308 15.1022C15.241 15.2777 15.6601 15.4316 16.0865 15.5631C16.5562 15.6939 17.0422 15.7569 17.5298 15.7503C17.9258 15.784 18.323 15.6988 18.67 15.5055C18.7836 15.4334 18.8765 15.3331 18.9398 15.2144C19.003 15.0958 19.0344 14.9629 19.0308 14.8286C19.0347 14.685 19.0006 14.543 18.9322 14.4167C18.8638 14.2903 18.7635 14.184 18.6411 14.1085C18.3173 13.8921 17.9619 13.7269 17.5876 13.6189L16.0576 13.158C15.4114 12.9645 14.7873 12.7038 14.1957 12.3803C13.7449 12.1306 13.3669 11.7684 13.0988 11.329C12.853 10.8534 12.7338 10.3228 12.7524 9.78798C12.7288 9.00949 12.94 8.2419 13.3587 7.58457C13.7762 6.99267 14.3511 6.52882 15.0185 6.24522C15.7332 5.93515 16.505 5.77814 17.2843 5.78436C17.8533 5.78396 18.4203 5.85158 18.9731 5.98591C19.4659 6.12427 19.9482 6.2976 20.4163 6.50444C20.8422 6.69656 21.2566 6.91287 21.6575 7.15245L20.373 9.47118Z" fill="#F1F1F1"/>
                            <path d="M17.4686 4.00015L17.272 5.36865L18.5006 5.54445L18.6973 4.17594L17.4686 4.00015Z" fill="#F1F1F1"/>
                            <path d="M15.3542 18.5982L15.178 19.8242L16.4066 20L16.5828 18.774L15.3542 18.5982Z" fill="#F1F1F1"/>
                            </svg>
                          </div>
                        
                        </span>

                        <Media.Body className="ml-2 text-left">
                              <span className="text-medium font-weight-bold">
                                {this.state.projectedBalance
                                  ? <span>{formatPrice(this.state.projectedBalance)}</span>
                                  : <span>{formatPrice(this.props.game.rebuy.player_balance)}</span>
                                }
                              </span>
                              <div className="chat-status small text-body font-weight-bold pt-1">
                                <span className="text-medium font-weight-bold text-body">
                                  {this.state.projectedBalance
                                    ? <span>Updated Balance</span>
                                    : <span>Balance</span>
                                  }
                                </span>
                              </div>
                        </Media.Body>
                      </Badge>
                    </Col>
                  </Row>
                  <Row className="fill-modal-mobile-hidden" style={{width: "80%"}}>
                    <Col
                      // sm={4} md={4}                                                                      
                      style={{ opacity: `${this.state.remainingDeposit ? "0.75" : "1.0"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        // pill variant="default"
                        className="d-flex align-items-center p-2" style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.22222 5C2.99653 5 2 6.04635 2 7.33333V16.6667C2 17.9536 2.99653 19 4.22222 19H19.7778C21.0035 19 22 17.9536 22 16.6667V7.33333C22 6.04635 21.0035 5 19.7778 5H4.22222ZM11.4444 9.66667H19.2222C19.5278 9.66667 19.7778 9.92917 19.7778 10.25C19.7778 10.5708 19.5278 10.8333 19.2222 10.8333H11.4444C11.1389 10.8333 10.8889 10.5708 10.8889 10.25C10.8889 9.92917 11.1389 9.66667 11.4444 9.66667ZM10.8889 13.75C10.8889 13.4292 11.1389 13.1667 11.4444 13.1667H19.2222C19.5278 13.1667 19.7778 13.4292 19.7778 13.75C19.7778 14.0708 19.5278 14.3333 19.2222 14.3333H11.4444C11.1389 14.3333 10.8889 14.0708 10.8889 13.75ZM7.69444 8.20833V8.7151C7.95486 8.75885 8.20139 8.82083 8.42708 8.88646C8.79861 8.98854 9.01736 9.38958 8.92014 9.77969C8.82292 10.1698 8.44097 10.3995 8.06944 10.2974C7.6875 10.1917 7.31944 10.1151 6.98611 10.1078C6.71181 10.1042 6.43056 10.1734 6.23958 10.2901C6.07292 10.3922 6.02431 10.4943 6.02431 10.6292C6.02431 10.6948 6.02778 10.7568 6.20833 10.8734C6.42708 11.012 6.74653 11.1177 7.19097 11.2563L7.21528 11.2635C7.60417 11.3875 8.10417 11.5443 8.50347 11.8104C8.95139 12.1057 9.34722 12.587 9.35764 13.3271C9.36806 14.0891 8.99306 14.6432 8.49653 14.9677C8.24653 15.1318 7.96875 15.2339 7.69097 15.2958V15.7917C7.69097 16.1927 7.37847 16.5208 6.99653 16.5208C6.61458 16.5208 6.30208 16.1927 6.30208 15.7917V15.2594C5.94444 15.1792 5.60764 15.0589 5.32292 14.9531C5.25 14.9276 5.18056 14.9021 5.11111 14.8766C4.74653 14.749 4.55208 14.337 4.67361 13.9542C4.79514 13.5714 5.1875 13.3672 5.55208 13.4948C5.63889 13.524 5.72222 13.5568 5.80208 13.5823C6.27431 13.75 6.63542 13.8776 7.02083 13.8922C7.31944 13.9031 7.59375 13.8339 7.76389 13.7208C7.90625 13.6297 7.97222 13.5203 7.96875 13.338C7.96875 13.2323 7.94097 13.1557 7.76389 13.0391C7.54514 12.8932 7.22917 12.7875 6.79167 12.649L6.73264 12.6307C6.35417 12.5104 5.87847 12.3609 5.49653 12.1203C5.05556 11.8396 4.64236 11.3729 4.63889 10.6365C4.63542 9.86719 5.04861 9.3349 5.53472 9.03594C5.77431 8.88646 6.03819 8.78802 6.30556 8.72604V8.20833C6.30556 7.80729 6.61806 7.47917 7 7.47917C7.38194 7.47917 7.69444 7.80729 7.69444 8.20833Z" fill="#F1F1F1"/>
                            </svg>
                          </div>
                        </span>
                        <Media.Body className="ml-2 text-left">
                          <span className="text-medium font-weight-bold">
                            {formatPrice(this.props.game.rebuy.player_minimum_re_buy)}/{formatPrice(this.props.game.rebuy.player_maximum_re_buy)}
                          </span>
                          <div className="chat-status small text-body font-weight-bold pt-1">
                            <span className="text-medium font-weight-bold text-body">
                              Re-Buy Min/Max
                            </span>
                          </div>
                        </Media.Body>
                      </Badge>
                    </Col>
                    <Col
                      // sm={4} md={4}
                      className="ml-3"                                                
                      style={{ opacity: `${this.state.remainingDeposit ? "0.75" : "1.0"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        // pill variant="default"
                        className="d-flex align-items-center p-2" style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.22222 5C2.99653 5 2 6.04635 2 7.33333V16.6667C2 17.9536 2.99653 19 4.22222 19H19.7778C21.0035 19 22 17.9536 22 16.6667V7.33333C22 6.04635 21.0035 5 19.7778 5H4.22222ZM11.4444 9.66667H19.2222C19.5278 9.66667 19.7778 9.92917 19.7778 10.25C19.7778 10.5708 19.5278 10.8333 19.2222 10.8333H11.4444C11.1389 10.8333 10.8889 10.5708 10.8889 10.25C10.8889 9.92917 11.1389 9.66667 11.4444 9.66667ZM10.8889 13.75C10.8889 13.4292 11.1389 13.1667 11.4444 13.1667H19.2222C19.5278 13.1667 19.7778 13.4292 19.7778 13.75C19.7778 14.0708 19.5278 14.3333 19.2222 14.3333H11.4444C11.1389 14.3333 10.8889 14.0708 10.8889 13.75ZM7.69444 8.20833V8.7151C7.95486 8.75885 8.20139 8.82083 8.42708 8.88646C8.79861 8.98854 9.01736 9.38958 8.92014 9.77969C8.82292 10.1698 8.44097 10.3995 8.06944 10.2974C7.6875 10.1917 7.31944 10.1151 6.98611 10.1078C6.71181 10.1042 6.43056 10.1734 6.23958 10.2901C6.07292 10.3922 6.02431 10.4943 6.02431 10.6292C6.02431 10.6948 6.02778 10.7568 6.20833 10.8734C6.42708 11.012 6.74653 11.1177 7.19097 11.2563L7.21528 11.2635C7.60417 11.3875 8.10417 11.5443 8.50347 11.8104C8.95139 12.1057 9.34722 12.587 9.35764 13.3271C9.36806 14.0891 8.99306 14.6432 8.49653 14.9677C8.24653 15.1318 7.96875 15.2339 7.69097 15.2958V15.7917C7.69097 16.1927 7.37847 16.5208 6.99653 16.5208C6.61458 16.5208 6.30208 16.1927 6.30208 15.7917V15.2594C5.94444 15.1792 5.60764 15.0589 5.32292 14.9531C5.25 14.9276 5.18056 14.9021 5.11111 14.8766C4.74653 14.749 4.55208 14.337 4.67361 13.9542C4.79514 13.5714 5.1875 13.3672 5.55208 13.4948C5.63889 13.524 5.72222 13.5568 5.80208 13.5823C6.27431 13.75 6.63542 13.8776 7.02083 13.8922C7.31944 13.9031 7.59375 13.8339 7.76389 13.7208C7.90625 13.6297 7.97222 13.5203 7.96875 13.338C7.96875 13.2323 7.94097 13.1557 7.76389 13.0391C7.54514 12.8932 7.22917 12.7875 6.79167 12.649L6.73264 12.6307C6.35417 12.5104 5.87847 12.3609 5.49653 12.1203C5.05556 11.8396 4.64236 11.3729 4.63889 10.6365C4.63542 9.86719 5.04861 9.3349 5.53472 9.03594C5.77431 8.88646 6.03819 8.78802 6.30556 8.72604V8.20833C6.30556 7.80729 6.61806 7.47917 7 7.47917C7.38194 7.47917 7.69444 7.80729 7.69444 8.20833Z" fill="#F1F1F1"/>
                            </svg>
                          </div>
                        </span>
                        <Media.Body className="ml-2 text-left">
                          <span className="text-medium font-weight-bold">
                            {formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}/{formatPrice(this.props.game.data.current_game_values.table_maximum_buy_in)}
                          </span>
                          <div className="chat-status small text-body font-weight-bold pt-1">
                            <span className="text-medium font-weight-bold text-body">
                              Buy-In Min/Max
                            </span>
                          </div>
                        </Media.Body>
                      </Badge>
                    </Col>
                  </Row>
                  <div className="fill-modal-button-group-width mt-3">
                    {this.renderReBuyButtonGroup()}
                  </div>                 
                  <div className="w-50 mt-3 fill-modal-input">
                      <InputGroup size="lg" className="mb-3" style={{background: "linear-gradient(226.24deg, #005676 -92.19%, #000000 95.07%)", border: "1 solid rgba(29, 35, 45, 0.3)", borderRadius: "6px"}}>
                        <InputGroup.Prepend>
                          <InputGroup.Text style={{background: "rgba(241, 241, 241, 0.3)"}}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                            <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.987 9.48659C13.7755 9.32464 13.5556 9.17494 13.3277 9.03818C12.9045 8.77482 12.4638 8.54181 12.009 8.34099C11.4505 8.08126 10.8704 7.87324 10.2756 7.71942C9.66879 7.56369 9.04626 7.4809 8.42067 7.47262C7.75704 7.43215 7.09607 7.58924 6.51783 7.92494C6.30526 8.06821 6.1328 8.26571 6.01758 8.49795C5.90236 8.73019 5.84831 8.98907 5.86074 9.2492C5.85808 9.46391 5.90305 9.67648 5.99207 9.87093C6.08108 10.0654 6.21173 10.2367 6.37464 10.372C6.80257 10.7295 7.30339 10.9846 7.84005 11.1188C8.47479 11.3176 9.25601 11.5662 10.2813 11.8143C11.4719 12.1366 12.6256 12.5867 13.7236 13.1573C14.6201 13.6027 15.393 14.2712 15.9714 15.1015C16.5473 16.0505 16.8294 17.1552 16.781 18.2712C16.8121 19.3266 16.5871 20.3736 16.1263 21.3184C15.7115 22.1364 15.1098 22.8398 14.3722 23.3685C13.6289 23.8799 12.8034 24.253 11.9334 24.4709C10.9823 24.7036 10.0081 24.8223 9.03018 24.8247C7.98894 24.8284 6.95011 24.7214 5.93058 24.505C4.88131 24.2898 3.85214 23.9821 2.85458 23.5857C1.91345 23.2019 1.00657 22.7354 0.144021 22.1916L2.26111 17.8939C2.4927 18.105 2.74654 18.2888 3.01819 18.442C3.53248 18.7606 4.07161 19.0354 4.62996 19.2635C5.32068 19.5748 6.03016 19.8407 6.75406 20.0593C7.548 20.2873 8.37025 20.3954 9.19475 20.3802C9.87216 20.4366 10.551 20.288 11.1465 19.9528C11.3352 19.824 11.4894 19.6492 11.5956 19.4441C11.7018 19.2391 11.7567 19.0103 11.7549 18.7782C11.7611 18.5293 11.7033 18.2833 11.5874 18.0644C11.4715 17.8455 11.3014 17.6614 11.0943 17.5308C10.5436 17.1614 9.9431 16.8764 9.3118 16.6847L6.69947 15.8897C5.60649 15.5558 4.55099 15.1054 3.54991 14.546C2.79195 14.1166 2.15939 13.4885 1.71722 12.7262C1.28123 11.9088 1.06918 10.986 1.10348 10.0555C1.05639 8.70169 1.42103 7.36638 2.14737 6.23375C2.74767 5.21752 3.60701 4.38754 4.63316 3.83293C5.84942 3.2936 7.16204 3.01947 8.48754 3.02804C9.44929 3.02892 10.4078 3.14482 11.3432 3.37328C12.1768 3.61189 12.9927 3.911 13.7847 4.2684C14.5026 4.60561 15.2035 4.97958 15.8848 5.38881L13.987 9.48659Z" fill="#F1F1F1"/>
                              <path d="M9.02113 0.0117654L8.69189 2.38489L10.7696 2.6865L11.0989 0.313377L9.02113 0.0117654Z" fill="#F1F1F1"/>
                              <path d="M5.5093 25.3283L5.21436 27.4543L7.2921 27.7559L7.58704 25.6299L5.5093 25.3283Z" fill="#F1F1F1"/>
                              </svg>
                            </span>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          autoFocus
                          placeholder=""                          
                          style={{ color: "white", fontSize: "24px", fontWeight: "800", fontVariantNumeric: "lining-nums", borderColor: this.state.reBuyInput=== '' ? "#DE4A4A" : "#4FC7EC"}}
                          value={this.state.reBuyInput}
                          onChange={(e) => { this.onChangeReBuyAmount(e) }}
                          onKeyPress={(e) => { this.onSubmitKeypress(e) }} />                        
                      </InputGroup>
                    </div>                  
                  <div className={`text-center ${this.state.reBuyAmountHintColor} opacity-100 mb-2 h5 font-weight-bold`}>
                    {this.state.reBuyAmountHint}
                  </div>

                  {this.props.game.presence
                    ? <div className={`text-center text-white opacity-50 mb-2 small`}>{this.onHandlePresenceUpdate()}</div>
                    : <div className={`text-center text-white opacity-50 mb-2 small`}></div>}

                  <div className="text-center text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                    Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                  </div>

                  {/* <div className="mb-3" style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/> */}
                  <div                     
                    onClick={this.onSubmitReBuy}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>ReBuy</div></div>
                  </div>
                </Modal.Body>
                {/* / Re-Buy Modal */}
              </>
              : <>
                {/* Re-Buy Modal */}
                <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div>
                    <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                      Re-Buy
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>

                  <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none"
                        style={{ justifyContent: "center", }}>
                        <ResourceLoaderB
                          height="4rem" width="4rem" />
                      </Col>
                    </Row>
                  </Card>

                  <div className={`text-center text-white opacity-100 mb-3`}>
                    Re-buying currently not possible...
                  </div>

                  <div className="text-center text-white opacity-50 text-tiny mb-3">
                    Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                  </div>

                  {/* <div className="mb-3" style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/> */}
                  <div                     
                    onClick={this.props.close}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
                  </div>  
                </Modal.Body>
                {/* / Re-Buy Modal */}
              </>}
          </>
          : this.state.isFetching
            ? <>
              {/* Re-Buy Modal Fetching State */}
              <Modal.Body style={{
                borderRadius: "15px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "2px solid rgba(9, 134, 169, 0.7)",
                padding: "0.7rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div>
                  <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                    Re-Buy
                  </p>
                </div>

                <div className="fill-modal-hr"/>

                <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                  <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                    <Col
                      sm={12} md={12} lg={12}
                      className="d-flex align-items-center justify-content-center border-0 shadow-none">
                      <ResourceLoaderB
                        height="6rem" width="6rem" />
                    </Col>
                  </Row>
                </Card>

                <div className={`text-center text-white opacity-100 mb-3`}>
                  Waiting for Authentication...
                </div>

                <div className="text-center text-white opacity-50 text-tiny mb-3">
                  Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                </div>

                {/* <div className="fill-modal-hr"/> */}
                <div                     
                  onClick={this.props.close}
                  className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                  style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                  ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Cancel</div></div>
                </div> 
                {/* <Button
                  disabled
                  variant="instagram" block
                  onClick={this.props.close}
                  className="font-weight-bold">
                  Cancel
                </Button> */}
              </Modal.Body>
              {/* Re-Buy Modal Fetching State */}
            </>
            : <>
              {/* Re-Buy Modal Response */}
              {!this.state.reBuyResponse
                ? <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end">
                    <Form.Label
                      className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                      style={{marginTop: "2px"}}
                      onClick={this.props.close}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                      </svg>
                      </span>
                    </Form.Label>
                  </div>

                  <div>
                    <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                      Re-Buy
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>

                  <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none"
                        style={{ justifyContent: "center", }}>
                        <ResourceLoaderB
                          height="4rem" width="4rem" />
                      </Col>
                    </Row>
                  </Card>

                  <div className={`text-center text-white opacity-100 mb-3`}>
                    Re-buying currently not possible...
                  </div>

                  <div className="text-center text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                    Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                  </div>

                  {/* <div className="fill-modal-hr"/> */}
                  <div                     
                    onClick={this.props.close}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
                  </div>
                  {/* <Button
                    variant="instagram" block
                    onClick={this.props.close}
                    className="font-weight-bold">
                    Accept
                  </Button> */}
                </Modal.Body>
                : <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end">
                    <Form.Label
                      className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                      style={{marginTop: "2px"}}
                      onClick={this.props.close}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                      </svg>
                      </span>
                    </Form.Label>
                  </div>

                  {this.state.reBuyResponse.status === 'success'
                    ? <div>
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                        Re-Buy Success
                      </p>
                    </div>
                    : <div>
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                        Re-Buy Failed
                      </p>
                    </div>}

                    <div className="fill-modal-hr"/>

                  <Card className="d-flex mt-3 mb-0 bg-transparent border-0 shadow-none" style={{width: "80%"}}>
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none"
                        style={{ justifyContent: "center", }}>
                        <Card.Body className="py-0 bg-light" style={{
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                          borderBottomLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}>
                          <Media className="pb-0 d-flex align-items-center">

                            {this.state.reBuyResponse.status === 'success'
                              ? <div>
                                <span
                                  className="svg-icon svg-icon-muted svg-icon-2hx ui-w-100 cursor-pointer mr-2"
                                  onClick={() => this.props.close()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                                  </svg>
                                </span>
                              </div>
                              : <div>
                                <span
                                  className="svg-icon svg-icon-muted svg-icon-2hx ui-w-100 cursor-pointer mr-2"
                                  onClick={() => this.props.close()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                  </svg>
                                </span>
                              </div>}

                            <Media.Body className="ml-3 p-4">
                              <Row className="mb-0">
                                <Col md={3} className="text-muted font-weight-bold d-flex">
                                  Amount
                                </Col>
                                <Col md={9} className="font-weight-bold d-flex">
                                  {formatPrice(this.state.reBuyResponse.re_buy_amount)}
                                </Col>
                              </Row>

                              {this.state.reBuyResponse.status === 'success'
                                ? <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">
                                    Deposit
                                  </Col>
                                  <Col md={9} className="font-weight-bold d-flex">
                                    {!this.props.game.data.demo_mode
                                      ? formatPrice(this.state.reBuyResponse.live_deposit)
                                      : formatPrice(this.state.reBuyResponse.practice_deposit)}
                                  </Col>
                                </Row>
                                : <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">
                                    Game
                                  </Col>
                                  <Col md={9} className="font-weight-bold d-flex small">
                                    {this.state.reBuyResponse.game_id.substr(-12)}
                                  </Col>
                                </Row>}
                            </Media.Body>

                            {this.state.reBuyResponse.status === 'success'
                              ? <Button
                                variant="light md-btn-flat rounded-pill"
                                className="d-flex align-items-center"
                                disabled={true}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                                  </svg>
                                </span>
                                <span className="ml-2">
                                  Success
                                </span>
                              </Button>
                              : <Button
                                variant="light md-btn-flat rounded-pill"
                                className="d-flex align-items-center"
                                disabled={true}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                  </svg>
                                </span>
                                <span className="ml-2">
                                  Failed
                                </span>
                              </Button>}

                          </Media>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>

                  <div
                    className={`${this.state.reBuyResponse.status === 'success'
                      ? 'join-game-success-progress'
                      : 'join-game-failed-progress'} mb-3`}
                    style={{
                      height: "6px",
                      borderTopLeftRadius: "0px",
                      borderTopRightRadius: "0px",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      backgroundColor: "rgb(0,0,0,0.2)",
                    }} />

                  {this.state.reBuyResponse.status === 'success'
                    ? <div>
                      <p className="text-white text-left font-weight-bold mb-3 small">
                        Thank you, re-buy was successful. Have fun playing!
                      </p>
                    </div>
                    : <div>
                      <p className="text-white text-left font-weight-bold mb-3 small">
                        Request could not be completed successfully. Please make sure you have enough funds to play this game or change your daily wagering/loss limit in your account settings.
                      </p>
                    </div>}

                    <div className="fill-modal-hr"/>

                  <div className="text-left text-white opacity-50 text-tiny mb-3">
                    Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                  </div>

                  {/* <div className="mb-3 fill-modal-hr"/> */}

                  {this.state.reBuyResponse.status === 'success'
                    ? 
                    <div                     
                      onClick={this.props.close}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Continue</div></div>
                    </div>                    
                    : 
                    <div                     
                      onClick={this.props.close}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Close</div></div>
                    </div>
                    }

                </Modal.Body>}
              {/* Re-Buy Modal Response */}
            </>}
      </>
    )
  }
}

export default ReBuy