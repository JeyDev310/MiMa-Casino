import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, Card, Col, InputGroup, Media, Modal, ProgressBar, Row } from 'react-bootstrap'
import { RSButton } from 'reactsymbols-kit'
import LiveSettingsButtons from '../panel/LiveSettingsButtons'

import {
  formatPrice,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'
import ResourceLoaderN from '../../../utilities/loaders/ResourceLoaderN'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class JoinGameTournament extends Component {

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
          this.props.game.buyin.live_deposit < this.props.game.data.current_game_values.table_maximum_buy_in
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
          this.props.game.buyin.practice_deposit < this.props.game.data.current_game_values.table_maximum_buy_in
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
      var maxBuyIn = Number(this.props.game.data.current_game_values.table_maximum_buy_in)
      return (
        <ButtonGroup className="mb-3 w-100">
          <Button
            variant="default" className="font-weight-bold h1 mb-0"
            style={{ borderRadius: "25px", }}
            onClick={() => { this.onChangeBuyInAmountByOption(maxBuyIn) }}>
            {formatPrice(maxBuyIn)}
            <div className="text-tiny text-body mb-0">Join Tournament</div>
          </Button>
        </ButtonGroup>
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
        {/* Join Game Tournament Modal Container */}
        {!this.state.isRequesting
          ? <>
            {this.state.joinable && this.props.game.profile && this.props.game.buyin && !this.state.buyInResponse
              ? <>
                {/* Join Game Tournament Modal */}
                {!this.state.isFetching
                  ? <Modal.Body style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(37, 40, 46, 0.7)",
                  }}>

                    <div className="d-flex align-items-center justify-content-center">
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                        Join Tournament
                      </p>

                      {/* Live Settings Buttons */}
                      <LiveSettingsButtons
                        {...this.props} {...this.state}
                        change={this.props.change} />
                      {/* / Live Settings Buttons */}

                    </div>

                    <hr className="border-light m-0 py-2" />

                    <div className={`text-center text-white opacity-100 mb-1 h5 font-weight-bold`}>
                      {this.state.buyInSelectedSeat === null
                        ? `Please select a seat`
                        : `Selected seat: ${this.state.buyInSelectedSeat}`}
                    </div>

                    <Card className="d-flex w-100 mb-0 bg-transparent border-0 shadow-none">
                      <Row noGutters className="h-100 border-0" style={{ overflow: "visible", }}>
                        <Col sm={12} md={12} lg={12} className="d-flex border-0" style={{
                          display: "flex",
                          justifyContent: "center",
                        }}>
                          <Media className="align-items-center py-2">
                            <div className="d-flex align-items-center justify-content-center">
                              {this.props.game.presence.seats && (
                                this.props.game.presence.seats.all.map((seat, index) =>
                                  <RSButton
                                    key={index}
                                    size='medium'
                                    value={`Seat ${seat}`}
                                    background={`${this.state.buyInSelectedSeat === seat
                                      ? '#1991EB'
                                      : 'rgba(255, 255, 255, 0.1)'}`}
                                    color="#FFFFFF"
                                    onClick={() => {
                                      this.setState({
                                        buyInSelectedSeat: seat,
                                      })
                                    }}
                                    className={`w-100 ${this.state.buyInSelectedSeat === seat && 'opacity-100'}`}
                                    style={{
                                      pointerEvents: this.props.game.presence.seats.available.includes(seat) ? "initial" : "none",
                                      opacity: this.props.game.presence.seats.available.includes(seat) ? "1.0" : "0.75",
                                      borderTopLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderBottomLeftRadius: seat === 1 ? "14px" : "0px",
                                      borderTopRightRadius: seat === 6 ? "14px" : "0px",
                                      borderBottomRightRadius: seat === 6 ? "14px" : "0px",
                                    }} />
                                )
                              )}
                            </div>
                          </Media>
                        </Col>
                      </Row>
                    </Card>

                    <Card className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none">
                      <Row className="mt-2">
                        <Col className="d-flex justify-content-center">
                          <Row className="w-100">
                            <Col
                              sm={6} md={6}
                              className="px-1"
                              style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                              <Badge
                                pill variant="default"
                                className={`d-flex align-items-center py-2 ${this.state.remainingDeposit ? "bg-flash-deposit-1" : ""}`}>
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
                                          : <span>{formatPrice(this.props.game.profile.live_deposit)}</span>
                                        }
                                      </>
                                      : <>
                                        {this.state.remainingDeposit
                                          ? <span>{formatPrice(this.state.remainingDeposit)}</span>
                                          : <span>{formatPrice(this.props.game.profile.practice_deposit)}</span>
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

                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                                    <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
                                  </svg>
                                </span>
                              </Badge>
                            </Col>

                            <Col
                              sm={6} md={6}
                              className="px-1"
                              style={{ opacity: `${this.state.remainingDeposit ? "1.0" : "0.5"}`, }}>
                              <Badge
                                pill variant="default"
                                className="d-flex align-items-center py-2">
                                <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                                    <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                                  </svg>
                                </span>

                                <Media.Body className="ml-2 text-left">
                                  <span className="text-medium font-weight-bold">
                                    {formatPrice(this.props.game.data.current_game_values.table_maximum_buy_in)}
                                  </span>
                                  <div className="chat-status small text-body font-weight-bold pt-1">
                                    <span className="text-medium font-weight-bold text-body">
                                      Tournament Buy-In
                                    </span>
                                  </div>
                                </Media.Body>

                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                                    <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
                                  </svg>
                                </span>
                              </Badge>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>

                    {this.renderBuyInButtonGroup()}

                    <InputGroup size="lg" className="mb-3">
                      <RSButton
                        size="large"
                        value="Join Now"
                        background="#1991EB"
                        color="#FFFFFF"
                        onClick={this.onSubmitBuyIn}
                        className="w-100"
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    </InputGroup>

                    <div className={`text-center ${this.state.buyInAmountHintColor} opacity-100 mb-3 h5 font-weight-bold`}>
                      {this.state.buyInAmountHint}
                    </div>

                    <div className="text-center text-white opacity-50 text-tiny mb-3">
                      Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Button
                      variant="instagram" block
                      onClick={this.props.close}
                      className="font-weight-bold">
                      Close
                    </Button>
                  </Modal.Body>
                  : <Modal.Body style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(37, 40, 46, 0.7)",
                  }}>

                    <div>
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                        Join Tournament
                      </p>
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Card className="d-flex w-100 mt-0 mb-0 bg-transparent border-0 shadow-none">
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

                    <div className="text-left text-white opacity-50 text-tiny mb-3">
                      Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Button
                      variant="default" block
                      onClick={this.props.close}
                      className="font-weight-bold">
                      Cancel
                    </Button>
                  </Modal.Body>}
                {/* / Join Game Tournament Modal */}
              </>
              : <>
                {/* Join Game Tournament Modal */}
                {this.state.isFetching
                  ? <Modal.Body style={{
                    borderRadius: "15px",
                    backgroundColor: "rgba(37, 40, 46, 0.7)",
                  }}>

                    <div>
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                        Join Tournament
                      </p>
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Card className="d-flex w-100 mt-0 mb-0 bg-transparent border-0 shadow-none">
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

                    <div className="text-left text-white opacity-50 text-tiny mb-3">
                      Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Button
                      variant="default" block
                      onClick={this.props.close}
                      className="font-weight-bold">
                      Cancel
                    </Button>
                  </Modal.Body>
                  : !this.state.buyInResponse
                    ? <Modal.Body style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(37, 40, 46, 0.7)",
                    }}>

                      {this.state.lowDeposit
                        ? <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Tournament Buy-In {formatPrice(this.props.game.data.current_game_values.table_maximum_buy_in)}
                          </p>
                        </div>
                        : <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Join Tournament
                          </p>
                        </div>}

                      <hr className="border-light m-0 py-2" />

                      {this.state.lowDeposit
                        ? <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                          <Row className="h-100 border-0 shadow-none">
                            <Col className="mb-0">
                              <Card
                                className="border-light ui-bordered bg-light text-white cursor-pointer join_card__s1"
                                style={{ borderRadius: "15px", }}
                                onClick={this.props.close}>
                                <Card.Body className="d-flex align-items-center justify-content-center">
                                  <i className="fas fa-eye opacity-100 text-body icon__success join_card__s2 mr-4"></i>
                                  <div>
                                    <div className="text-xlarge mb-0" style={{ fontWeight: "500", }}>Continue</div>
                                    <div className="small opacity-75 font-weight-bold">Guest Session</div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Card>
                        : <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
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
                              You do not have enough funds to play this tournament.
                            </div>
                          )
                          : (
                            <div className={`text-center text-white mb-3 bg-player-panel-item-opacity-drop font-weight-bold`}>
                              Please make a deposit to participate in this tournament.
                            </div>
                          )
                        : (
                          <div className={`text-center text-white opacity-100 mb-3`}>
                            No free seats available...
                          </div>
                        )}

                      {!this.state.lowDeposit && (
                        <>
                          <div className="text-center text-white opacity-50 text-tiny mb-3">
                            Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                          </div>

                          <hr className="border-light m-0 py-2" />

                          <Button
                            variant="instagram" block
                            onClick={this.props.close}
                            className="font-weight-bold">
                            Continue
                          </Button>
                        </>
                      )}

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
                    </Modal.Body>
                    : <Modal.Body style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(37, 40, 46, 0.7)",
                    }}>

                      {this.state.buyInResponse.status === 'success'
                        ? <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            You have successfully joined the tournament
                          </p>
                        </div>
                        : <div>
                          <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                            Buy-In Failed
                          </p>
                        </div>}

                      <hr className="border-light m-0 py-2" />

                      <Card className="d-flex w-100 mt-0 mb-0 bg-transparent border-0 shadow-none">
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
                                    <span className="ml-2 font-weight-bold">Joined</span>
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
                                    <span className="ml-2 font-weight-bold">Failed</span>
                                  </Button>}
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
                        ? <div>
                          <p className="text-white text-left font-weight-bold mb-3 small">
                            Thank you, buy-in was successful. Have fun playing!
                          </p>
                        </div>
                        : <div>
                          <p className="text-white text-left font-weight-bold mb-3 small">
                            Request could not be completed successfully. Please make sure you have enough funds to play this tournament or change your daily wagering/loss limit in your account settings.
                          </p>
                        </div>}

                      <hr className="border-light m-0 py-2" />

                      <div className="text-left text-white opacity-50 text-tiny mb-3">
                        Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                      </div>

                      <hr className="border-light m-0 py-2" />

                      {this.state.buyInResponse.status === 'success'
                        ? <Button
                          variant="instagram"
                          block
                          onClick={this.props.close}
                          className="font-weight-bold">
                          Accept
                        </Button>
                        : <Button
                          variant="instagram"
                          block
                          onClick={this.props.close}
                          className="font-weight-bold">
                          Close
                        </Button>}
                    </Modal.Body>}
                {/* / Join Game Tournament Modal */}
              </>}
          </>
          : <>
            {/* Join Game Tournament Modal */}
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(37, 40, 46, 0.7)",
            }}>

              <div>
                <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                  Join Tournament
                </p>
              </div>

              <hr className="border-light m-0 py-2" />

              <Card className="d-flex w-100 mt-4 mb-0 bg-transparent border-0 shadow-none">
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
                <div className={`text-center text-white opacity-100 mb-3`}>
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

              <div className="text-center text-white opacity-50 text-tiny mb-3 d-flex align-items-center justify-content-center">
                Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>

              <hr className="border-light m-0 py-2" />

              {!this.props.game.player && (
                <Button
                  variant="instagram" block
                  onClick={this.onSubmitBuyInRequest}
                  className="font-weight-bold">
                  Refresh
                </Button>
              )}

              {this.props.game.player
                ? <Button variant="instagram" block
                  onClick={this.props.close}
                  className="font-weight-bold">
                  Close
                </Button>
                : <Button variant="default" block
                  onClick={this.props.close}
                  className="font-weight-bold">
                  Close
                </Button>}
            </Modal.Body>
            {/* / Join Game Tournament Modal */}
          </>}
        {/* / Join Game Tournament Modal Container */}
      </>
    )
  }
}

export default JoinGameTournament