import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import {
  formatPrice,
} from '../utilities/TextPreprocessing'

class PlayerProgressBar extends Component {

  constructor(props) {
    super(props)

    this.onHandleLerpColor = this.onHandleLerpColor.bind(this)
    this.onHandleRefreshSync = this.onHandleRefreshSync.bind(this)
    this.onHandleUpdatePlayerData = this.onHandleUpdatePlayerData.bind(this)
    this.onHandleRefreshPlayerData = this.onHandleRefreshPlayerData.bind(this)

    this.state = {
      init: false,
      data: null,
      dealer: false,
      progress: 100,
      color: '#02BC77',
      variant: 'success',
      countdown: false,
      currentPlayer: false,
    }
  }

  componentDidMount() {
    this.onHandleRefreshPlayerData()
    try {
      this.setState({
        dealer: this.props.game.dealer,
      }, () => {
        const container = document.getElementById('top-navigation-hcontainer-item')
        var elements = document.querySelectorAll('[id^="player-progress-bar"]')
        for (let i = 0; i < elements.length; i++) {
          switch (elements[i].id.slice(-1)) {
            case '1':
              elements[i].addEventListener('mouseover', () => {
                container.style.opacity = 1
                container.style.transform = "translate(0px, 0px)"
                if (this.props.game.player) {
                  container.setAttribute('content-before', `${formatPrice(Number(this.props.game.player.p_balance_display))}`)
                }
              })
              elements[i].addEventListener('mouseleave', () => {
                container.style.opacity = 0
                container.style.transform = "translate(100px, 0px)"
              })
              break
            default:
              break
          }
        }
      })
    } catch { }
  }

  componentDidUpdate(prevProps) {

    try {
      if (prevProps.game.player !== this.props.game.player) {
        this.onHandleRefreshPlayerData()
      }
    } catch { }

    try {
      if (prevProps.game.synced !== this.props.game.synced) {
        this.onHandleRefreshSync()
      }
    } catch { }

    try {
      if (prevProps.game.presence.user_has_joined !== this.props.game.presence.user_has_joined) {
        if (!this.props.game.presence.user_has_joined) {
          this.setState({
            joinHint: this.props.game.presence.game_is_joinable,
            progress: 100,
            color: '#02BC77',
            variant: 'success',
          }, () => {
            this.onHandleRefreshPlayerData()
          })
        } else {
          this.setState({
            joinHint: false,
          }, () => {
            this.onHandleRefreshPlayerData()
          })
        }
      }
    } catch { }

  }

  onHandleRefreshSync() {
    if (this.props.game.synced) {
      this.setState({
        currentPlayer: this.props.game.synced.current_player,
      }, () => {
        try {
          if (this.props.game.data.game_started) {
            if (
              this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
              this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
            ) {
              if (this.state.currentPlayer) {
                this.setState({
                  countdown: true,
                })
              } else {
                this.setState({
                  countdown: false,
                })
              }
            } else {
              this.setState({
                countdown: false,
              })
            }
          } else {
            this.setState({
              countdown: false,
            })
          }
        } catch {
          this.setState({
            countdown: false,
          })
        }
      })
    }
  }

  onHandleRefreshPlayerData() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.player
    ) {
      this.setState({
        init: true,
        data: this.props.game.player,
      }, () => {
        this.onHandleUpdatePlayerData()
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  onHandleUpdatePlayerData() {
    try {

      var valueMaxBuyIn = Number(this.props.game.data.current_game_values.table_maximum_buy_in)
      var playerBalance = Number(this.props.game.player.p_balance_display)

      if (playerBalance >= valueMaxBuyIn) {
        this.setState({
          progress: 100,
          color: '#02BC77',
          variant: 'success',
        })
      } else if (
        playerBalance >= 0 &&
        playerBalance <= valueMaxBuyIn
      ) {
        var x = (playerBalance / valueMaxBuyIn) * 100
        var c = this.onHandleLerpColor('#d9534f', '#02BC77', x / 100)
        var v = 'danger'

        switch (true) {
          case (x >= 0 && x < 25):
            v = 'danger'
            break
          case (x >= 25 && x < 50):
            v = 'warning'
            break
          case (x >= 50 && x < 75):
            v = 'info'
            break
          case (x >= 75 && x < 100):
            v = 'success'
            break
          default:
            v = 'danger'
            break
        }

        this.setState({
          progress: Number(x),
          color: c,
          variant: v,
        })
      } else {
        this.setState({
          progress: 0,
          color: '#d9534f',
          variant: 'danger',
        })
      }
    } catch {
      this.setState({
        progress: 0,
        color: '#d9534f',
        variant: 'danger',
      })
    }
  }

  onHandleLerpColor(a, b, amount) {

    var ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 && 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 && 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Player Progress Bar */}
        {this.props.game.profile && (
          <>
            <ProgressBar
              id="player-progress-bar-1"
              className={`cursor-pointer ${this.state.countdown && ("player-progress-opacity-animation")}`}
              variant={this.state.variant}
              now={this.state.progress}
              animated={!this.state.init}
              style={{
                height: "6px",
                borderRadius: "0px 0px 15px 15px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </>
        )}
        {/* / Player Progress Bar */}
      </>
    )
  }
}

export default PlayerProgressBar