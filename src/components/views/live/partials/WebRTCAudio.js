import React, { Component } from 'react'
import WebRTCAdapter from '../core/WebRTCAdapter'

import '../../../../vendor/styles/pages/chat.scss'

class WebRTCAudioPlayer extends Component {

  constructor(props) {
    super(props)

    this.audioRef = React.createRef()
    this.WebRTCAdapter = null
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
          streamName: this.props.game.data.table_streams.stream_key_2,
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
      if (this.audioRef) {
        if (prevProps.settings.optionB1 !== this.props.settings.optionB1) {
          const element = document.getElementById("remoteAudio")
          element.pause()
          element.volume = Number(Number(this.props.settings.optionB1) / 100)
          element.play()
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
      remoteVideoId: "remoteAudio",
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* WebRTC Audio Player */}
        {this.state.init && (
          <>
            <audio
              ref={this.audioRef}
              id="remoteAudio"
              playsInline
              autoPlay
              muted={this.props.settings.optionB2}
            />
          </>
        )}
        {/* / WebRTC Audio Player */}
      </>
    )
  }
}

export default WebRTCAudioPlayer
