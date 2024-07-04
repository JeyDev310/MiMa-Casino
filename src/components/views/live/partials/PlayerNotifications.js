import React, { Component } from 'react'
import { RateLimiter } from 'limiter'
import toast from 'react-hot-toast'

import {
  truncateUsername,
} from '../utilities/TextPreprocessing'

class PlayerNotifications extends Component {

  constructor(props) {
    super(props)

    this.toastLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 250, })
    this.giphyLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 1500, })

    this.onHandleLatestMsg = this.onHandleLatestMsg.bind(this)

    this.state = {
      init: false,
      data: [],
      show: false,
      message: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.messages !== this.props.game.messages) {
      this.onHandleLatestMsg()
    }
  }

  onHandleLatestMsg() {
    try {
      if (this.props.game.messages.length > 0) {

        if (
          this.props.game.messages[this.props.game.messages.length - 1].data.includes('tipped the dealer') &&
          this.props.game.messages[this.props.game.messages.length - 1].channel === 'system'
        ) {

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
          })

          if (this.props.game.dealer) {
            this.onHandleNotificationCallback(
              `${truncateUsername(extractedUsername)} tipped you with $${extractedAmount.amount}`,
              "tipped",
              5000
            )
          } else {
            this.onHandleNotificationCallback(
              `${truncateUsername(extractedUsername)} tipped the Dealer with $${extractedAmount.amount}`,
              "tipped",
              2500
            )
          }
        }

        if (
          this.props.game.messages[this.props.game.messages.length - 1].data.includes('joined the table') &&
          this.props.game.messages[this.props.game.messages.length - 1].channel === 'system'
        ) {
          let username = this.props.game.messages[this.props.game.messages.length - 1].user
          this.onHandleNotificationCallback(
            `${truncateUsername(username)} ${this.props.game.messages[this.props.game.messages.length - 1].data}`,
            "joined",
            2500
          )
        }

        if (
          this.props.game.messages[this.props.game.messages.length - 1].data.includes('left the table') &&
          this.props.game.messages[this.props.game.messages.length - 1].channel === 'system'
        ) {
          let username = this.props.game.messages[this.props.game.messages.length - 1].user
          this.onHandleNotificationCallback(
            `${truncateUsername(username)} ${this.props.game.messages[this.props.game.messages.length - 1].data}`,
            "left",
            2500
          )
        }

        if (
          this.props.game.messages[this.props.game.messages.length - 1].data.includes('reset the game') &&
          this.props.game.messages[this.props.game.messages.length - 1].channel === 'system'
        ) {
          let username = this.props.game.messages[this.props.game.messages.length - 1].user
          this.onHandleNotificationCallbackError(
            `${truncateUsername(username)} ${this.props.game.messages[this.props.game.messages.length - 1].data}`,
            2500
          )
        }

        if (
          this.props.game.messages[this.props.game.messages.length - 1].data.includes("https://") &&
          this.props.game.messages[this.props.game.messages.length - 1].data.includes("giphy.com/media") &&
          this.props.game.messages[this.props.game.messages.length - 1].channel === 'player'
        ) {
          let username = this.props.game.messages[this.props.game.messages.length - 1].user
          if (
            this.props.settings.optionL1 &&
            JSON.parse(localStorage.getItem('user')).user.username !== username
          ) {
            this.onHandleNotificationCallbackImageURL(
              truncateUsername(username),
              this.props.game.messages[this.props.game.messages.length - 1].data,
              2500
            )
          } else if (
            this.props.settings.optionL1
          ) {
            this.onHandleNotificationCallbackImageURL(
              truncateUsername(username),
              this.props.game.messages[this.props.game.messages.length - 1].data,
              2500
            )
          }
        }

      }
    } catch { }
  }

  getIcon(icon) {
    switch (icon) {
      case "tipped":
        return '👏'
      case "joined":
        return `👋`
      case "left":
        return `👋`
      case "reset":
        return `⏱️`
      case "giphy":
        return `😊`
      default:
        return ``
    }
  }

  onHandleNotificationCallback(message, icon, duration) {
    if (this.toastLimiter.tryRemoveTokens(1)) {
      toast(message, {
        duration: duration
          ? duration
          : 2500,
        icon: this.getIcon(icon),
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  onHandleNotificationCallbackSuccess(message, duration) {
    if (this.toastLimiter.tryRemoveTokens(1)) {
      toast.success(message, {
        duration: duration
          ? duration
          : 2500,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  onHandleNotificationCallbackError(message, duration) {
    if (this.toastLimiter.tryRemoveTokens(1)) {
      toast.error(message, {
        duration: duration
          ? duration
          : 2500,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  onHandleNotificationCallbackImageURL(player, url, duration) {
    if (this.giphyLimiter.tryRemoveTokens(1)) {
      toast((t) => (
        <span onClick={() => toast.dismiss(t.id)}>
          <span className="d-flex align-items-center justify-content-between">
            <span className="d-flex align-items-center justify-content-center">
              <span className="d-flex align-items-center justify-content-center">
                <span className="font-weight-bold small mr-2">
                  {player}
                </span>
              </span>
              <span className="d-flex align-items-center justify-content-center">
                <i className="fas fa-gamepad opacity-50" />
              </span>
            </span>
            <span>
              <span
                className="font-weight-bold small"
                onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </span>
            </span>
          </span>
          <span className="d-flex align-items-center justify-content-center py-2">
            <img
              src={String(url)}
              className="d-block m-0"
              alt="giphy.com"
              style={{
                width: "200px",
                borderRadius: "5px",
              }} />
          </span>
        </span>
      ), {
        duration: duration
          ? duration
          : 2500,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Player Notifications */}
      </>
    )
  }
}

export default PlayerNotifications