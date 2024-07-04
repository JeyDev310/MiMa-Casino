import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, Card, Form, Media, ProgressBar } from 'react-bootstrap'

import LiveChatEmojiModal from '../modals/panel/LiveChatEmojiModal'
import LiveChatGiphySearchbox from '../modals/panel/LiveChatGiphySearchboxModal'

import moment from 'moment'
import FileSaver from 'file-saver'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PlayerQuickActions from './PlayerQuickActions'

import {
  truncateUsername,
} from '../utilities/TextPreprocessing'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'
import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2

const Emoji = React.memo(({ className, label, symbol }) =>
  <span className={className} role="img" aria-label={label} style={{
    fontSize: "1rem",
  }}>
    {String.fromCodePoint(symbol)}
  </span>
)

class LiveChat extends Component {

  constructor(props) {
    super(props)

    this.scrollRef = React.createRef()
    this.refreshMessages = this.refreshMessages.bind(this)
    this.getMessageOpacity = this.getMessageOpacity.bind(this)
    this.handleChangeChannel = this.handleChangeChannel.bind(this)
    this.downloadMessagesJSON = this.downloadMessagesJSON.bind(this)
    this.handleSubmitKeypress = this.handleSubmitKeypress.bind(this)
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
    this.handleSubmitSendButton = this.handleSubmitSendButton.bind(this)
    this.handleEvaluateMessageData = this.handleEvaluateMessageData.bind(this)
    this.handleEvaluateDealerMessage = this.handleEvaluateDealerMessage.bind(this)
    this.handleSubmitSendEmojiButton = this.handleSubmitSendEmojiButton.bind(this)
    this.handleSubmitSendGiphyButton = this.handleSubmitSendGiphyButton.bind(this)
    this.handleEvaluateAutoTextMessage = this.handleEvaluateAutoTextMessage.bind(this)
    this.handleRenderSitOutState = this.handleRenderSitOutState.bind(this)
    this.handleSubmitSitOutState = this.handleSubmitSitOutState.bind(this)
    this.handleSubmitMuckCardsState = this.handleSubmitMuckCardsState.bind(this)

    this.liveClock = 0
    this.refreshTimeout = 0

    this.state = {
      input: '',
      channel: 'player',
      datetime: new Date(),
      visible: true,
      data: {
        system: [],
        player: [],
      },
    }
  }

  componentDidMount() {
    this.liveClock = setInterval(() => {
      this.setState({
        datetime: new Date(),
      })
    }, 60 * 1000)
    this.setState({
      ...this.state.data,
      data: {
        system: this.props.game.messages.filter((item) => item.channel === 'system'),
        player: this.props.game.messages.filter((item) => item.channel === 'player'),
      },
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.messages !== this.props.game.messages) {
      this.setState({
        ...this.state.data,
        data: {
          system: this.props.game.messages.filter((item) => item.channel === 'system'),
          player: this.props.game.messages.filter((item) => item.channel === 'player'),
        },
      }, () => {
        this.refreshMessages()
      })
    }
    if (prevProps.slideModalEnter !== this.props.slideModalEnter) {
      this.refreshMessages()
    }
    if (prevProps.settings.optionD4 !== this.props.settings.optionD4) {
      if (this.props.settings.optionD4) {
        this.refreshMessages()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.liveClock)
    clearTimeout(this.refreshTimeout)
  }

  refreshMessages() {
    this.refreshTimeout = setTimeout(() => {
      try {
        if (this.scrollRef) {
          this.scrollRef.current._container.scrollTop = this.scrollRef.current._container.scrollHeight
        }
      } catch { }
    }, 150)
  }

  handleSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (this.state.input) {
        var text = this.state.input
        this.setState({ input: '' }, () => {
          this.props.client.sendTextMessage(
            0,
            this.props.game.data.current_round,
            text,
          )
          this.handleChangeChannel('player')
        })
      }
    }
  }

  handleSubmitSendButton() {
    if (this.state.input) {
      var text = this.state.input
      this.setState({ input: '' }, () => {
        this.props.client.sendTextMessage(
          0,
          this.props.game.data.current_round,
          text,
        )
        this.handleChangeChannel('player')
      })
    }
  }

