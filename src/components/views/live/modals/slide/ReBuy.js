import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, Card, Col, Form, InputGroup, Media, Modal, Row } from 'react-bootstrap'

import { formatPrice } from '../../utilities/TextPreprocessing'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'

class ReBuy extends Component {

  constructor(props) {
    super(props)

    this.requestTimer = null

    this.renderReBuyButtonGroup = this.renderReBuyButtonGroup.bind(this)
    this.onChangeReBuyAmount = this.onChangeReBuyAmount.bind(this)
    this.onChangeReBuyAmountByOption = this.onChangeReBuyAmountByOption.bind(this)
    this.onSubmitReBuy = this.onSubmitReBuy.bind(this)
    this.onSubmitKeypress = this.onSubmitKeypress.bind(this)

    this.state = {
      isFetching: false,
      reBuyInput: '',
      reBuyAmount: 0,
      reBuyAmountHint: 'Please enter a valid re-buy amount.',
      reBuyAmountHintColor: 'text-white',
      projectedBalance: null,
      remainingDeposit: null,
    }
  }

  componentDidMount() {
    this.props.client.sendReBuyRequest()
  }

  componentWillUnmount() {
    clearInterval(this.requestTimer)
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
            this.props.close()
          }, 1500)
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
            this.props.close()
          }, 1500)
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
              this.props.close()
            }, 1500)
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
              this.props.close()
            }, 1500)
          })

        }
      }
    }
  }

  renderReBuyButtonGroup() {
    if (this.props.game.rebuy) {
      var minReBuy = Number(parseFloat(this.props.game.rebuy.player_minimum_re_buy).toFixed(2))
      var maxReBuy = Number(parseFloat(this.props.game.rebuy.player_maximum_re_buy).toFixed(2))
      var x11ReBuy = Number(parseFloat(Math.round(Number(((maxReBuy - minReBuy) / 4) + minReBuy))).toFixed(2))
      var x21ReBuy = Number(parseFloat(Math.round(Number(((maxReBuy - minReBuy) / 2) + minReBuy))).toFixed(2))
      return (
        <ButtonGroup className="mb-3 w-100">
          {minReBuy > 0 && (
            <Button
              variant="default"
              className="font-weight-bold mr-2 h5 mb-0"
              style={{ borderRadius: "5px", }}
              onClick={() => { this.onChangeReBuyAmountByOption(minReBuy) }}>
              {formatPrice(minReBuy)}
              <div className="text-tiny text-body mb-0">Choose</div>
            </Button>
          )}
          {x11ReBuy > 0 && (
            <Button
              variant="default"
              className="font-weight-bold mr-2 h5 mb-0"
              style={{ borderRadius: "5px", }}
              onClick={() => { this.onChangeReBuyAmountByOption(x11ReBuy) }}>
              {formatPrice(x11ReBuy)}
              <div className="text-tiny text-body mb-0">Choose</div>
            </Button>
          )}
          {x21ReBuy > 0 && (
            <Button
              variant="default"
              className="font-weight-bold mr-2 h5 mb-0"
              style={{ borderRadius: "5px", }}
              onClick={() => { this.onChangeReBuyAmountByOption(x21ReBuy) }}>
              {formatPrice(x21ReBuy)}
              <div className="text-tiny text-body mb-0">Choose</div>
            </Button>
          )}
          {maxReBuy > 0 && (
            <Button
              variant="default"
              className="font-weight-bold mr-2 h5 mb-0"
              style={{ borderRadius: "5px", }}
              onClick={() => { this.onChangeReBuyAmountByOption(maxReBuy) }}>
              {formatPrice(maxReBuy)}
              <div className="text-tiny text-body mb-0">Choose</div>
            </Button>
          )}
        </ButtonGroup>
      )
    } else {
      return (null)
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.props.game.profile && this.props.game.player && this.props.game.rebuy && !this.state.isFetching
          ? <>
            {this.props.game.rebuy.player_maximum_re_buy > 0
              ? <>
                {/* Re-Buy Modal */}
                <Modal.Body style={{ margin: "0" }}>
                  <h4 className="text-left mb-4 font-weight-bold">
                    Re-Buy
                  </h4>

                  <div className="text-left text-left text-white opacity-50 small mb-3">
                    Re-buy to recharge your player balance. Re-buying is only possible if you are not currently participating in a game. The maximum or minimum re-buy amount depends on the respective table stakes.
                  </div>

                  <hr className="border-light m-0 pt-2 pb-2" />

                  <Card className="d-flex w-100 mb-3 bg-transparent shadow-none border-0">
                    <Row className="mt-0">
                      <Col className="d-flex justify-content-center">
                        <Row className="w-100">
                          <Col
                            sm={6} md={6}
                            className="pl-0 pr-0 mb-0"
                            style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                            <Badge
                              pill variant="default"
                              className={`d-flex align-items-center p-3 ${this.state.remainingDeposit && ("bg-flash-deposit-1")}`}
                              style={{
                                borderRadius: "1rem 0rem 0rem 0rem",
                              }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                                  <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                                </svg>
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
                                          ? <span>Remaining</span>
                                          : <span>Deposit</span>
                                        }
                                      </>
                                      : <>
                                        {this.state.remainingDeposit
                                          ? <span>Remaining (Play Money)</span>
                                          : <span>Deposit (Play Money)</span>
                                        }
                                      </>}
                                  </span>
                                </div>
                              </Media.Body>
                            </Badge>
                          </Col>

                          <Col
                            sm={6} md={6}
                            className="pl-0 pr-0 mb-0"
                            style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                            <Badge
                              pill variant="default"
                              className={`d-flex align-items-center p-3 ${this.state.remainingDeposit && ("bg-flash-deposit-1")}`}
                              style={{
                                borderRadius: "0rem 1rem 0rem 0rem",
                              }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.3" d="M11 20.8129C11 21.4129 10.5 21.9129 9.89999 21.8129C5.49999 21.2129 2 17.5128 2 12.9128C2 8.31283 5.39999 4.51281 9.89999 4.01281C10.5 3.91281 11 4.41281 11 5.01281V20.8129Z" fill="white" />
                                  <path d="M13 18.8129C13 19.4129 13.5 19.9129 14.1 19.8129C18.5 19.2129 22 15.5128 22 10.9128C22 6.31283 18.6 2.51281 14.1 2.01281C13.5 1.91281 13 2.41281 13 3.01281V18.8129Z" fill="white" />
                                </svg>
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

                          <Col
                            sm={6} md={6}
                            className="pl-0 pr-0"
                            style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                            <Badge
                              pill variant="default"
                              className="d-flex align-items-center p-3"
                              style={{
                                borderRadius: "0rem 0rem 0rem 1rem",
                              }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                                  <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                                </svg>
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
                            sm={6} md={6}
                            className="pl-0 pr-0"
                            style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                            <Badge
                              pill variant="default"
                              className="d-flex align-items-center p-3"
                              style={{
                                borderRadius: "0rem 0rem 1rem 0rem",
                              }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                                  <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                                </svg>
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
                      </Col>
                    </Row>
                  </Card>

                  {this.renderReBuyButtonGroup()}

                  <InputGroup size="md" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                            <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                          </svg>
                        </span>
                      </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control
                      autoFocus
                      placeholder="Your re-buy amount"
                      className="bg-light"
                      style={{ color: "white", fontSize: "20px", }}
                      value={this.state.reBuyInput}
                      onChange={(e) => { this.onChangeReBuyAmount(e) }}
                      onKeyPress={(e) => { this.onSubmitKeypress(e) }} />
                    <InputGroup.Append>
                      <Button
                        variant="primary"
                        onClick={this.onSubmitReBuy}
                        className="font-weight-bold">
                        Re-Buy
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>

                  <div className={`text-left text-left ${this.state.reBuyAmountHintColor} opacity-100 mb-3`}>
                    {this.state.reBuyAmountHint}
                  </div>

                  <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>

                  <hr className="border-light m-0 py-2" />

                  <Button
                    variant="instagram" block
                    onClick={this.props.close}
                    className="font-weight-bold">
                    Continue
                  </Button>
                </Modal.Body>
                {/* / Re-Buy Modal */}
              </>
              : <>
                {/* Re-Buy Modal */}
                <Modal.Body style={{ margin: "0" }}>
                  <h4 className="text-left mb-4 font-weight-bold">
                    Re-Buy
                  </h4>

                  <div className="text-left text-left text-white opacity-50 small mb-3">
                    Re-buy to recharge your player balance. Re-buying is only possible if you are not currently participating in a game. The maximum or minimum re-buy amount depends on the respective table stakes.
                  </div>

                  <hr className="border-light m-0 pt-2 pb-2" />

                  <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
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

                  <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>

                  <hr className="border-light m-0 py-2" />

                  <Button
                    variant="instagram" block
                    onClick={this.props.close}
                    className="font-weight-bold">
                    Accept
                  </Button>
                </Modal.Body>
                {/* / Re-Buy Modal */}
              </>}
          </>
          : this.state.isFetching
            ? <>
              {/* Re-Buy Modal Fetching State */}
              <Modal.Body style={{ margin: "0" }}>
                <h4 className="text-left mb-4 font-weight-bold">
                  Re-Buy
                </h4>

                <div className="text-left text-left text-white opacity-50 small mb-3">
                  Re-buy to recharge your player balance. Re-buying is only possible if you are not currently participating in a game. The maximum or minimum re-buy amount depends on the respective table stakes.
                </div>

                <hr className="border-light m-0 pt-2 pb-2" />

                <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
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

                <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                  Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                </div>

                <hr className="border-light m-0 py-2" />

                <Button
                  disabled
                  variant="instagram" block
                  onClick={this.props.close}
                  className="font-weight-bold">
                  Cancel
                </Button>
              </Modal.Body>
              {/* Re-Buy Modal Fetching State */}
            </>
            : <>
              {/* Re-Buy Modal Failed State */}
              <Modal.Body style={{ margin: "0" }}>
                <h4 className="text-left mb-4 font-weight-bold">
                  Re-Buy
                </h4>

                <div className="text-left text-left text-white opacity-50 small mb-3">
                  Re-buy to recharge your player balance. Re-buying is only possible if you are not currently participating in a game. The maximum or minimum re-buy amount depends on the respective table stakes.
                </div>

                <hr className="border-light m-0 pt-2 pb-2" />

                <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
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

                <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                  Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                </div>

                <hr className="border-light m-0 py-2" />

                <Button
                  variant="instagram" block
                  onClick={this.props.close}
                  className="font-weight-bold">
                  Accept
                </Button>
              </Modal.Body>
              {/* Re-Buy Modal Failed State */}
            </>}
      </>
    )
  }
}

export default ReBuy