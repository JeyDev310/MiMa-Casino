import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Media, Modal, ProgressBar, Row } from 'react-bootstrap'

// import { RSButton } from 'reactsymbols-kit'

import LiveSettingsButtons from '../panel/LiveSettingsButtons'

import {
  formatPrice,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'
import ResourceLoaderN from '../../../utilities/loaders/ResourceLoaderN'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/join.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class JoinGame extends Component {

  constructor(props) {
    super(props)

    this.fetchTimer = null
    this.responseTimer = null

    this.renderBuyInButtonGroup = this.renderBuyInButtonGroup.bind(this)
    this.onHandleRefreshPresence = this.onHandleRefreshPresence.bind(this)
    this.onHandlePresenceUpdate = this.onHandlePresenceUpdate.bind(this)
    this.onHandleBuyInResponse = this.onHandleBuyInResponse.bind(this)
    this.onHandleDepositCheck = this.onHandleDepositCheck.bind(this)
    this.onSubmitBuyInRequest = this.onSubmitBuyInRequest.bind(this)
    this.onChangeBuyInAmount = this.onChangeBuyInAmount.bind(this)
    this.onChangeBuyInAmountByOption = this.onChangeBuyInAmountByOption.bind(this)
    this.onSubmitBuyIn = this.onSubmitBuyIn.bind(this)
    this.onSubmitKeypress = this.onSubmitKeypress.bind(this)

    this.state = {
      init: false,
      isRequesting: true,
      isFetching: false,
      joinable: false,
      playing: false,
      spectator: true,
      lowDeposit: false,
      buyInInput: '',
      buyInAmount: 0,
      buyInResponse: null,
      buyInAmountHint: 'Please enter a valid buy-in amount.',
      buyInAmountHintColor: 'text-white',
      buyInSelectedSeat: null,
      remainingDeposit: null,      
    }
  }

  componentDidMount() {
    this.onHandleRefreshPresence()
    this.props.client.sendBuyInRequest()
    if (this.props.selectedSeat !== 0) {
      this.setState({
        buyInSelectedSeat: this.props.selectedSeat,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.presence !== this.props.game.presence) {
      this.onHandleRefreshPresence()
    }
    if (prevProps.game.buyin !== this.props.game.buyin) {
      this.setState({
        isRequesting: false,
      }, () => {
        this.onHandleDepositCheck()
      })
    }
    if (prevProps.game.buyin_res !== this.props.game.buyin_res) {
      this.onHandleBuyInResponse()
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchTimer)
    clearInterval(this.responseTimer)
    this.props.select(0, true)
  }

  onSubmitBuyInRequest() {
    this.onHandleRefreshPresence()
    this.props.client.sendBuyInRequest()
    if (this.props.selectedSeat !== 0) {
      this.setState({
        buyInSelectedSeat: this.props.selectedSeat,
      })
    }
  }

  onChangeBuyInAmount(e) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        buyInInput: e.target.value,        
      })
      let amount = parseFloat(e.target.value)
      if (
        this.props.game.data.current_game_values.table_minimum_buy_in <= amount &&
        amount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
        amount <= this.props.game.buyin.live_deposit &&
        amount > 0
      ) {
        this.setState({
          buyInAmount: e.target.value,
          buyInAmountHint: `Join the game with a buy-in of $${amount.toFixed(2)}.`,
          buyInAmountHintColor: 'text-white',
          remainingDeposit: parseFloat(this.props.game.profile.live_deposit - amount).toFixed(2),
        })
      } else {
        this.setState({
          buyInAmount: 0,
          buyInAmountHint: `Please enter a valid buy-in amount.`,
          buyInAmountHintColor: 'text-danger',
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        buyInInput: e.target.value,
      })
      let amount = parseFloat(e.target.value)
      if (
        this.props.game.data.current_game_values.table_minimum_buy_in <= amount &&
        amount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
        amount <= this.props.game.buyin.practice_deposit &&
        amount > 0
      ) {
        this.setState({
          buyInAmount: e.target.value,
          buyInAmountHint: `Join the game with a buy-in of $${amount.toFixed(2)}.`,
          buyInAmountHintColor: 'text-white',
          remainingDeposit: parseFloat(this.props.game.profile.practice_deposit - amount).toFixed(2),
        })
      } else {
        this.setState({
          buyInAmount: 0,
          buyInAmountHint: `Please enter a valid buy-in amount.`,
          buyInAmountHintColor: 'text-danger',
          remainingDeposit: null,
        })
      }
    }
  }

  onChangeBuyInAmountByOption(value) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        buyInInput: value,
      })
      let amount = parseFloat(value)
      if (
        this.props.game.data.current_game_values.table_minimum_buy_in <= amount &&
        amount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
        amount <= this.props.game.buyin.live_deposit &&
        amount > 0
      ) {
        this.setState({
          buyInAmount: amount,
          buyInAmountHint: `Join the game with a buy-in of $${amount.toFixed(2)}.`,
          buyInAmountHintColor: 'text-white',
          remainingDeposit: parseFloat(this.props.game.profile.live_deposit - amount).toFixed(2),
        })
      } else {
        this.setState({
          buyInAmount: 0,
          buyInAmountHint: `Please enter a valid buy-in amount.`,
          buyInAmountHintColor: 'text-danger',
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        buyInInput: value,
      })
      let amount = parseFloat(value)
      if (
        this.props.game.data.current_game_values.table_minimum_buy_in <= amount &&
        amount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
        amount <= this.props.game.buyin.practice_deposit &&
        amount > 0
      ) {
        this.setState({
          buyInAmount: amount,
          buyInAmountHint: `Join the game with a buy-in of $${amount.toFixed(2)}.`,
          buyInAmountHintColor: 'text-white',
          remainingDeposit: parseFloat(this.props.game.profile.practice_deposit - amount).toFixed(2),
        })
      } else {
        this.setState({
          buyInAmount: 0,
          buyInAmountHint: `Please enter a valid buy-in amount.`,
          buyInAmountHintColor: 'text-danger',
          remainingDeposit: null,
        })
      }
    }
  }

  onSubmitBuyIn() {
    if (!this.props.game.data.demo_mode) {
      if (this.state.buyInSelectedSeat > 0) {
        if (
          this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
          this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
          this.state.buyInAmount <= this.props.game.buyin.live_deposit &&
          this.state.buyInSelectedSeat > 0 &&
          this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat) &&
          this.state.buyInAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            this.props.client.sendBuyInProcess(
              0,
              this.props.game.data.current_round,
              {
                buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                seat_request: this.state.buyInSelectedSeat,
              },
            )
          })
        }
        if (!this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat)) {
          this.setState({
            buyInAmountHint: `Seat #${this.state.buyInSelectedSeat} is already occupied. Please choose another seat.`,
          })
        }
      }
      if (this.state.buyInSelectedSeat === 0) {
        if (
          this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
          this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
          this.state.buyInAmount <= this.props.game.buyin.live_deposit &&
          this.props.game.presence.seats.available.filter(x => x !== null).length > 0 &&
          this.state.buyInAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            var available = this.props.game.presence.seats.available.filter(x => x !== null)
            this.props.client.sendBuyInProcess(
              0,
              this.props.game.data.current_round,
              {
                buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                seat_request: available[0],
              },
            )
          })
        }
        if (this.props.game.presence.seats.available.length === 0) {
          this.setState({
            buyInAmountHint: `Sorry, all seats are currently occupied. Please try again later.`,
          })
        }
      }
    } else {
      if (this.state.buyInSelectedSeat > 0) {
        if (
          this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
          this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
          this.state.buyInAmount <= this.props.game.buyin.practice_deposit &&
          this.state.buyInSelectedSeat > 0 &&
          this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat) &&
          this.state.buyInAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            this.props.client.sendBuyInProcess(
              0,
              this.props.game.data.current_round,
              {
                buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                seat_request: this.state.buyInSelectedSeat,
              },
            )
          })
        }
        if (!this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat)) {
          this.setState({
            buyInAmountHint: `Seat #${this.state.buyInSelectedSeat} is already occupied. Please choose another seat.`,
          })
        }
      }
      if (this.state.buyInSelectedSeat === 0) {
        if (
          this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
          this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
          this.state.buyInAmount <= this.props.game.buyin.practice_deposit &&
          this.props.game.presence.seats.available.filter(x => x !== null).length > 0 &&
          this.state.buyInAmount > 0
        ) {
          this.setState({
            isFetching: true,
          }, () => {
            var available = this.props.game.presence.seats.available.filter(x => x !== null)
            this.props.client.sendBuyInProcess(
              0,
              this.props.game.data.current_round,
              {
                buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                seat_request: available[0],
              },
            )
          })
        }
        if (this.props.game.presence.seats.available.length === 0) {
          this.setState({
            buyInAmountHint: `Sorry, all seats are currently occupied. Please try again later.`,
          })
        }
      }
    }
  }

  onSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (!this.props.game.data.demo_mode) {
        if (this.state.buyInSelectedSeat > 0) {
          if (
            this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
            this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
            this.state.buyInAmount <= this.props.game.buyin.live_deposit &&
            this.state.buyInSelectedSeat > 0 &&
            this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat) &&
            this.state.buyInAmount > 0
          ) {
            this.setState({
              isFetching: true,
            }, () => {
              this.props.client.sendBuyInProcess(
                0,
                this.props.game.data.current_round,
                {
                  buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                  seat_request: this.state.buyInSelectedSeat,
                },
              )
            })
          }
          if (!this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat)) {
            this.setState({
              buyInAmountHint: `Seat #${this.state.buyInSelectedSeat} is already occupied. Please choose another seat.`,
            })
          }
        }
        if (this.state.buyInSelectedSeat === 0) {
          if (
            this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
            this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
            this.state.buyInAmount <= this.props.game.buyin.live_deposit &&
            this.props.game.presence.seats.available.filter(x => x !== null).length > 0 &&
            this.state.buyInAmount > 0
          ) {
            this.setState({
              isFetching: true,
            }, () => {
              var available = this.props.game.presence.seats.available.filter(x => x !== null)
              this.props.client.sendBuyInProcess(
                0,
                this.props.game.data.current_round,
                {
                  buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                  seat_request: available[0],
                },
              )
            })
          }
          if (this.props.game.presence.seats.available.length === 0) {
            this.setState({
              buyInAmountHint: `Sorry, all seats are currently occupied. Please try again later.`,
            })
          }
        }
      } else {
        if (this.state.buyInSelectedSeat > 0) {
          if (
            this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
            this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
            this.state.buyInAmount <= this.props.game.buyin.practice_deposit &&
            this.state.buyInSelectedSeat > 0 &&
            this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat) &&
            this.state.buyInAmount > 0
          ) {
            this.setState({
              isFetching: true,
            }, () => {
              this.props.client.sendBuyInProcess(
                0,
                this.props.game.data.current_round,
                {
                  buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                  seat_request: this.state.buyInSelectedSeat,
                },
              )
            })
          }
          if (!this.props.game.presence.seats.available.includes(this.state.buyInSelectedSeat)) {
            this.setState({
              buyInAmountHint: `Seat #${this.state.buyInSelectedSeat} is already occupied. Please choose another seat.`,
            })
          }
        }
        if (this.state.buyInSelectedSeat === 0) {
          if (
            this.props.game.data.current_game_values.table_minimum_buy_in <= this.state.buyInAmount &&
            this.state.buyInAmount <= this.props.game.data.current_game_values.table_maximum_buy_in &&
            this.state.buyInAmount <= this.props.game.buyin.practice_deposit &&
            this.props.game.presence.seats.available.filter(x => x !== null).length > 0 &&
            this.state.buyInAmount > 0
          ) {
            this.setState({
              isFetching: true,
            }, () => {
              var available = this.props.game.presence.seats.available.filter(x => x !== null)
              this.props.client.sendBuyInProcess(
                0,
                this.props.game.data.current_round,
                {
                  buy_in_amount: parseFloat(this.state.buyInAmount).toFixed(2),
                  seat_request: available[0],
                },
              )
            })
          }
          if (this.props.game.presence.seats.available.length === 0) {
            this.setState({
              buyInAmountHint: `Sorry, all seats are currently occupied. Please try again later.`,
            })
          }
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

  onHandleDepositCheck() {
    if (!this.props.game.data.demo_mode) {
      if (
        this.props.game.data &&
        this.props.game.buyin
      ) {
        if (
          this.props.game.buyin.live_deposit < this.props.game.data.current_game_values.table_minimum_buy_in
        ) {
          this.setState({
            init: false,
            joinable: false,
            lowDeposit: true,
          })
        } else {
          this.setState({
            lowDeposit: false,
          })
        }
      }
    } else {
      if (
        this.props.game.data &&
        this.props.game.buyin
      ) {
        if (
          this.props.game.buyin.practice_deposit < this.props.game.data.current_game_values.table_minimum_buy_in
        ) {
          this.setState({
            init: false,
            joinable: false,
            lowDeposit: true,
          })
        } else {
          this.setState({
            lowDeposit: false,
          })
        }
      }
    }
  }

  renderBuyInButtonGroup() {
    if (this.props.game.data) {
      var minBuyIn = Number(this.props.game.data.current_game_values.table_minimum_buy_in)
      var maxBuyIn = Number(this.props.game.data.current_game_values.table_maximum_buy_in)
      var x1BuyIn = Math.round(Number(((maxBuyIn - minBuyIn) / 4) + minBuyIn))
      var x2BuyIn = Math.round(Number(((maxBuyIn - minBuyIn) / 2) + minBuyIn))
      return (
        <Row className="mb-3">
          <Col className="p-1">
            <Button variant="default" className="w-100 mb-2 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === minBuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(minBuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(minBuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col className="p-1">
            <Button variant="default" className="w-100 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === x1BuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(x1BuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x1BuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col className="p-1">
            <Button variant="default" className="w-100 px-4"style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput ===x2BuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(x2BuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x2BuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col className="p-1">
            <Button variant="default" className="w-100 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === maxBuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(maxBuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(maxBuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
        </Row>
      )
    } else {
      return (null)
    }
  }

  onHandleBuyInResponse() {
    this.fetchTimer = setTimeout(() => {
      this.setState({
        isFetching: false,
        buyInResponse: this.props.game.buyin_res,
      }, () => {
        if (this.props.game.buyin_res.status === 'success') {
          this.responseTimer = setTimeout(() => {
            this.props.close()
          }, 2500)
        } else {
          this.responseTimer = setTimeout(() => {
            this.setState({
              buyInResponse: null,
            })
          }, 2500)
        }
      })
    }, 100)
  }

  onHandleRenderSeatIcon(seat) {
    switch (seat) {
      case 1:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.96875 13.5625V9.01562C12.0781 8.92188 13.5547 8.78125 14.3984 8.59375C15.7422 8.29687 16.8359 7.70312 17.6797 6.8125C18.2578 6.20312 18.6953 5.39062 18.9922 4.375C19.1641 3.76562 19.25 3.3125 19.25 3.01562H24.8047V37H17.9609V13.5625H9.96875Z" fill="white" />
          </svg>
        )

      case 2:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.14062 37C8.20312 34.5625 8.72656 32.3359 9.71094 30.3203C10.6641 28.0547 12.9141 25.6562 16.4609 23.125C19.5391 20.9219 21.5312 19.3438 22.4375 18.3906C23.8281 16.9062 24.5234 15.2812 24.5234 13.5156C24.5234 12.0781 24.125 10.8828 23.3281 9.92969C22.5312 8.97656 21.3906 8.5 19.9062 8.5C17.875 8.5 16.4922 9.25781 15.7578 10.7734C15.3359 11.6484 15.0859 13.0391 15.0078 14.9453H8.51562C8.625 12.0547 9.14844 9.71875 10.0859 7.9375C11.8672 4.54687 15.0312 2.85156 19.5781 2.85156C23.1719 2.85156 26.0312 3.85156 28.1562 5.85156C30.2812 7.83594 31.3438 10.4688 31.3438 13.75C31.3438 16.2656 30.5938 18.5 29.0938 20.4531C28.1094 21.75 26.4922 23.1953 24.2422 24.7891L21.5703 26.6875C19.8984 27.875 18.75 28.7344 18.125 29.2656C17.5156 29.7969 17 30.4141 16.5781 31.1172H31.4141V37H8.14062Z" fill="white" />
          </svg>
        )

      case 3:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4688 26.5703C14.4688 27.9297 14.6875 29.0547 15.125 29.9453C15.9375 31.5859 17.4141 32.4062 19.5547 32.4062C20.8672 32.4062 22.0078 31.9609 22.9766 31.0703C23.9609 30.1641 24.4531 28.8672 24.4531 27.1797C24.4531 24.9453 23.5469 23.4531 21.7344 22.7031C20.7031 22.2812 19.0781 22.0703 16.8594 22.0703V17.2891C19.0312 17.2578 20.5469 17.0469 21.4062 16.6562C22.8906 16 23.6328 14.6719 23.6328 12.6719C23.6328 11.375 23.25 10.3203 22.4844 9.50781C21.7344 8.69531 20.6719 8.28906 19.2969 8.28906C17.7188 8.28906 16.5547 8.78906 15.8047 9.78906C15.0703 10.7891 14.7188 12.125 14.75 13.7969H8.51562C8.57812 12.1094 8.86719 10.5078 9.38281 8.99219C9.92969 7.66406 10.7891 6.4375 11.9609 5.3125C12.8359 4.51562 13.875 3.90625 15.0781 3.48438C16.2812 3.0625 17.7578 2.85156 19.5078 2.85156C22.7578 2.85156 25.375 3.69531 27.3594 5.38281C29.3594 7.05469 30.3594 9.30469 30.3594 12.1328C30.3594 14.1328 29.7656 15.8203 28.5781 17.1953C27.8281 18.0547 27.0469 18.6406 26.2344 18.9531C26.8438 18.9531 27.7188 19.4766 28.8594 20.5234C30.5625 22.1016 31.4141 24.2578 31.4141 26.9922C31.4141 29.8672 30.4141 32.3984 28.4141 34.5859C26.4297 36.7578 23.4844 37.8438 19.5781 37.8438C14.7656 37.8438 11.4219 36.2734 9.54688 33.1328C8.5625 31.4609 8.01562 29.2734 7.90625 26.5703H14.4688Z" fill="white" />
          </svg>
        )

      case 4:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.7422 29.6875H27.8984V37H21.3594V29.6875H7.90625V23.8516L20.3984 3.22656H27.8984V24.4609H31.7422V29.6875ZM21.3594 24.4609V9.78906L12.8516 24.4609H21.3594Z" fill="white" />
          </svg>
        )

      case 5:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5625 27.9062C14.8281 29.3594 15.3359 30.4844 16.0859 31.2812C16.8359 32.0625 17.9297 32.4531 19.3672 32.4531C21.0234 32.4531 22.2812 31.875 23.1406 30.7188C24.0156 29.5469 24.4531 28.0781 24.4531 26.3125C24.4531 24.5781 24.0469 23.1172 23.2344 21.9297C22.4219 20.7266 21.1562 20.125 19.4375 20.125C18.625 20.125 17.9219 20.2266 17.3281 20.4297C16.2812 20.8047 15.4922 21.5 14.9609 22.5156L8.96094 22.2344L11.3516 3.46094H30.0781V9.13281H16.1797L14.9609 16.5625C15.9922 15.8906 16.7969 15.4453 17.375 15.2266C18.3438 14.8672 19.5234 14.6875 20.9141 14.6875C23.7266 14.6875 26.1797 15.6328 28.2734 17.5234C30.3672 19.4141 31.4141 22.1641 31.4141 25.7734C31.4141 28.9141 30.4062 31.7188 28.3906 34.1875C26.375 36.6562 23.3594 37.8906 19.3438 37.8906C16.1094 37.8906 13.4531 37.0234 11.375 35.2891C9.29688 33.5547 8.14062 31.0938 7.90625 27.9062H14.5625Z" fill="white" />
          </svg>
        )

      case 6:
        return (
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8438 26.2422C14.8438 28.0703 15.3359 29.5625 16.3203 30.7188C17.3047 31.875 18.5547 32.4531 20.0703 32.4531C21.5547 32.4531 22.7188 31.8984 23.5625 30.7891C24.4219 29.6641 24.8516 28.2109 24.8516 26.4297C24.8516 24.4453 24.3672 22.9297 23.3984 21.8828C22.4297 20.8203 21.2422 20.2891 19.8359 20.2891C18.6953 20.2891 17.6875 20.6328 16.8125 21.3203C15.5 22.3359 14.8438 23.9766 14.8438 26.2422ZM24.2422 11.5703C24.2422 11.0234 24.0312 10.4219 23.6094 9.76562C22.8906 8.70313 21.8047 8.17188 20.3516 8.17188C18.1797 8.17188 16.6328 9.39062 15.7109 11.8281C15.2109 13.1719 14.8672 15.1562 14.6797 17.7812C15.5078 16.7969 16.4688 16.0781 17.5625 15.625C18.6562 15.1719 19.9062 14.9453 21.3125 14.9453C24.3281 14.9453 26.7969 15.9688 28.7188 18.0156C30.6562 20.0625 31.625 22.6797 31.625 25.8672C31.625 29.0391 30.6797 31.8359 28.7891 34.2578C26.8984 36.6797 23.9609 37.8906 19.9766 37.8906C15.6953 37.8906 12.5391 36.1016 10.5078 32.5234C8.92969 29.7266 8.14062 26.1172 8.14062 21.6953C8.14062 19.1016 8.25 16.9922 8.46875 15.3672C8.85938 12.4766 9.61719 10.0703 10.7422 8.14844C11.7109 6.50781 12.9766 5.1875 14.5391 4.1875C16.1172 3.1875 18 2.6875 20.1875 2.6875C23.3438 2.6875 25.8594 3.5 27.7344 5.125C29.6094 6.73438 30.6641 8.88281 30.8984 11.5703H24.2422Z" fill="white" />
          </svg>
        )

      default:
        break
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {    
    return (
      <>
        {/* Join Game Modal Container */}
        {!this.state.isRequesting
          ? <>
            {this.state.joinable && this.props.game.profile && this.props.game.buyin && !this.state.buyInResponse
              ? <>
                {/* Join Game Modal */}
                {!this.state.isFetching
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
                    

                      {/* Live Settings Buttons */}
                      <LiveSettingsButtons
                        {...this.props} {...this.state}
                        change={this.props.change} />
                      {/* / Live Settings Buttons */}
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
                    <Row className="mx-5 my-3 fill-modal-mobile-hidden">
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
                                ? <span>{formatPrice(this.state.remainingDeposit)}/{formatPrice(this.props.game.profile.live_deposit)}</span>
                                : <span>{formatPrice(this.state.remainingDeposit)}/{formatPrice(this.props.game.profile.practice_deposit)}</span>                                  
                              }
                            </span>
                            <div className="chat-status small text-body font-weight-bold pt-1">
                              <span className="text-medium font-weight-bold text-body">
                                {!this.props.game.data.demo_mode
                                  ? <>
                                    {this.state.remainingDeposit
                                      ? <span style={{color: "#2AA9D8"}}>Remaining Deposit</span>
                                      : <span style={{color: "#2AA9D8"}}>Deposit</span>
                                    }
                                  </>
                                  : <>
                                    {this.state.remainingDeposit
                                      ? <span>Play Money/ <span style={{color: "#2AA9D8"}}>(Remaining Deposit)</span></span>
                                      : <span>Play Money/ <span style={{color: "#2AA9D8"}}>(Deposit)</span></span>
                                    }
                                  </>}
                              </span>
                            </div>
                          </Media.Body>                                  
                        </Badge>
                      </Col>

                      <Col
                        // sm={4} md={4}
                        className="mx-3"
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
                              {formatPrice(this.props.game.data.current_game_values.table_small_blind)}/{formatPrice(this.props.game.data.current_game_values.table_big_blind)}
                            </span>
                            <div className="chat-status small text-body font-weight-bold pt-1">
                              <span className="text-medium font-weight-bold text-body">
                                Stakes
                              </span>
                            </div>
                          </Media.Body>
                        </Badge>
                      </Col>

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
                              {formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}/{formatPrice(this.props.game.data.current_game_values.table_maximum_buy_in)}
                            </span>
                            <div className="chat-status small text-body font-weight-bold pt-1">
                              <span className="text-medium font-weight-bold text-body">
                                Buy-In / Min/Max
                              </span>
                            </div>
                          </Media.Body>
                        </Badge>
                      </Col>
                    </Row>
                    <div className="fill-modal-hr fill-modal-mobile-hidden"/>
                    <p className="text-white text-center mb-3 mt-3 display-1" style={{fontSize: "24px", fontWeight:"800"}}>
                        Take A Seat
                      </p>
                    {/* <div className={`text-center text-white opacity-100 mb-1 h5 font-weight-bold`}>
                      {this.state.buyInSelectedSeat === null
                        ? `Please select a seat`
                        : `Selected seat: ${this.state.buyInSelectedSeat}`}
                    </div> */}

                    <Card className="d-flex mb-0 bg-transparent border-0 shadow-none">
                      <Row noGutters className="h-100 border-0 fill-modal-mobile-hidden" style={{ overflow: "visible", }}>
                        <Col sm={12} md={12} lg={12} className="d-flex border-0" style={{
                          display: "flex",
                          justifyContent: "center",
                        }}>
                          <Media className="align-items-center py-2">
                            <div className="d-flex align-items-center justify-content-center">
                              {this.props.game.presence.seats && (
                                this.props.game.presence.seats.all.map((seat, index) =>
                                  <Button
                                    key={index}
                                    size='medium'
                                    // value={`Seat ${seat}`} 
                                    onClick={() => {
                                      this.setState({
                                        buyInSelectedSeat: seat,
                                      })
                                    }}
                                    className={`seat_button w-100 ${this.state.buyInSelectedSeat === seat && 'opacity-100'}`}
                                    style={{   
                                      background : `${!this.props.game.presence.seats.available.includes(seat)
                                        ? 'rgba(222, 74, 74, 0.45)'
                                        : this.state.buyInSelectedSeat === seat ? 'linear-gradient(322.44deg, rgba(9, 134, 169, 0.45) -10.06%, rgba(79, 199, 236, 0.45) 88.96%)' : 'rgba(241, 241, 241, 0.45)'}`,                                     
                                      margin: "1px",
                                      boxShadow: `${this.state.buyInSelectedSeat === seat ? '0 0 0 2px #1D232D' : 'none'}`, 
                                      pointerEvents: this.props.game.presence.seats.available.includes(seat) ? "initial" : "none",
                                      opacity: this.props.game.presence.seats.available.includes(seat) ? "1.0" : "1.0",
                                      borderTopLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderBottomLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderTopRightRadius: seat === 6 ? "14px" : "0px",
                                      borderBottomRightRadius: seat === 6 ? "14px" : "0px",
                                      border: `${this.state.buyInSelectedSeat === seat ? '1px solid #1D232D': 'none'}`,
                                      padding: `${this.state.buyInSelectedSeat === seat ?'10px':'11px'} ${this.props.game.presence.seats.available.includes(seat) ? `${this.state.buyInSelectedSeat === seat ?'20px':'21px'}` : '31px'}`
                                    }} >{!this.props.game.presence.seats.available.includes(seat) ? 
                                    <>
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 17.9375C7.23233 17.9375 5.50436 17.4133 4.0346 16.4313C2.56483 15.4492 1.41929 14.0533 0.742831 12.4202C0.0663725 10.7871 -0.11062 8.99008 0.234236 7.25638C0.579091 5.52267 1.43031 3.93016 2.68024 2.68023C3.93017 1.4303 5.52268 0.579088 7.25638 0.234232C8.99009 -0.110622 10.7871 0.0663681 12.4202 0.742826C14.0534 1.41928 15.4492 2.56483 16.4313 4.03459C17.4133 5.50436 17.9375 7.23233 17.9375 9C17.935 11.3696 16.9926 13.6414 15.317 15.317C13.6414 16.9926 11.3696 17.935 9 17.9375ZM12.2364 6.73641C12.3003 6.67253 12.351 6.5967 12.3855 6.51324C12.4201 6.42978 12.4379 6.34033 12.4379 6.25C12.4379 6.15967 12.4201 6.07022 12.3855 5.98676C12.351 5.9033 12.3003 5.82747 12.2364 5.76359C12.1725 5.69972 12.0967 5.64905 12.0132 5.61448C11.9298 5.57991 11.8403 5.56212 11.75 5.56212C11.6597 5.56212 11.5702 5.57991 11.4868 5.61448C11.4033 5.64905 11.3275 5.69972 11.2636 5.76359L9 8.02805L6.73641 5.76359C6.67253 5.69972 6.5967 5.64905 6.51325 5.61448C6.42979 5.57991 6.34034 5.56212 6.25 5.56212C6.15967 5.56212 6.07022 5.57991 5.98676 5.61448C5.90331 5.64905 5.82747 5.69972 5.7636 5.76359C5.69972 5.82747 5.64905 5.9033 5.61448 5.98676C5.57991 6.07022 5.56212 6.15967 5.56212 6.25C5.56212 6.34033 5.57991 6.42978 5.61448 6.51324C5.64905 6.5967 5.69972 6.67253 5.7636 6.73641L8.02805 9L5.7636 11.2636C5.63459 11.3926 5.56212 11.5676 5.56212 11.75C5.56212 11.9324 5.63459 12.1074 5.7636 12.2364C5.8926 12.3654 6.06757 12.4379 6.25 12.4379C6.43244 12.4379 6.60741 12.3654 6.73641 12.2364L9 9.97195L11.2636 12.2364C11.3275 12.3003 11.4033 12.351 11.4868 12.3855C11.5702 12.4201 11.6597 12.4379 11.75 12.4379C11.8403 12.4379 11.9298 12.4201 12.0132 12.3855C12.0967 12.351 12.1725 12.3003 12.2364 12.2364C12.3003 12.1725 12.351 12.0967 12.3855 12.0132C12.4201 11.9298 12.4379 11.8403 12.4379 11.75C12.4379 11.6597 12.4201 11.5702 12.3855 11.4868C12.351 11.4033 12.3003 11.3275 12.2364 11.2636L9.97196 9L12.2364 6.73641Z" fill="#F1F1F1"/>
                                      </svg>
                                    </> 
                                    : <>Seat&nbsp;{seat}</>}</Button>
                                )
                              )}
                            </div>
                          </Media>
                        </Col>
                      </Row>
                      <Row noGutters className="h-100 border-0 join-seat-button-mobile" style={{ overflow: "visible", }}>
                        <Col sm={12} md={12} lg={12} className="d-flex border-0" style={{
                          display: "flex",
                          justifyContent: "center",
                        }}>
                          <Media className="align-items-center py-2">
                            <div className="d-flex align-items-center justify-content-center">
                              {this.props.game.presence.seats && (
                                this.props.game.presence.seats.all.map((seat, index) =>
                                  <Button
                                    key={index}
                                    size='medium'
                                    // value={`Seat ${seat}`} 
                                    onClick={() => {
                                      this.setState({
                                        buyInSelectedSeat: seat,
                                      })
                                    }}
                                    className={`seat_button w-100 ${this.state.buyInSelectedSeat === seat && 'opacity-100'}`}
                                    style={{   
                                      background : `${!this.props.game.presence.seats.available.includes(seat)
                                        ? 'rgba(222, 74, 74, 0.45)'
                                        : this.state.buyInSelectedSeat === seat ? 'linear-gradient(322.44deg, rgba(9, 134, 169, 0.45) -10.06%, rgba(79, 199, 236, 0.45) 88.96%)' : 'rgba(241, 241, 241, 0.45)'}`,                                     
                                      margin: "1px",
                                      boxShadow: `${this.state.buyInSelectedSeat === seat ? '0 0 0 2px #1D232D' : 'none'}`, 
                                      pointerEvents: this.props.game.presence.seats.available.includes(seat) ? "initial" : "none",
                                      opacity: this.props.game.presence.seats.available.includes(seat) ? "1.0" : "1.0",
                                      borderTopLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderBottomLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderTopRightRadius: seat === 6 ? "14px" : "0px",
                                      borderBottomRightRadius: seat === 6 ? "14px" : "0px",
                                      border: `${this.state.buyInSelectedSeat === seat ? '1px solid #1D232D': 'none'}`,
                                      padding: `${this.state.buyInSelectedSeat === seat ?'10px':'11px'} ${this.props.game.presence.seats.available.includes(seat) ? `${this.state.buyInSelectedSeat === seat ?'22px':'23px'}` : '20px'}`
                                    }} >{!this.props.game.presence.seats.available.includes(seat) ? 
                                    <>
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9 17.9375C7.23233 17.9375 5.50436 17.4133 4.0346 16.4313C2.56483 15.4492 1.41929 14.0533 0.742831 12.4202C0.0663725 10.7871 -0.11062 8.99008 0.234236 7.25638C0.579091 5.52267 1.43031 3.93016 2.68024 2.68023C3.93017 1.4303 5.52268 0.579088 7.25638 0.234232C8.99009 -0.110622 10.7871 0.0663681 12.4202 0.742826C14.0534 1.41928 15.4492 2.56483 16.4313 4.03459C17.4133 5.50436 17.9375 7.23233 17.9375 9C17.935 11.3696 16.9926 13.6414 15.317 15.317C13.6414 16.9926 11.3696 17.935 9 17.9375ZM12.2364 6.73641C12.3003 6.67253 12.351 6.5967 12.3855 6.51324C12.4201 6.42978 12.4379 6.34033 12.4379 6.25C12.4379 6.15967 12.4201 6.07022 12.3855 5.98676C12.351 5.9033 12.3003 5.82747 12.2364 5.76359C12.1725 5.69972 12.0967 5.64905 12.0132 5.61448C11.9298 5.57991 11.8403 5.56212 11.75 5.56212C11.6597 5.56212 11.5702 5.57991 11.4868 5.61448C11.4033 5.64905 11.3275 5.69972 11.2636 5.76359L9 8.02805L6.73641 5.76359C6.67253 5.69972 6.5967 5.64905 6.51325 5.61448C6.42979 5.57991 6.34034 5.56212 6.25 5.56212C6.15967 5.56212 6.07022 5.57991 5.98676 5.61448C5.90331 5.64905 5.82747 5.69972 5.7636 5.76359C5.69972 5.82747 5.64905 5.9033 5.61448 5.98676C5.57991 6.07022 5.56212 6.15967 5.56212 6.25C5.56212 6.34033 5.57991 6.42978 5.61448 6.51324C5.64905 6.5967 5.69972 6.67253 5.7636 6.73641L8.02805 9L5.7636 11.2636C5.63459 11.3926 5.56212 11.5676 5.56212 11.75C5.56212 11.9324 5.63459 12.1074 5.7636 12.2364C5.8926 12.3654 6.06757 12.4379 6.25 12.4379C6.43244 12.4379 6.60741 12.3654 6.73641 12.2364L9 9.97195L11.2636 12.2364C11.3275 12.3003 11.4033 12.351 11.4868 12.3855C11.5702 12.4201 11.6597 12.4379 11.75 12.4379C11.8403 12.4379 11.9298 12.4201 12.0132 12.3855C12.0967 12.351 12.1725 12.3003 12.2364 12.2364C12.3003 12.1725 12.351 12.0967 12.3855 12.0132C12.4201 11.9298 12.4379 11.8403 12.4379 11.75C12.4379 11.6597 12.4201 11.5702 12.3855 11.4868C12.351 11.4033 12.3003 11.3275 12.2364 11.2636L9.97196 9L12.2364 6.73641Z" fill="#F1F1F1"/>
                                      </svg>
                                    </> 
                                    : <>{seat}</>}</Button>
                                )
                              )}
                            </div>
                          </Media>
                        </Col>
                      </Row>
                    </Card>
                    
                      
                    
                    <div className="font-weight-bold mb-3 fill-modal-mobile-hidden" style={{color: "#4FC7EC"}}>{this.props.game.presence.seats.unavailable.length}/{this.props.game.presence.seats.all.length} Players</div>
                    <div className="fill-modal-button-group-width mt-2">{this.renderBuyInButtonGroup()}</div>
                    
                    <div className="fill-modal-input">
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
                          style={{ color: "white", fontSize: "24px", fontWeight: "800", fontVariantNumeric: "lining-nums", borderColor: this.state.buyInInput=== '' ? "#DE4A4A" : "#4FC7EC"}}
                          value={this.state.buyInInput}
                          onChange={(e) => { this.onChangeBuyInAmount(e) }}
                          onKeyPress={(e) => { this.onSubmitKeypress(e) }} />                        
                      </InputGroup>
                    </div>
                    <div                     
                      onClick={this.onSubmitBuyIn}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Join Now</div></div>
                    </div> 
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
                    <div>
                      <p className="text-white text-center mb-3 display-1" style={{fontSize: "24px", fontWeight: "800"}}>
                        Take A Seat
                      </p>
                    </div>

                    <div style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/>

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

                              <div>
                                <span
                                  className="svg-icon svg-icon-muted svg-icon-2hx ui-w-100 cursor-pointer mr-2"
                                  onClick={() => this.props.close()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="11" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="15" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="7" y="11" width="2" height="2" rx="1" fill="white" />
                                  </svg>
                                </span>
                              </div>

                              <Media.Body className="ml-3 p-4">
                                <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">Amount</Col>
                                  <Col md={9} className="font-weight-bold d-flex bg-player-panel-item-opacity-drop">
                                    Waiting...
                                  </Col>
                                </Row>
                                <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">Seat</Col>
                                  <Col md={9} className="font-weight-bold d-flex bg-player-panel-item-opacity-drop">
                                    Waiting...
                                  </Col>
                                </Row>
                              </Media.Body>

                              <Button variant="default md-btn-flat rounded-pill" className="d-flex align-items-center" disabled={true}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="11" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="15" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="7" y="11" width="2" height="2" rx="1" fill="white" />
                                  </svg>
                                </span>
                                <span className="ml-2 bg-player-panel-item-opacity-drop">Processing...</span>
                              </Button>

                            </Media>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>

                    <div
                      className="mb-3"
                      style={{
                        height: "6px",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        backgroundColor: "rgb(0,0,0,0.2)",
                      }} />

                    <div className="text-left text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                      Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                    </div>

                    <div className="mb-3" style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/>
                    
                    <div                     
                      onClick={this.props.close}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Cancel</div></div>
                    </div>  
                                        
                    
                    {/* <Button
                      variant="default" block
                      onClick={this.props.close}
                      className="font-weight-bold">
                      Cancel
                    </Button> */}
                  </Modal.Body>}
                {/* / Join Game Modal */}
              </>
              : <>
                {/* Join Game Modal */}
                {this.state.isFetching
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
                        Take A Seat
                      </p>
                    </div>

                    <div className="fill-modal-hr"/>

                    <Card className="d-flex mt-3 mb-0 bg-transparent border-0 shadow-none" style={{width: "80%"}}>
                      <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                        <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                          <Card.Body className="py-0 bg-light" style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}>
                            <Media className="pb-0 d-flex align-items-center">

                              <div>
                                <span
                                  className="svg-icon svg-icon-muted svg-icon-2hx ui-w-100 cursor-pointer mr-2"
                                  onClick={() => this.props.close()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="11" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="15" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="7" y="11" width="2" height="2" rx="1" fill="white" />
                                  </svg>
                                </span>
                              </div>

                              <Media.Body className="ml-3 p-4">
                                <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">Amount</Col>
                                  <Col md={9} className="font-weight-bold d-flex bg-player-panel-item-opacity-drop">
                                    Waiting...
                                  </Col>
                                </Row>
                                <Row className="mb-0">
                                  <Col md={3} className="text-muted font-weight-bold d-flex">Seat</Col>
                                  <Col md={9} className="font-weight-bold d-flex bg-player-panel-item-opacity-drop">
                                    Waiting...
                                  </Col>
                                </Row>
                              </Media.Body>

                              <Button variant="default md-btn-flat rounded-pill" className="d-flex align-items-center" disabled={true}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                    <rect x="11" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="15" y="11" width="2" height="2" rx="1" fill="white" />
                                    <rect x="7" y="11" width="2" height="2" rx="1" fill="white" />
                                  </svg>
                                </span>
                                <span className="ml-2 bg-player-panel-item-opacity-drop">Processing...</span>
                              </Button>

                            </Media>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>

                    <div
                      className="mb-3"
                      style={{
                        height: "6px",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px",
                        backgroundColor: "rgb(0,0,0,0.2)",
                      }} />

                    <div className="text-left text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                      Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                    </div>

                    
                    
                    <div                     
                      onClick={this.props.close}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Cancel</div></div>
                    </div>  
                    
                  </Modal.Body>
                  : !this.state.buyInResponse
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
                      {this.state.lowDeposit
                        ? <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Minimum Buy-In {formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}
                          </p>
                        </div>
                        : <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Take A Seat
                          </p>
                        </div>}

                      <div className="fill-modal-hr"/>

                      {this.state.lowDeposit
                        ? <Card className="d-flex my-4 bg-transparent border-0 shadow-none" style={{width: "80%"}}>
                          <Row className="h-100 border-0 shadow-none d-flex">
                            <Col className="mb-0 live-d-lg-flex">
                              <Card
                                className="border-light ui-bordered bg-light text-white cursor-pointer join_card__s1"
                                style={{ borderRadius: "15px", opacity: "0.4", pointerEvents: "none", width: "100%" }}
                                onClick={this.props.close}>
                                <Card.Body className="d-flex align-items-center justify-content-start">
                                  <span className="svg-icon svg-icon-muted svg-icon-2hx mr-3">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16.6 7.38C16.76 7.54 16.9701 7.6 17.1701 7.59H21.24C21.65 7.59 21.99 7.25 21.99 6.84C21.99 6.43 21.65 6.09 21.24 6.09H18.95L21.77 3.25999C22.06 2.96999 22.06 2.49 21.77 2.2C21.62 2.05 21.43 1.98 21.24 1.98C21.05 1.98 20.86 2.05 20.71 2.2L17.8901 5.02999V2.73C17.8901 2.32 17.5501 1.98 17.1401 1.98C16.7301 1.98 16.3901 2.32 16.3901 2.73V6.8C16.3701 7.02 16.44 7.23 16.6 7.38Z" fill="white" />
                                      <path d="M9.37997 12.44V13.38C9.02997 13.27 8.82996 13.07 8.82996 12.91C8.82996 12.75 9.02997 12.55 9.37997 12.44Z" fill="white" />
                                      <path d="M11.05 15.14C11.05 15.29 10.84 15.49 10.49 15.61V14.66C10.84 14.78 11.05 14.98 11.05 15.14Z" fill="white" />
                                      <path d="M9.94 6.07001C5.56 6.07001 1.98999 9.64001 1.98999 14.02C1.98999 18.41 5.56 21.98 9.94 21.98C14.32 21.98 17.88 18.41 17.88 14.02C17.88 9.64001 14.32 6.07001 9.94 6.07001ZM10.49 16.75V16.8C10.49 17.11 10.24 17.36 9.94 17.36C9.63 17.36 9.38 17.11 9.38 16.8V16.75C8.85001 16.65 8.38001 16.41 8.07001 16.06C7.91001 15.86 7.89001 15.58 8.04001 15.37C8.18001 15.16 8.45 15.08 8.69 15.17L9.38 15.44V14.52C8.41 14.34 7.70999 13.7 7.70999 12.91C7.70999 12.12 8.41 11.48 9.38 11.3V11.24C9.38 10.93 9.63 10.68 9.94 10.68C10.24 10.68 10.49 10.93 10.49 11.24V11.29C11.03 11.39 11.5 11.64 11.8 11.99C11.97 12.18 11.98 12.46 11.84 12.67C11.73 12.82 11.56 12.91 11.38 12.91C11.31 12.91 11.25 12.9 11.18 12.87L10.49 12.61V13.52C11.46 13.7 12.16 14.34 12.16 15.14C12.16 15.93 11.46 16.57 10.49 16.75Z" fill="white" />
                                      <path d="M11.03 15.14C11.03 15.29 10.82 15.49 10.47 15.61V14.66C10.82 14.78 11.03 14.98 11.03 15.14Z" fill="white" />
                                    </svg>
                                  </span>
                                  <div>
                                    <div className="text-xlarge mb-0" style={{ fontWeight: "500", }}>
                                      {!this.props.game.data.demo_mode
                                        ? <span>{formatPrice(this.props.game.profile.live_deposit)}</span>
                                        : <span>{formatPrice(this.props.game.profile.practice_deposit)}</span>}
                                    </div>
                                    <div className="small opacity-75 font-weight-bold">
                                      Insufficient Balance
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>

                            <Col className="mb-0">
                              <Card
                                className="border-light ui-bordered bg-light text-white cursor-pointer join_card__s1"
                                style={{ borderRadius: "15px", }}
                                onClick={this.props.close}>
                                <Card.Body className="d-flex align-items-center justify-content-start">
                                  <span className="svg-icon svg-icon-muted svg-icon-2hx mr-3">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.9 10.31V7.91999C17.9 4.66999 15.25 2.01999 12 2.01999C8.75 2.01999 6.10001 4.66999 6.10001 7.91999V10.31C4.34001 10.68 3.01001 12.25 3.01001 14.12V18.11C3.01001 20.27 4.76001 22.02 6.92001 22.02H17.09C19.24 22.02 20.99 20.27 20.99 18.11V14.12C20.99 12.25 19.66 10.68 17.9 10.31ZM12.75 16.7V18.18C12.75 18.59 12.41 18.93 12 18.93C11.59 18.93 11.25 18.59 11.25 18.18V16.7C10.64 16.41 10.22 15.8 10.22 15.09C10.22 14.11 11.02 13.31 12 13.31C12.98 13.31 13.78 14.11 13.78 15.09C13.78 15.8 13.36 16.41 12.75 16.7ZM7.60001 10.22V7.91999C7.60001 5.48999 9.57 3.51999 12 3.51999C14.43 3.51999 16.4 5.48999 16.4 7.91999V10.22H7.60001Z" fill="white" />
                                    </svg>
                                  </span>
                                  <div>
                                    <div className="text-xlarge mb-0" style={{ fontWeight: "500", }}>Continue</div>
                                    <div className="small opacity-75 font-weight-bold">Guest Session</div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Card>
                        : <Card className="d-flex my-4 bg-transparent border-0 shadow-none" style={{width: "80%"}}>
                          <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                            <Col
                              sm={12} md={12} lg={12}
                              className="d-flex align-items-center border-0 shadow-none"
                              style={{ justifyContent: "center", }}>
                              <ResourceLoaderB
                                height="4rem" width="4rem" />
                            </Col>
                          </Row>
                        </Card>}

                      {this.state.lowDeposit
                        ? this.props.game.data.demo_mode
                          ? (
                            <div className={`text-center text-white mb-3 bg-player-panel-item-opacity-drop font-weight-bold`}>
                              You do not have enough funds to play this game.
                            </div>
                          )
                          : (
                            <div className={`text-center text-white mb-3 bg-player-panel-item-opacity-drop font-weight-bold`}>
                              Please make a deposit to participate in this game.
                            </div>
                          )
                        : (
                          <div className={`text-center text-white opacity-100 mb-3`}>
                            No free seats available...
                          </div>
                        )}

                      {!this.state.lowDeposit && (
                        <>
                          <div className="text-center text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                            Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                          </div>

                          {/* <hr className="border-light m-0 py-2" /> */}
                          
                          <div                     
                            onClick={this.props.close}
                            className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                            style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                            ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Continue</div></div>
                          </div>  
                                                                             
                        </>
                      )}
                      <div style={{width:"80%"}}>
                        {this.state.lowDeposit && (
                          <ProgressBar
                            variant={`${this.state.lowDeposit ? 'danger' : 'success'}`}
                            now={100}
                            animated={false}
                            style={{
                              height: "16px",
                              borderRadius: "10px",
                              backgroundColor: "rgb(0,0,0,0.6)",
                            }} />
                        )}
                      </div>
                      
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
                      {this.state.buyInResponse.status === 'success'
                        ? <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            You have successfully joined the game
                          </p>
                        </div>
                        : <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Buy-In Failed
                          </p>
                        </div>}

                        <div className="fill-modal-hr"/>

                      <Card className="d-flex mt-3 mb-0 bg-transparent border-0 shadow-none fill-modal-hr">
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

                                {this.state.buyInResponse.status === 'success'
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
                                      {formatPrice(this.state.buyInResponse.buy_in_amount)}
                                    </Col>
                                  </Row>
                                  <Row className="mb-0">
                                    <Col md={3} className="text-muted font-weight-bold d-flex">
                                      Seat
                                    </Col>
                                    <Col md={9} className="font-weight-bold d-flex">
                                      {this.state.buyInResponse.seat_request}
                                    </Col>
                                  </Row>
                                </Media.Body>

                                {this.state.buyInResponse.status === 'success'
                                  ? 
                                  // <div style={{width: "30%"}}>
                                  //   <Button                          
                                  //     variant="instagram" block                                      
                                  //     className="d-flex align-items-center"
                                  //     disabled={true}
                                  //     style={{
                                  //       boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",                            
                                  //       borderRadius: "10px",
                                  //       padding: "0.4px",
                                  //       background: "linear-gradient(to right, #4FC7EC, #AFE6F6)",
                                  //     }} ><div className="w-100 d-flex justify-content-center align-items-center" style={{background: "#1C8CB6",
                                  //     fontSize: "24px", padding: "20px 70px", fontWeight: "800", borderRadius: "9px"}}>
                                  //       <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  //         <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                  //         <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                                  //       </svg>
                                  //     </span>
                                  //     <span className="ml-2 font-weight-bold">Joined</span>
                                  //     </div></Button>
                                  // </div>   
                                  <Button
                                    variant="light md-btn-flat rounded-pill"
                                    className="d-flex align-items-center"
                                    disabled={true}>
                                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                                      </svg>
                                    </span>
                                    <span className="ml-2 font-weight-bold">Joined</span>
                                  </Button>
                                  : 
                                  // <div style={{width: "30%"}}>
                                  //   <Button                          
                                  //     variant="instagram" block                                      
                                  //     className="d-flex align-items-center"
                                  //     disabled={true}
                                  //     style={{
                                  //       boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",                            
                                  //       borderRadius: "10px",
                                  //       padding: "0.4px",
                                  //       background: "linear-gradient(to right, #4FC7EC, #AFE6F6)",
                                  //     }} ><div className="w-100 d-flex justify-content-center align-items-center" style={{background: "#1C8CB6",
                                  //     fontSize: "24px", padding: "20px 70px", fontWeight: "800", borderRadius: "9px"}}>
                                  //       <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                  //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  //       <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                  //       <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                  //       <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                  //     </svg>
                                  //   </span>
                                  //   <span className="ml-2 font-weight-bold">Failed</span>
                                  //     </div></Button>
                                  // </div>   
                                  <Button
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
                                    <span className="ml-2 font-weight-bold">Failed</span>
                                  </Button>
                                  }
                              </Media>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>

                      <div
                        className={`${this.state.buyInResponse.status === 'success'
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

                      {this.state.buyInResponse.status === 'success'
                        ? <div style={{width: "80%"}}>
                          <p className="text-white text-center font-weight-bold mb-3 small">
                            Thank you, buy-in was successful. Have fun playing!
                          </p>
                        </div>
                        : <div style={{width: "80%"}}>
                          <p className="text-white text-center font-weight-bold mb-3 small">
                            Request could not be completed successfully. Please make sure you have enough funds to play this game or change your daily wagering/loss limit in your account settings.
                          </p>
                        </div>}

                        {/* <div style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/> */}

                      <div className="text-center text-white opacity-50 text-tiny mb-3" style={{width: "80%"}}>
                        Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                      </div>

                      <div className="mb-3" style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/>
                      
                        {this.state.buyInResponse.status === 'success'
                          ?  
                              <div                     
                                onClick={this.props.close}
                                className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                                style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                                ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
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
                {/* / Join Game Modal */}
              </>}
          </>
          : <>
            {/* Join Game Modal */}
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
                  Take A Seat
                </p>
              </div>

              <div style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/>

              <Card className="d-flex mt-4 mb-0 bg-transparent border-0 shadow-none" style={{width: "80%"}}>
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col
                    sm={12} md={12} lg={12}
                    className="d-flex align-items-center justify-content-center border-0 shadow-none">
                    <ResourceLoaderN
                      height="8rem" width="8rem" />
                  </Col>
                </Row>
              </Card>

              {this.props.game.player && (
                <div className={`text-center text-white opacity-100 mb-3`} style={{width: "80%"}}>
                  <span className="d-flex align-items-center justify-content-center h5 mb-0 font-weight-bold">
                    Your game session is already active!
                  </span>
                </div>
              )}

              {!this.props.game.player && (
                <div className={`text-center text-white opacity-100 mb-3`}>
                  <span className="d-flex align-items-center justify-content-center h5 mb-0 font-weight-bold">
                    Waiting for authentication...
                  </span>
                </div>
              )}

              <div className="text-center text-white opacity-50 text-tiny mb-3 d-flex align-items-center justify-content-center" style={{width: "80%"}}>
                Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>

              {/* <div className="mb-3" style={{width:"85%", height:"1px", background:"rgba(255, 255, 255, 0.6)"}}/> */}

              {!this.props.game.player && (
                
                 
                 <div                     
                   onClick={this.onSubmitBuyInRequest}
                   className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button mb-2"
                   style={{height: "60px", borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                   ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Refresh</div></div>
                 </div>  
                  
              )}

              {this.props.game.player
                ?  
                  
                    <div                     
                      onClick={this.props.close}
                      className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                      style={{height: "60px", borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                      ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Close</div></div>
                    </div>  
                      
                : 
                  
                  <div                     
                    onClick={this.props.close}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{height: "60px", borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Close</div></div>
                  </div>  
                         
                }
            </Modal.Body>
            {/* / Join Game Modal */}
          </>}
        {/* / Join Game Modal Container */}
      </>
    )
  }
}

export default JoinGame