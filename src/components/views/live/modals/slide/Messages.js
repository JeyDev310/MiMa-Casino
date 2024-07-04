import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, Card, Col, Form, InputGroup, Media, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import EmojiModal from '../panel/EmojiModal'
import GiphySearchbox from '../panel/GiphySearchboxModal'

import moment from 'moment'
import FileSaver from 'file-saver'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderC from '../../../utilities/loaders/ResourceLoaderC'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'
import '../../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

const EMOJI_LIST = [
  ['Thumbs Up', '0x1F44D'],
  ['Thumbs Down', '0x1F44E'],
  ['Clapping Hands', '0x1F44F'],
  ['Grinning Face', '0x1F600'],
  ['Grinning Face with Sweat', '0x1F605'],
  ['Face with Tears of Joy', '0x1F602'],
  ['Face with Raised Eyebrow', '0x1F928'],
  ['Hourglass', '0x231B'],
  ['zzz', '0x1F4A4'],
]

const Emoji = React.memo(({ className, label, symbol }) =>
  <span className={className} role="img" aria-label={label} style={{
    fontSize: "0.8rem",
  }}>
    {String.fromCodePoint(symbol)}
  </span>)

class Messages extends Component {

  constructor(props) {
    super(props)

    this.columnRef = React.createRef()
    this.messageInputRef = React.createRef()

    this.refreshMessages = this.refreshMessages.bind(this)
    this.handleChangeChannel = this.handleChangeChannel.bind(this)
    this.downloadMessagesJSON = this.downloadMessagesJSON.bind(this)
    this.handleSubmitKeypress = this.handleSubmitKeypress.bind(this)
    this.handleSubmitSendButton = this.handleSubmitSendButton.bind(this)
    this.handleSubmitSendEmojiButton = this.handleSubmitSendEmojiButton.bind(this)
    this.handleSubmitSendGiphyButton = this.handleSubmitSendGiphyButton.bind(this)

    this.handleParsePlayerMessage = this.handleParsePlayerMessage.bind(this)
    this.handleEvaluateMessageData = this.handleEvaluateMessageData.bind(this)
    this.handleEvaluateDealerMessage = this.handleEvaluateDealerMessage.bind(this)
    this.handleEvaluateAutoTextMessage = this.handleEvaluateAutoTextMessage.bind(this)

    this.refreshTimeout = 0

    this.state = {
      input: '',
      channel: 'player',
      data: {
        system: [],
        player: [],
      },
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state.data,
      data: {
        system: this.props.game.messages.filter((item) => item.channel === 'system'),
        player: this.props.game.messages.filter((item) => item.channel === 'player'),
      },
    })
    const element = document.getElementsByClassName('modal-content')[0]
    element.style['padding-bottom'] = 0
    setTimeout(() => {
      try {
        this.messageInputRef.current.focus()
      } catch { }
    }, 1)
    this.refreshMessages()
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
  }

  componentWillUnmount() {
    clearTimeout(this.refreshTimeout)
  }

  refreshMessages() {
    this.refreshTimeout = setTimeout(() => {
      try {
        if (this.columnRef) {
          this.columnRef.current._container.scrollTop = this.columnRef.current._container.scrollHeight
        }
      } catch { }
    }, 10)
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
          className="d-block my-3 mt-3 mb-0 giphy__img_container_wide"
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
      <>
        {/* Messages Modal */}
        <Modal.Body style={{
          margin: "0",
          display: "contents",
        }}>

          {/* Messages Header */}
          <h6 className="px-4 text-left mb-3 font-weight-bold d-flex align-items-center">
            <span>
              Live Poker Studio™ Live Chat
            </span>
            <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
              {this.props.game.connection === "connected"
                ? "Online"
                : "Offline"}
            </Badge>
          </h6>
          {/* / Messages Header */}

          <div className={`chat-wrapper p-0`}>
            <Card className="flex-grow-1 position-relative overflow-hidden">
              <Row noGutters className="h-100">
                <Col className="d-flex flex-column">

                  {/* Messages Profile Header */}
                  <div className="flex-grow-0 py-3 pr-4 pl-lg-4 bg-lightest">
                    <Media className="align-items-center">
                      <span className="chat-sidebox-toggler d-lg-none d-block text-muted text-large px-2 mr-2" />

                      <div className="position-relative">
                        <Badge
                          variant={`${this.props.game.connection === "connected"
                            ? "success"
                            : "danger"} badge-dot indicator`} />
                        <img
                          src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                          className="ui-w-40 rounded-circle" alt="Avatar" />
                      </div>

                      <Media.Body className="pl-3">
                        <strong>
                          {this.props.game.profile.email || truncateUsername(this.props.game.profile.username)}
                        </strong>

                        <div className="text-muted small">
                          <em>
                            {this.props.game.connection === "connected"
                              ? "Online"
                              : "Offline"}
                          </em>
                        </div>
                      </Media.Body>

                      <div>
                        {this.props.game.messages.length > 0
                          ? <Button
                            size="sm"
                            variant="light rounded-pill md-btn-flat"
                            className="font-weight-bold"
                            onClick={this.downloadMessagesJSON}
                            disabled={false}>
                            Download Messages
                          </Button>
                          : <Button
                            size="sm"
                            variant="light rounded-pill md-btn-flat"
                            className="font-weight-bold"
                            onClick={this.downloadMessagesJSON}
                            disabled={true}>
                            Download Messages
                          </Button>}
                      </div>
                    </Media>
                  </div>
                  {/* / Messages Profile Header */}

                  <hr className="flex-grow-0 border-light m-0" />

                  {/* Messages Tab Selector */}
                  <div className="flex-grow-0 py-0 pr-0 pl-lg-0 bg-lightest">
                    <Media className="align-items-center">
                      <Button
                        style={{
                          borderRadius: "0px",
                        }}
                        variant={`${this.state.channel === 'system' ? 'opaque2' : 'opaque1'}`}
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
                        }}
                        variant={`${this.state.channel === 'player' ? 'opaque2' : 'opaque1'}`}
                        className="py-1 d-flex align-items-center justify-content-center border-0 h5 mb-0 small font-weight-bold w-100"
                        disabled={false}
                        onClick={() => { this.handleChangeChannel('player') }}>
                        <span className="small font-weight-bold">
                          Live Chat
                        </span>
                      </Button>
                    </Media>
                  </div>
                  {/* / Messages Tab Selector */}

                  <hr className="flex-grow-0 border-light m-0" />

                  {/* Messages Live Chat List */}
                  {this.props.game.messages.length > 0
                    ? <div className="flex-grow-1 position-relative">
                      <PerfectScrollbar options={{
                        suppressScrollX: true,
                        wheelPropagation: true,
                      }}
                        className="chat-messages chat-scroll p-4"
                        ref={this.columnRef}>

                        {this.state.channel === 'system' && (
                          <>
                            {this.state.data.system
                              .slice(-128)
                              .map((message, index) =>
                                <div
                                  key={index}
                                  className={`
                                    mb-2 
                                    chat-message-${message.user === this.props.game.profile.username
                                      ? 'right'
                                      : 'left'}
                                    ${this.props.settings.optionD10
                                      ? 'livechat-msg-slide-r-opacity-animation'
                                      : null}`}>
                                  <div>
                                    <div
                                      className="flex-shrink-1 py-2 px-3"
                                      style={{
                                        borderRadius: message.user === this.props.game.profile.username
                                          ? '10px 10px 2px 10px'
                                          : '10px 10px 10px 2px',
                                        backgroundColor: message.user === this.props.game.profile.username
                                          ? 'rgba(28, 28, 28, 0.5)'
                                          : 'rgba(255, 255, 255, 0.12)',
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
                                      className="text-muted text-tiny text-nowrap font-weight-bold d-flex justify-content-end"
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

                        {this.state.channel === 'player' && (
                          <>
                            {this.state.data.player
                              .slice(-128)
                              .map((message, index) =>
                                <div
                                  key={index}
                                  className={`
                                    mb-2 
                                    chat-message-${message.user === this.props.game.profile.username
                                      ? 'right'
                                      : 'left'}
                                    ${this.props.settings.optionD10
                                      ? 'livechat-msg-slide-r-opacity-animation'
                                      : null}`}>
                                  <div>
                                    <div
                                      className="flex-shrink-1 py-2 px-3"
                                      style={{
                                        borderRadius: message.user === this.props.game.profile.username
                                          ? '10px 10px 2px 10px'
                                          : '10px 10px 10px 2px',
                                        backgroundColor: message.user === this.props.game.profile.username
                                          ? 'rgba(28, 28, 28, 0.5)'
                                          : 'rgba(255, 255, 255, 0.12)',
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
                                      className="text-muted text-tiny text-nowrap font-weight-bold d-flex justify-content-end"
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
                    : <div className="flex-grow-1 position-relative">
                      <PerfectScrollbar
                        options={{
                          suppressScrollX: true,
                          wheelPropagation: true,
                        }}
                        className="chat-messages chat-scroll p-4"
                        ref={this.columnRef}
                        style={{
                          justifyContent: "center",
                        }}>

                        <div style={{ alignSelf: "center", display: "flex", }}>
                          <Card
                            className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none"
                            style={{
                              borderRadius: "15px",
                            }}>
                            <Row noGutters className="h-100 border-0 bg-transparent" style={{
                              justifyContent: "center",
                            }}>
                              <Col
                                sm={12} md={12} lg={12}
                                className="d-flex align-items-center border-0 shadow-none mb-3"
                                style={{ justifyContent: "center", }}>
                                <ResourceLoaderC
                                  height="4rem" width="4rem" />
                              </Col>

                              <div className={`text-center text-white opacity-100 mb-3`}>
                                Messages currently empty...
                              </div>

                              <div className="text-left text-left text-white opacity-50 text-tiny mb-0 px-5">
                                Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                              </div>
                            </Row>
                          </Card>
                        </div>

                      </PerfectScrollbar>
                    </div>}
                  {/* / Messages Live Chat List */}

                  {/* Messages Live Chat Footer */}
                  {this.state.channel === 'player' && (
                    <div className="livechat-msg-slide-r-opacity-animation">

                      {/* Messages Live Input Divider */}
                      <hr className="border-light m-0" />
                      {/* / Messages Live Input Divider */}

                      {/* Messages Emoji Input */}
                      <div
                        className="flex-grow-0 pt-4 px-4 pb-0"
                        style={{
                          backgroundColor: "rgba(28, 28, 28, 0.5)",
                        }}>
                        <Row>
                          <Col className="d-flex justify-content-between">
                            <ButtonGroup
                              size="sm"
                              className="mx-0 my-0 w-100">

                              {/* Emoji Searchbox */}
                              <EmojiModal
                                {...this.state} {...this.props}
                                submit={this.handleSubmitSendEmojiButton}
                                disabled={this.props.game.player ? false : true} />
                              {/* / Emoji Searchbox */}

                              {/* Giphy Searchbox */}
                              <GiphySearchbox
                                {...this.state} {...this.props}
                                submit={this.handleSubmitSendGiphyButton}
                                disabled={this.props.game.player ? false : true} />
                              {/* / Giphy Searchbox */}

                              {EMOJI_LIST
                                .slice(0, 7)
                                .map((icon, index) => (
                                  <OverlayTrigger
                                    key={index}
                                    placement="top"
                                    overlay={<Tooltip>
                                      {icon[0]}
                                    </Tooltip>}>
                                    <Button
                                      variant="light"
                                      className="py-1 d-flex align-items-center justify-content-center"
                                      disabled={this.props.game.player
                                        ? false
                                        : true}
                                      onClick={() => {
                                        this.handleSubmitSendEmojiButton(icon[1])
                                      }}
                                      style={{
                                        boxShadow: "0 0 0 2px rgba(255, 255, 255, 0)",
                                        borderTopLeftRadius: "0px",
                                        borderTopRightRadius: index === 6
                                          ? "10px"
                                          : "0px",
                                        borderBottomLeftRadius: "0px",
                                        borderBottomRightRadius: "0px",
                                      }}>
                                      <Emoji symbol={icon[1]} />
                                    </Button>
                                  </OverlayTrigger>
                                ))}

                            </ButtonGroup>
                          </Col>
                        </Row>
                      </div>
                      {/* / Messages Emoji Input */}

                      {/* Messages Input Group */}
                      <div
                        className="flex-grow-0 pt-0 pb-4 px-4"
                        style={{
                          backgroundColor: "rgba(28, 28, 28, 0.5)",
                        }}>
                        <InputGroup>
                          <Form.Control
                            ref={this.messageInputRef}
                            style={{
                              borderTopLeftRadius: "0px",
                              borderTopRightRadius: "0px",
                              borderBottomLeftRadius: "10px",
                              borderBottomRightRadius: "0px",
                            }}
                            placeholder="Type your message..."
                            className="font-weight-semibold"
                            type="text"
                            maxLength={64}
                            value={this.state.input}
                            disabled={this.props.game.player
                              ? false
                              : true}
                            onKeyPress={(e) => {
                              this.handleSubmitKeypress(e)
                            }}
                            onChange={(e) => {
                              this.setState({ input: e.target.value, })
                            }} />

                          <InputGroup.Append>
                            <Button
                              variant="danger"
                              className="font-weight-bold"
                              onClick={this.handleSubmitSendButton}
                              style={{
                                borderTopLeftRadius: "0px",
                                borderTopRightRadius: "0px",
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "10px",
                              }}
                              disabled={this.props.game.player
                                ? false
                                : true}>
                              Send
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </div>
                      {/* / Messages Input Group */}

                    </div>
                  )}
                  {/* Messages Live Chat Footer */}

                </Col>

              </Row>
            </Card>
          </div>

        </Modal.Body>
        {/* / Messages Modal */}
      </>
    )
  }
}

export default Messages