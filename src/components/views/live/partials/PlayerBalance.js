/*eslint-disable*/

import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

import '../../../../vendor/styles/pages/chat.scss'

class PlayerBalance extends Component {

  constructor(props) {
    super(props)

    this.onHandleLerpColor = this.onHandleLerpColor.bind(this)
    this.onHandleUpdatePlayerData = this.onHandleUpdatePlayerData.bind(this)
    this.onHandleRefreshPlayerData = this.onHandleRefreshPlayerData.bind(this)

    this.state = {
      init: false,
      data: null,
      dealer: false,
      progress: 100,
      color: '#02BC77',
      variant: 'success',
      playing: false,
      waiting: false,
      inactive: false,
      exited: false,
      joinable: false,
      lowBalance: false,
      joinHint: true,
      reBuyHint: false,
      sitOutHint: false,
      sitOutWarn: false,
      bank: 300,
      time: {},
      seconds: 300,
      percentage: 100,
    }
  }

  componentDidMount() {
    this.onHandleRefreshPlayerData()
  }

  componentDidUpdate(prevProps) {

    try {
      if (prevProps.game.player !== this.props.game.player) {
        this.onHandleRefreshPlayerData()
      }
    } catch { }

    try {
      if (prevProps.game.presence.user_has_joined !== this.props.game.presence.user_has_joined) {
        if (!this.props.game.presence.user_has_joined) {
          this.setState({
            joinHint: this.props.game.presence.game_is_joinable,
            reBuyHint: false,
            sitOutHint: false,
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

      if (this.props.game.player) {
        this.setState({
          playing: this.props.game.player.p_playing ? true : false,
          waiting: this.props.game.player.p_waiting ? true : false,
          inactive: this.props.game.player.p_inactive ? true : false,
          exited: this.props.game.player.p_exited ? true : false,
          lowBalance: this.props.game.player.p_low_balance ? true : false,
        })
      }

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
        {/* Player Balance */}
        {this.props.game.profile && (
          <>
            <ProgressBar
              variant={this.state.variant}
              now={this.state.progress}
              animated={false}
              style={{
                height: "5px",
                borderRadius: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }} />
          </>
        )}
        {/* / Player Balance */}
      </>
    )
  }
}

export default PlayerBalance