  handleSubmitSendEmojiButton(input) {
    if (input) {
      var text = String.fromCodePoint(input)
      this.props.client.sendTextMessage(
        0,
        this.props.game.data.current_round,
        text,
      )
      this.handleChangeChannel('player')
    }
  }

  handleSubmitSendGiphyButton(input) {
    if (input) {
      var text = String(input.images.original.url)
      this.props.client.sendTextMessage(
        0,
        this.props.game.data.current_round,
        text,
      )
      this.handleChangeChannel('player')
    }
  }

  handleEvaluateMessageData(dealer, data) {
    if (dealer) {
      return this.handleEvaluateDealerMessage(data)
    } else {
      if (
        data.includes('(Preflop)') ||
        data.includes('(Flop)') ||
        data.includes('(Turn)') ||
        data.includes('(River)') ||
        data.includes('(Showdown)')
      ) {
        return this.handleEvaluateAutoTextMessage(data)
      } else if (
        data.includes('tipped the dealer')
      ) {
        return (
          <div className="font-weight-semibold mb-0 small">
            <span>{data}</span>
            <span className="ml-2">
              <Emoji symbol="0x1F970" />
            </span>
          </div>
        )
      } else {
        var regexExp = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/
        if (
          regexExp.test(data)
        ) {
          return (<div style={{ fontSize: "150%", }}>{data}</div>)
        } else {
          return this.handleParsePlayerMessage(data)
        }
      }
    }
  }

