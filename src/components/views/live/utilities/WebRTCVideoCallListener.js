import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { truncateString, truncateUsername } from './TextPreprocessing'

function WebRTCVideoCallWebSocketAdapter(initialValues, host, room, user) {

  var self = this

  self.host = host
  self.room = room
  self.user = user
  self.websocketURL = `${self.host}?room_id=${self.room}&username=${self.user}`

  for (var key in initialValues) {
    if (initialValues.hasOwnProperty(key)) {
      this[key] = initialValues[key]
    }
  }

  var client = new W3CWebSocket(self.websocketURL)
  var connected = false

  this.close = function () {
    client.close()
  }

  client.onopen = function () {
    connected = true
  }

  this.send = function (payload) {
    if (client.readyState === 0 || client.readyState === 2 || client.readyState === 3) {
      return
    }
    client.send(payload)
  }

  this.isConnected = function () {
    return connected
  }

  client.onmessage = function (event) {
    var msg = JSON.parse(event.data)
    switch (msg.type) {
      case "on_connect":
        self.callback(msg.type, msg)
        break

      case "on_ready":
        self.callback(msg.type, msg)
        break

      case "on_candidate":
        self.callback(msg.type, msg)
        break

      case "on_offer":
        self.callback(msg.type, msg)
        break

      case "on_answer":
        self.callback(msg.type, msg)
        break

      case "on_disconnect":
        self.callback(msg.type, msg)
        break

      default:
        break
    }
  }

  client.onerror = function (error) {
    self.callbackError(error)
  }

  client.onclose = function (event) {
    connected = false
    self.callbackClose(event)
  }

  this.sendReady = function (uid) {
    if (client.readyState === 0 || client.readyState === 2 || client.readyState === 3) {
      return
    }

    var payload = JSON.stringify({
      type: "ready",
      message: {
        details: "hello"
      },
    })

    client.send(payload)
  }

  this.sendOffer = function (uid, offer, recipient) {
    if (client.readyState === 0 || client.readyState === 2 || client.readyState === 3) {
      return
    }

    var payload = JSON.stringify({
      type: "offer",
      recipient: recipient,
      message: offer,
    })

    client.send(payload)
  }

  this.sendAnswer = function (uid, answer, recipient) {
    if (client.readyState === 0 || client.readyState === 2 || client.readyState === 3) {
      return
    }

    var payload = JSON.stringify({
      type: "answer",
      recipient: recipient,
      message: answer,
    })

    client.send(payload)
  }

  this.sendCandidate = function (uid, candidate) {
    if (client.readyState === 0 || client.readyState === 2 || client.readyState === 3) {
      return
    }

    var payload = JSON.stringify({
      type: "candidate",
      message: candidate,
    })

    client.send(payload)
  }
}

class WebRTCVideoCallListener extends Component {

  constructor(props) {
    super(props)

    this._mounted = false
    this.userVideo = React.createRef()
    this.peerVideo = React.createRef()

    this.RTCPeerConnections = {}
    this.RTCPeerChannels = []

    this.socket = null
    this.userStream = null

    this.join = this.join.bind(this)
    this.removeChannel = this.removeChannel.bind(this)
    this.onIceCandidateFunction = this.onIceCandidateFunction.bind(this)

    this.state = {
      init: false,
      username: "",
      dealer: false,
      audioEnabled: true,
      videoEnabled: false,
      isConnected: false,
      isConnecting: true,
      isExited: false,
      isError: false,
      isClosed: false,
      channels: [],
    }
  }

