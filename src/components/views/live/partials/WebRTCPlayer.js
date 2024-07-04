import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import HUD from '../utilities/HUD'
import NetworkStatusMonitor from '../utilities/NetworkStatusMonitor'
import ResourceLoaderP from '../../utilities/loaders/ResourceLoaderP'
import WebRTCAdapter from '../core/WebRTCAdapter'

import '../../../../vendor/styles/pages/chat.scss'

class WebRTCPlayer extends Component {

  constructor(props) {
    super(props)

    this.videoRef = React.createRef()
    this.WebRTCAdapter = null
    this.getHTML5VideoPoster = this.getHTML5VideoPoster.bind(this)
    this.onHandleStartStream = this.onHandleStartStream.bind(this)
    this.onHandleChangeStream = this.onHandleChangeStream.bind(this)
    this.onHandleInitiateWebRTCAdapter = this.onHandleInitiateWebRTCAdapter.bind(this)

    this.state = {
      init: true,
      dealer: false,
      websocketURL: '',
      streamName: '',
      token: '',
      isShow: false,
      isConnected: false,
      isError: false,
      isLoading: true,
      isPlaying: false,
      pc_config: {
        'iceServers': [{
          'urls': 'stun:stun.l.google.com:19302',
        }],
      },
      mediaConstraints: {
        video: false,
        audio: false,
      },
      sdpConstraints: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
      },
    }
  }

  componentDidMount() {
    this.setState({ dealer: this.props.game.dealer })
    try {
      if (this.props.game.data) {
        this.setState({
          streamName: this.props.game.data.table_streams.stream_key_1,
          websocketURL: process.env.REACT_APP_ANTMEDIA_WSS_ENDPOINT,
        }, () => {
          if (this.state.init && !this.props.game.data.auto_mode) {
            this.WebRTCAdapter = this.onHandleInitiateWebRTCAdapter()
            this.setState({ isShow: true })
          }
        })
      }
    } catch {
      this.setState({ init: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
    try {
      if (this.videoRef) {
        if (prevProps.settings.optionB1 !== this.props.settings.optionB1) {
          const element = document.getElementById("remoteVideo")
          element.volume = Number(Number(this.props.settings.optionB1) / 100)
        }
        if (prevProps.settings.optionE2 !== this.props.settings.optionE2) {
          if (this.WebRTCAdapter) {
            this.WebRTCAdapter.stop(
              this.state.streamName,
            )
            if (this.props.game.data) {
              this.setState({
                streamName: this.props.game.data.table_streams.stream_key_1,
                websocketURL: process.env.REACT_APP_ANTMEDIA_WSS_ENDPOINT,
              }, () => {
                if (this.state.init) {
                  this.WebRTCAdapter = this.onHandleInitiateWebRTCAdapter()
                  this.setState({
                    isShow: true,
                  })
                }
              })
            }
          }
        }
        if (prevProps.settings.optionE3 !== this.props.settings.optionE3) {
          if (this.WebRTCAdapter) {
            this.WebRTCAdapter.stop(
              this.state.streamName,
            )
          }
        }
        if (prevProps.settings.optionE4 !== this.props.settings.optionE4) {
          if (this.WebRTCAdapter) {
            this.WebRTCAdapter.stop(
              this.state.streamName,
            )
            if (this.props.game.data) {
              this.setState({
                streamName: this.props.game.data.table_streams.stream_key_1,
                websocketURL: process.env.REACT_APP_ANTMEDIA_WSS_ENDPOINT,
              }, () => {
                if (this.state.init) {
                  this.WebRTCAdapter = this.onHandleInitiateWebRTCAdapter()
                  this.setState({
                    isShow: true,
                  })
                }
              })
            }
          }
        }
        if (prevProps.game.status !== this.props.game.status) {
          try {
            if (this.props.game.status.code === "ER1") {
              if (this.state.dealer) return
              this.setState({ isLoading: true }, () => {
                if (this.WebRTCAdapter) {
                  this.WebRTCAdapter.stop(this.state.streamName)
                }
              })
            }
          } catch { }
        }
      }
    } catch { }
  }

  componentWillUnmount() {
    try {
      if (this.WebRTCAdapter) {
        this.WebRTCAdapter.stop(
          this.state.streamName,
        )
      }
    } catch { }
  }

  onHandleChangeStream(value) {
    this.setState({ streamName: value })
  }

  onHandleStartStream() {
    this.WebRTCAdapter.play(this.state.streamName, this.state.token)
  }

  onHandleInitiateWebRTCAdapter() {
    return new WebRTCAdapter({
      websocket_url: this.state.websocketURL,
      mediaConstraints: this.state.mediaConstraints,
      peerconnection_config: this.state.pc_config,
      sdp_constraints: this.state.sdpConstraints,
      remoteVideoId: "remoteVideo",
      isPlayMode: true,
      debug: false,
      candidateTypes: ["tcp", "udp"],
      callback: function (info, obj) {
        if (info === "initialized") {
          this.setState({
            isConnected: true,
            isLoading: true,
          }, () => {
            this.onHandleStartStream()
          })
        } else if (info === "play_started") {
          this.setState({
            isLoading: false,
            isPlaying: true,
          })
        } else if (info === "play_finished") {
          this.setState({
            isPlaying: false,
          })
        } else if (info === "closed") {
        } else if (info === "streamInformation") {
        } else if (info === "ice_connection_state_changed") {
        } else if (info === "updated_stats") {
        } else if (info === "data_received") {
        } else if (info === "bitrateMeasurement") {
        } else {
        }
      }.bind(this),
      callbackError: function (error) {
        this.setState({
          isConnected: false,
          isError: true,
          isLoading: false,
          isPlaying: false,
        })
      }.bind(this)
    })
  }

  getHTML5VideoPoster() {
    return `${process.env.PUBLIC_URL}/img/cardroom/bg.jpg`
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* WebRTC Player */}
        <>
          {this.state.init && (
            <>
              {/* HTML5 Video Container */}
              <video
                ref={this.videoRef}
                id="remoteVideo"
                className="live-video"
                poster={this.state.isPlaying ? null : this.getHTML5VideoPoster()}
                playsInline
                autoPlay
                height="500"
                volume={Number(this.props.settings.optionB1)}
                muted={this.props.settings.optionB2}
                style={{
                  display: `${this.props.settings.optionE1 && !this.state.isLoading ? "initial" : "none"}`,
                  // width: "100%",
                  // height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  position: "absolute",
                  filter: `brightness(${Number(this.props.settings.optionC1) / 100}) contrast(${Number(this.props.settings.optionC2) / 100}) grayscale(${Number(this.props.settings.optionC3) / 100}) hue-rotate(${Number(this.props.settings.optionC4)}deg) sepia(${Number(this.props.settings.optionC5) / 100})`,
                  transform: `${this.props.settings.optionC9 ? "rotateY(180deg)" : "none"}`,
                  WebkitTransform: `${this.props.settings.optionC9 ? "rotateY(180deg)" : "none"}`,
                  MozTransform: `${this.props.settings.optionC9 ? "rotateY(180deg)" : "none"}`,
                }}
              />
              {/* / HTML5 Video Container */}

              {/* Error State */}
              {this.state.isError &&
                <Card.Body style={{
                  display: "grid",
                  alignContent: "center",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  position: "absolute",
                  filter: `brightness(1)`,
                }}>
                  {this.props.settings.optionE1 && (
                    <>
                      <ResourceLoaderP
                        height="6rem" width="6rem" />
                      <h4 className="text-center mt-3 mb-2 font-weight-bold">
                        Stream not initialized
                      </h4>
                      <div className="text-center text-white opacity-50 small mb-5">
                        There is currently a problem with the playback of the stream.
                      </div>
                    </>
                  )}
                </Card.Body>
              }
              {/* / Error State */}

              {/* Loading State */}
              {this.state.isLoading &&
                <Card.Body style={{
                  display: "grid",
                  alignContent: "center",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  position: "absolute",
                  filter: `brightness(1)`,
                }}>
                  {this.props.settings.optionE1 && (
                    <Card className="d-flex w-100 mb-0 bg-transparent border-0 shadow-none">
                      <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                        <Col
                          sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none"
                          style={{ justifyContent: "center", }}>
                          <ResourceLoaderP
                            height="6rem" width="6rem" />
                        </Col>
                      </Row>
                    </Card>
                  )}
                </Card.Body>
              }
              {/* / Loading State */}

              {/* Network Status */}
              <NetworkStatusMonitor
                {...this.props}
                {...this.state}
              />
              {/* Network Status */}

              {/* Head-up-Display */}
              <HUD
                {...this.props}
                {...this.state}
                change={this.props.change}
                openSlide={this.props.openSlide}
              />
              {/* Head-up-Display */}

            </>
          )}
        </>
        {/* / WebRTC Player */}
      </>
    )
  }
}

export default WebRTCPlayer