  handleParsePlayerMessage(input) {
    if (
      input.includes("https://") &&
      input.includes("giphy.com/media")
    ) {
      return (<>
        <img
          src={String(input)}
          className="d-block m-0 my-2 mb-0 giphy__img_container"
          alt="giphy.com" />
      </>)
    } else {
      return (<>
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 && 'small'}`}>
          {input}
        </div>
      </>)
    }
  }

  handleEvaluateDealerMessage(data) {
    if (data.includes('tipped the dealer')) {
      return (
        <div className="font-weight-semibold mb-0 small">
          <span>{data}</span>
          <span className="ml-2">
            <Emoji symbol="0x1F970" />
          </span>
        </div>
      )
    } else {
      if (data.includes('(Preflop)')) {
        return (
          <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
            <span>{data.replaceAll('(Preflop)', '')}</span>
            <Badge pill variant="default" className="ml-0 font-weight-bold">Preflop</Badge>
          </div>
        )
      }
      if (data.includes('(Flop)')) {
        return (
          <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
            <span>{data.replaceAll('(Flop)', '')}</span>
            <Badge pill variant="default" className="ml-0 font-weight-bold">Flop</Badge>
          </div>
        )
      }
      if (data.includes('(Turn)')) {
        return (
          <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
            <span>{data.replaceAll('(Turn)', '')}</span>
            <Badge pill variant="default" className="ml-0 font-weight-bold">Turn</Badge>
          </div>
        )
      }
      if (data.includes('(River)')) {
        return (
          <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
            <span>{data.replaceAll('(River)', '')}</span>
            <Badge pill variant="default" className="ml-0 font-weight-bold">River</Badge>
          </div>
        )
      }
      if (data.includes('(Showdown)')) {
        return (
          <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
            <span>{data.replaceAll('(Showdown)', '')}</span>
            <Badge pill variant="default" className="ml-0 font-weight-bold">Showdown</Badge>
          </div>
        )
      }
      return this.handleParsePlayerMessage(data)
    }
  }

  handleEvaluateAutoTextMessage(data) {
    if (data.includes('(Preflop)')) {
      return (
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
          <span>{data.replaceAll('(Preflop)', '')}</span>
          <Badge pill variant="default" className="ml-0 font-weight-bold">Preflop</Badge>
        </div>
      )
    }
    if (data.includes('(Flop)')) {
      return (
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
          <span>{data.replaceAll('(Flop)', '')}</span>
          <Badge pill variant="default" className="ml-0 font-weight-bold">Flop</Badge>
        </div>
      )
    }
    if (data.includes('(Turn)')) {
      return (
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
          <span>{data.replaceAll('(Turn)', '')}</span>
          <Badge pill variant="default" className="ml-0 font-weight-bold">Turn</Badge>
        </div>
      )
    }
    if (data.includes('(River)')) {
      return (
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
          <span>{data.replaceAll('(River)', '')}</span>
          <Badge pill variant="default" className="ml-0 font-weight-bold">River</Badge>
        </div>
      )
    }
    if (data.includes('(Showdown)')) {
      return (
        <div className={`font-weight-semibold mb-0 ${this.props.settings.optionD8 ? 'small' : null}`}>
          <span>{data.replaceAll('(Showdown)', '')}</span>
          <Badge pill variant="default" className="ml-0 font-weight-bold">Showdown</Badge>
        </div>
      )
    }
  }

  downloadMessagesJSON() {
    if (this.props.game.messages.length > 0) {
      var blob = new Blob([JSON.stringify(this.props.game.messages)], { type: "application/json", })
      FileSaver.saveAs(blob, `messages-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  getMessageOpacity(index) {
    let length = this.props.game.messages.length <= 128 ? this.props.game.messages.length : 128
    let cursor = mapRange(index, 0, length, length, 0)
    if (cursor <= 10) {
      return '1.0'
    }
    return `${mapRange(cursor, 128, 0, 0, 1)}`
  }

  handleToggleVisibility() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  handleSubmitSitOutState(value) {
    if (this.props.game.player) {
      this.props.client.sendPlayerSitOut(
        0,
        this.props.game.data.current_round,
        value ? 1 : 0,
      )
    }
  }

  handleSubmitMuckCardsState(value) {
    if (this.props.game.player) {
      this.props.client.sendPlayerMuckCards(
        0,
        this.props.game.data.current_round,
        value ? 1 : 0,
      )
    }
  }

  handleRenderSitOutState(request, state, pos) {
    if (pos === 1) {
      if (request && state) {
        return String('success')
      } else if (!request && !state) {
        return String('opaque1')
      } else if (request !== state) {
        return String('warning')
      }
    } else if (pos === 2) {
      if (request && state) {
        return (
          <span className="svg-icon svg-icon-muted svg-icon-2hx">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
              <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
            </svg>
          </span>
        )
      } else if (!request && !state) {
        return (
          <span className="svg-icon svg-icon-muted svg-icon-2hx">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
              <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
              <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
            </svg>
          </span>
        )
      } else if (request !== state) {
        return (
          <span className="svg-icon svg-icon-muted svg-icon-2hx">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black" />
              <rect x="11" y="11" width="2" height="2" rx="1" fill="black" />
              <rect x="15" y="11" width="2" height="2" rx="1" fill="black" />
              <rect x="7" y="11" width="2" height="2" rx="1" fill="black" />
            </svg>
          </span>
        )
      }
    }
  }

  handleChangeChannel(ch) {
    if (ch === 'system') {
      this.setState({
        channel: 'system',
      }, () => {
        this.refreshMessages()
      })
    }
    if (ch === 'player') {
      this.setState({
        channel: 'player',
      }, () => {
        this.refreshMessages()
      })
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div style={{maxWidth: "317px", marginBottom: "155px"}}>
        {this.props.game.messages && (
          <>
            
            {/* Live Chat Panel Header */}
            {this.state.visible && this.props.settings.optionD4 && this.props.settings.optionF7 && (
              <>
                {/* Live Chat Panel Header Panel */}
                <Card
                  className="border-0 shadow-none p-2 mb-0 cursor-pointer"
                  style={{                    
                    borderRadius: "10px 10px 0px 0px",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                    background: "rgba(43, 43, 51, 0.5)"
                  }}
                  onClick={e => this.props.change('optionD4', !this.props.settings.optionD4)}>
                  <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                    <span className="mb-0 font-weight-bold ml-1">
                      <span className="d-flex align-items-center">
                        <div>
                          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.04 0C31.4 0 40 9.31397 40 19.97C40 32.3285 29.92 40 20 40C16.72 40 13.08 39.1187 10.16 37.3961C9.14 36.7752 8.28 36.3145 7.18 36.675L3.14 37.8768C2.12 38.1973 1.2 37.3961 1.5 36.3145L2.84 31.8277C3.06 31.2068 3.02 30.5458 2.7 30.025C0.98 26.8603 0 23.3951 0 20.03C0 9.49424 8.42 0 20.04 0ZM29.18 17.4862C27.76 17.4862 26.62 18.6279 26.62 20.0501C26.62 21.4522 27.76 22.6139 29.18 22.6139C30.6 22.6139 31.74 21.4522 31.74 20.0501C31.74 18.6279 30.6 17.4862 29.18 17.4862ZM19.96 17.4862C18.56 17.4662 17.4 18.6279 17.4 20.03C17.4 21.4522 18.54 22.5939 19.96 22.6139C21.38 22.6139 22.52 21.4522 22.52 20.0501C22.52 18.6279 21.38 17.4862 19.96 17.4862ZM10.74 17.4862C9.32 17.4862 8.18 18.6279 8.18 20.0501C8.18 21.4522 9.34 22.6139 10.74 22.6139C12.16 22.5939 13.3 21.4522 13.3 20.0501C13.3 18.6279 12.16 17.4862 10.74 17.4862Z" fill="white"/>
                          </svg>
                          {/* <i
                            className="fas fa-comment-dots display-4"
                            style={{
                              fontSize: "250%",
                            }}
                          /> */}
                        </div>
                        <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                          <div>
                            <div className="text-body text-big font-weight-bold" style={{
                              lineHeight: "0px",
                            }}>
                              Live Chat
                              <Badge
                                pill variant="default"
                                className="font-weight-bold align-text-bottom ml-2 cursor-pointer" style={{background: "#FFFFFF", color: "#000000"}}>
                                {this.props.game.messages.length > 0
                                  ? this.props.game.messages.length > 99
                                    ? '99+'
                                    : this.props.game.messages.length
                                  : '0'}
                              </Badge>
                            </div>
                            {/* <span
                              className="text-muted small mt-0 cursor-pointer font-weight-bold"
                              onClick={e => this.props.openSlide(4)}>
                              Open Messages
                            </span> */}
                          </div>
                        </span>
                      </span>
                    </span>
                    <div>
                      <span
                        className="text-muted small mt-0 cursor-pointer font-weight-bold mr-3"
                        onClick={e => this.props.openSlide(4)}>
                        <img src={`${process.env.PUBLIC_URL}/svg/icons/open-in-full.svg`} alt="Full view Icon" />                            
                      </span>
                      <Form.Label
                        className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation align-self-baseline"
                        onClick={e => this.props.change('optionD4', !this.props.settings.optionD4)}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            {/* <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" /> */}
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                          </svg>
                        </span>
                      </Form.Label>
                    </div>                    
                  </span>
                </Card>
                {/* / Live Chat Panel Header Panel */}

                {/* Live Chat Panel Header Divider */}
                <ProgressBar
                  className="livechat-panel-opacity-animation"
                  variant="info"
                  now={100}
                  animated={true}
                  style={{
                    height: "4px",
                    borderRadius: "0px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }} />
                {/* / Live Chat Panel Header Divider */}
              </>
            )}
            {/* / Live Chat Panel Header */}

            {/* Live Chat Tab Selector */}
            {this.state.visible && this.props.settings.optionD4 && this.props.settings.optionF7 && (
              <div className="flex-grow-0 py-0 pr-0 pl-lg-0 livechat-panel-opacity-animation">
                <Media className="align-items-center">
                  <Button
                    style={{
                      borderRadius: "0px",
                      background: `${this.state.channel === 'system' ? 'rgba(67, 67, 79, 0.5)': 'rgba(23, 23, 28, 0.5)'}`
                    }}
                    variant={`${this.state.channel === 'system' ? 'widget5' : 'widget6'}`}
                    className="py-1 d-flex align-items-center justify-content-center border-0 h5 mb-0 small font-weight-bold w-100"
                    disabled={false}
                    onClick={() => { this.handleChangeChannel('system') }}>
                    <span className="small font-weight-bold">
                      System Messages
                    </span>
                  </Button>
                  <Button
                    style={{
                      borderRadius: "0px",
                      background: `${this.state.channel === 'player' ? 'rgba(67, 67, 79, 0.5)': 'rgba(23, 23, 28, 0.5)'}`
                    }}
                    variant={`${this.state.channel === 'player' ? 'widget5' : 'widget6'}`}
                    className="py-1 d-flex align-items-center justify-content-center border-0 h5 mb-0 small font-weight-bold w-100"
                    disabled={false}
                    onClick={() => { this.handleChangeChannel('player') }}>
                    <span className="small font-weight-bold">
                      Live Chat
                    </span>
                  </Button>
                </Media>
              </div>
            )}
            {/* / Live Chat Tab Selector */}

            {/* Live Chat Messages */}
            <div className="flex-grow-1 position-relative" style={{ height: "230px"}}>
              {this.state.visible && this.props.settings.optionD4 && this.props.settings.optionF7 && (
                <div>
                  <PerfectScrollbar
                    options={{
                      suppressScrollX: true,
                      wheelPropagation: true,
                    }}
                    className={`
                      chat-messages 
                      chat-scroll 
                      p-0 px-2 py-2
                      justify-content-end 
                      livechat-panel-opacity-animation 
                     
                                            `}
                    ref={this.scrollRef}
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "0px",
                      backdropFilter: `${this.props.settings.optionD12
                        ? "blur(4px)"
                        : null}`,
                      display: "inline flow-root list-item",
                    }}>

                    {this.state.channel === 'system' && (
                      <>
                        {this.state.data.system
                          .slice(-32)
                          .map((message, index) =>
                            <div
                              key={index}
                              className={`
                                mb-2 
                                cursor-pointer
                                chat-message-${message.user === this.props.game.profile.username
                                  ? 'right'
                                  : 'left'} 
                                ${this.props.settings.optionD10
                                  ? 'livechat-msg-l-opacity-animation'
                                  : null}`}>
                              <div>
                                <div
                                  className="flex-shrink-1 py-2 px-3"
                                  style={{
                                    borderRadius: message.user === this.props.game.profile.username
                                      ? '10px 10px 2px 10px'
                                      : '10px 10px 10px 2px',
                                    backgroundColor: message.user === this.props.game.profile.username
                                      ? 'rgba(0, 0, 0, 0.75)'
                                      : 'rgba(0, 0, 0, 0.75)',
                                  }}>
                                  <div className="font-weight-bold mb-0 d-flex align-items-center">
                                    {message.user === this.props.game.profile.username
                                      ? 'You'
                                      : truncateUsername(message.user)}
                                    {message.dealer && (
                                      <Badge
                                        pill variant="default"
                                        className="ml-1 font-weight-bold">
                                        Dealer
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="font-weight-bold">
                                    {this.handleEvaluateMessageData(message.dealer, message.data)}
                                  </span>
                                </div>

                                <div
                                  className={`
                                    text-muted text-tiny text-nowrap font-weight-bold d-flex 
                                    ${message.user === this.props.game.profile.username
                                      ? 'justify-content-end'
                                      : 'justify-content-start'}`}
                                  style={{
                                    marginTop: "0.125rem",
                                  }}>
                                  <span className="d-flex align-items-center" style={{ fontSize: "80%", }}>
                                    <span className="ml-0">
                                      {moment(message.created_at).format('hh:mm A')}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                      </>
                    )}

                    {this.state.channel === 'player' && (
                      <>
                        {this.state.data.player
                          .slice(-32)
                          .map((message, index) =>

                            <div
                              key={index}
                              className={`
                                mb-2 
                                cursor-pointer
                                chat-message-${message.user === this.props.game.profile.username
                                  ? 'right'
                                  : 'left'} 
                                ${this.props.settings.optionD10
                                  ? 'livechat-msg-l-opacity-animation'
                                  : null}`}>
                              <div>
                                <div
                                  className="flex-shrink-1 py-2 px-3"
                                  style={{
                                    borderRadius: message.user === this.props.game.profile.username
                                      ? '10px 10px 2px 10px'
                                      : '10px 10px 10px 2px',
                                    backgroundColor: message.user === this.props.game.profile.username
                                      ? 'rgba(0, 0, 0, 0.75)'
                                      : 'rgba(0, 0, 0, 0.75)',
                                  }}>
                                  <div className="font-weight-bold mb-0 d-flex align-items-center">
                                    {message.user === this.props.game.profile.username
                                      ? 'You'
                                      : truncateUsername(message.user)}
                                    {message.dealer && (
                                      <Badge
                                        pill variant="default"
                                        className="ml-1 font-weight-bold">
                                        Dealer
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="font-weight-bold">
                                    {this.handleEvaluateMessageData(message.dealer, message.data)}
                                  </span>
                                </div>
                                <div
                                  className={`
                                    text-muted text-tiny text-nowrap font-weight-bold d-flex 
                                    ${message.user === this.props.game.profile.username
                                      ? 'justify-content-end'
                                      : 'justify-content-start'}`}
                                  style={{
                                    marginTop: "0.125rem",
                                  }}>
                                  <span className="d-flex align-items-center" style={{ fontSize: "80%", }}>
                                    <i className="fas fa-check" />
                                    <span className="ml-1">
                                      {moment(message.created_at).format('hh:mm A')}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                      </>
                    )}

                  </PerfectScrollbar>
                </div>
              )}
            </div>
            {/* / Live Chat Messages */}

            {/* Live Chat Input Panel */}
            {this.props.settings.optionD4 && this.props.settings.optionF7 && (
              <div className="pt-0 pb-2 livechat-panel-opacity-animation">

                {/* Live Chat Options */}
                <Card
                  className="border-0"
                  style={{
                    borderRadius: "0px 0px 15px 15px",
                    background: "rgba(43, 43, 51, 0.5)"
                  }}>
                  <Card.Footer
                    className="p-0 text-left text-muted mb-0 d-flex align-items-center justify-content-start">
                    <span className="d-flex w-100">
                      <ButtonGroup size="sm" className="w-100">

                        {/* Live Chat Giphy Searchbox */}
                        <LiveChatGiphySearchbox
                          {...this.state} {...this.props}
                          submit={this.handleSubmitSendGiphyButton}
                          disabled={this.props.game.player ? false : true} />
                        {/* / Live Chat Giphy Searchbox */}
                        <div style={{background: "#000000", width: "1px"}}></div>
                        {/* Live Chat Emoji Searchbox */}
                        <LiveChatEmojiModal
                          {...this.state} {...this.props}
                          submit={this.handleSubmitSendEmojiButton}
                          disabled={this.props.game.player ? false : true} />
                        {/* / Live Chat Emoji Searchbox */}

                      </ButtonGroup>
                    </span>
                  </Card.Footer>
                </Card>
                {/* / Live Chat Options */}
              </div>
            )}
            {/* / Live Chat Input Panel */}

            {/* Player Quick Actions */}
            <PlayerQuickActions
              {...this.props} {...this.state}
              change={this.props.change}
              openSlide={this.props.openSlide}
            />
            {/* / Player Quick Actions */}
            <div onClick={e => this.props.change('optionD4', !this.props.settings.optionD4)}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.04 0C31.4 0 40 9.31397 40 19.97C40 32.3285 29.92 40 20 40C16.72 40 13.08 39.1187 10.16 37.3961C9.14 36.7752 8.28 36.3145 7.18 36.675L3.14 37.8768C2.12 38.1973 1.2 37.3961 1.5 36.3145L2.84 31.8277C3.06 31.2068 3.02 30.5458 2.7 30.025C0.98 26.8603 0 23.3951 0 20.03C0 9.49424 8.42 0 20.04 0ZM29.18 17.4862C27.76 17.4862 26.62 18.6279 26.62 20.0501C26.62 21.4522 27.76 22.6139 29.18 22.6139C30.6 22.6139 31.74 21.4522 31.74 20.0501C31.74 18.6279 30.6 17.4862 29.18 17.4862ZM19.96 17.4862C18.56 17.4662 17.4 18.6279 17.4 20.03C17.4 21.4522 18.54 22.5939 19.96 22.6139C21.38 22.6139 22.52 21.4522 22.52 20.0501C22.52 18.6279 21.38 17.4862 19.96 17.4862ZM10.74 17.4862C9.32 17.4862 8.18 18.6279 8.18 20.0501C8.18 21.4522 9.34 22.6139 10.74 22.6139C12.16 22.5939 13.3 21.4522 13.3 20.0501C13.3 18.6279 12.16 17.4862 10.74 17.4862Z" fill="white"/>
              </svg> 
            </div> 
          </>
        )}
      </div>
    )
  }
}

export default LiveChat