  componentDidMount() {
    this._mounted = true
    this.setState({
      username: JSON.parse(localStorage.getItem('user')).user.username,
      dealer: this.props.game.dealer,
    }, () => {
      if (!this.props.game.data.video_conferencing_enabled) return
      if (this.state.dealer) return
      this.setState({ init: true }, () => {
        if (this.socket === null && this.props.game.data.room_name) {
          this.socket = this.initiateWebSocket(this.props.game.data.room_name)
        }
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
    if (prevProps.game.data.room_name !== this.props.game.data.room_name) {
      if (!this.props.game.data.video_conferencing_enabled) return
      if (this.state.dealer) return
      this.setState({ init: true }, () => {
        if (this.socket === null && this.props.game.data.room_name) {
          this.socket = this.initiateWebSocket(this.props.game.data.room_name)
        }
      })
    }
  }

  componentWillUnmount() {
    this._mounted = false
    if (this.state.client) {
      this.state.client.close()
    }
    if (this.userStream) {
      this.userStream.getTracks().forEach(function (track) {
        track.stop()
      })
    }
  }

  removeChannel(channel, callback) {
    var array = [...this.state.channels]
    var index = array.indexOf(channel)
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({ channels: array }, () => callback())
    }
  }

  initiateWebSocket(room_name) {
    this.setState({
      client: new WebRTCVideoCallWebSocketAdapter({
        callback: function (info, obj) {
          switch (info) {

            case "on_connect":
              this.join()
              break

            case "on_ready":
              if (this.state.channels.includes(obj.message.username)) {
                break
              }
              if (this.state.channels.length >= 6) {
                break
              }

              this.setState({ channels: [...this.state.channels, obj.message.username] }, () => {
                this.RTCPeerConnections[obj.message.specific] = new RTCPeerConnection({
                  iceServers: [
                    { urls: "stun:stun.services.mozilla.com" },
                    { urls: "stun:stun.l.google.com:19302" },
                  ],
                })
                this.RTCPeerConnections[obj.message.specific].onicecandidate = this.onIceCandidateFunction
                this.RTCPeerConnections[obj.message.specific].addEventListener("track", (e) => {
                  let videoElement = document.getElementById(obj.message.username)
                  videoElement.srcObject = e.streams[0]
                  videoElement.onloadedmetadata = function (e) {
                    videoElement.play()
                  }
                }, false)
                this.RTCPeerConnections[obj.message.specific].addTrack(this.userStream.getTracks()[0], this.userStream);
                if (this.state.audioEnabled) {
                  this.RTCPeerConnections[obj.message.specific].addTrack(this.userStream.getTracks()[1], this.userStream);
                }
                this.RTCPeerConnections[obj.message.specific]
                  .createOffer()
                  .then((offer) => {
                    this.RTCPeerConnections[obj.message.specific].setLocalDescription(offer)
                    this.state.client.sendOffer(null, offer, obj.message.specific)
                  }).catch((err) => {
                    console.log(err)
                  })
                this.RTCPeerConnections[obj.message.specific].addEventListener('connectionstatechange', event => {
                  if (
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'disconnected' ||
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'failed' ||
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'closed'
                  ) {
                    this.removeChannel(obj.message.username, () => {
                      this.RTCPeerConnections[obj.message.specific].close()
                    })
                  }
                })
              })
              break

            case "on_offer":
              if (this.state.channels.includes(obj.message.username)) {
                break
              }
              if (this.state.channels.length >= 6) {
                break
              }

              this.setState({ channels: [...this.state.channels, obj.message.username] }, () => {
                this.RTCPeerConnections[obj.message.specific] = new RTCPeerConnection({
                  iceServers: [
                    { urls: "stun:stun.services.mozilla.com" },
                    { urls: "stun:stun.l.google.com:19302" },
                  ],
                })
                this.RTCPeerConnections[obj.message.specific].onicecandidate = this.onIceCandidateFunction
                this.RTCPeerConnections[obj.message.specific].addEventListener("track", (e) => {
                  let videoElement = document.getElementById(obj.message.username)
                  videoElement.srcObject = e.streams[0]
                  videoElement.onloadedmetadata = function (e) {
                    videoElement.play()
                  }
                }, false)
                this.RTCPeerConnections[obj.message.specific].addTrack(this.userStream.getTracks()[0], this.userStream)
                if (this.state.audioEnabled) {
                  this.RTCPeerConnections[obj.message.specific].addTrack(this.userStream.getTracks()[1], this.userStream)
                }
                this.RTCPeerConnections[obj.message.specific].setRemoteDescription(obj.message.details)
                this.RTCPeerConnections[obj.message.specific]
                  .createAnswer()
                  .then((answer) => {
                    this.RTCPeerConnections[obj.message.specific].setLocalDescription(answer)
                    this.state.client.sendAnswer(null, answer, obj.message.specific)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                this.RTCPeerConnections[obj.message.specific].addEventListener('connectionstatechange', event => {
                  if (
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'disconnected' ||
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'failed' ||
                    this.RTCPeerConnections[obj.message.specific].connectionState === 'closed'
                  ) {
                    this.removeChannel(obj.message.username, () => {
                      this.RTCPeerConnections[obj.message.specific].close()
                    })
                  }
                })
              })
              break

            case "on_answer":
              this.RTCPeerConnections[obj.message.specific].setRemoteDescription(obj.message.details)
              break

            case "on_candidate":
              try {
                const sd = this.RTCPeerConnections[obj.message.specific].remoteDescription
                if (sd) {
                  this.RTCPeerConnections[obj.message.specific].addIceCandidate(new RTCIceCandidate(obj.message.details))
                }
              } catch { }
              break

            case "on_disconnect":
              this.removeChannel(obj.message.username, () => {
                this.RTCPeerConnections[obj.message.specific].close()
              })
              break

            default:
              break
          }
        }.bind(this),
        callbackError: function (error) {
          if (this._mounted) {
            this.setState({
              isConnected: false,
              isConnecting: false,
              isExited: true,
              isError: true,
              isClosed: true,
            })
          }
        }.bind(this),
        callbackClose: function (error) {
          if (this._mounted) {
            this.setState({
              isConnected: false,
              isConnecting: false,
              isExited: true,
              isError: false,
              isClosed: true,
            })
          }
        }.bind(this),
      },
        String(process.env.REACT_APP_ENV === 'development'
          ? process.env.REACT_APP_DEVELOPMENT_WS_HOST_VIDEO_CALL
          : process.env.REACT_APP_PRODUCTION_WS_HOST_VIDEO_CALL),
        room_name, this.state.username
      )
    }, () => { })
  }

  join() {
    navigator.mediaDevices
      .getUserMedia({
        audio: this.state.audioEnabled,
        video: { width: 640, height: 480 },
      })
      .then(function (stream) {
        this.userStream = stream
        this.userVideo.current.srcObject = stream;
        this.userVideo.current.onloadedmetadata = function (e) {
          this.userVideo.current.play();
          this.state.client.sendReady(null);
          this.setState({ videoEnabled: true })
        }.bind(this);
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      });
  }

  onIceCandidateFunction(event) {
    if (event.candidate) {
      this.state.client.sendCandidate(null, event.candidate)
    }
  }

  render() {
    return (<>
      {this.state.init && (
        <div style={{
          width: "auto",
          position: "absolute",
          zIndex: "0",
          margin: "0 auto",
          left: "0",
          right: "0",
          padding: "20px 20px 10px 20px",
          background: this.state.videoEnabled
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(0, 0, 0, 0.0)",
          borderRadius: "0 0 15px 15px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}>
          <div className="justify-content-center align-items-center">
            <span className="d-flex justify-content-center align-items-center">
              <video
                ref={this.userVideo}
                muted
                style={{
                  display: this.state.videoEnabled
                    ? "initial"
                    : "none",
                  width: "120px",
                  height: "120px",
                  borderRadius: "15px",
                  objectFit: "cover",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  outline: "solid 2px white"
                }} />
            </span>
            <span className="justify-content-center align-items-center font-weight-bold small mt-2" style={{
              display: this.state.videoEnabled
                ? "flex"
                : "none",
            }}>
              {truncateString(truncateUsername(this.state.username), 16)}
            </span>
          </div>

          {this.state.channels.map((channel, index) => (
            <div key={channel} className="ml-3 justify-content-center align-items-center">
              <span className="d-flex justify-content-center align-items-center">
                <video
                  id={channel}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "15px",
                    objectFit: "cover",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    outline: "solid 2px white"
                  }} />
              </span>
              <span className="d-flex justify-content-center align-items-center font-weight-bold small mt-2">
                {truncateString(truncateUsername(channel), 16)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>)
  }
}

export default WebRTCVideoCallListener
