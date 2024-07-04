import React, { Component } from 'react'
import { Button, Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class LivePokerScreenshotButton extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)
    this.onHandleShowMenu = this.onHandleShowMenu.bind(this)
    this.onCaptureClientScreen = this.onCaptureClientScreen.bind(this)
    this.onCheckGetUserMediaApi = this.onCheckGetUserMediaApi.bind(this)

    this.state = {
      init: false,
      show: false,
      fetching: false,
    }
  }

  componentDidMount() {
    if (this.onCheckGetUserMediaApi()) {
      this.setState({
        init: true,
      })
    }
  }

  onCheckGetUserMediaApi() {
    try {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    } catch {
      return false
    }
  }

  onCaptureClientScreen() {

    try {
      if (this.state.init) {

        const videoElem = document.createElement('video')

        videoElem.id = 'video'
        videoElem.style.display = 'none'
        videoElem.autoplay = true

        const canvas = document.createElement('canvas')

        canvas.id = 'screenshot'
        canvas.style.display = 'none'

        canvas.width = Number(window.innerWidth / 2)
        canvas.height = Number(window.innerHeight / 2)

        document.getElementsByTagName('body')[0].appendChild(canvas)

        const context = canvas.getContext('2d')

        const displayMediaOptions = {
          video: {
            cursor: "always",
          },
          audio: false,
        };

        async function takeScreenshot() {
          try {
            videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
              displayMediaOptions
            )
          } catch { }
        }

        videoElem.addEventListener('playing', () => {
          setTimeout(() => {

            context.drawImage(videoElem, 0, 0, canvas.width, canvas.height)

            let tracks = videoElem.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            videoElem.srcObject = null
            videoElem.pause()

            this.props.capture(canvas.toDataURL())

          }, 500)
        })

        takeScreenshot()

      }
    } catch { }

  }

  onHandleToggle() {
    this.setState({
      show: false,
      fetching: true,
    }, () => {
      this.setState({
        fetching: false,
      }, () => {
        this.onCaptureClientScreen()
      })
    })
  }

  onHandleShowMenu() {
    this.setState({
      show: !this.state.show,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Poker Screenshot Button */}

        {this.state.init && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
                Screenshot
              </Tooltip>
            }>

            <Dropdown>
              <Dropdown.Toggle
                size="md"
                className="mr-1"
                variant="opaque1 icon-btn rounded-pill md-btn-flat hide-arrow"
                onToggle={this.onHandleShowMenu}>
                <i className="fas fa-camera"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={this.state.show}
                className="border-0 shadow-none p-0 mt-1"
                style={{
                  width: "320px",
                  borderRadius: "15px",
                }}>

                <div className="m-0 p-0 bg-transparent">

                  <div className="bg-dark text-center text-white font-weight-bold p-0 text-big mt-0" style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}>
                    <Card className="text-left p-0 border-0" style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      maxHeight: "100px",
                      objectFit: "cover",
                      backgroundSize: "100%",
                      backgroundPositionX: "right",
                      backgroundPositionY: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935534-0016.jpg)`,
                    }} >
                      <Card.Header className="border-0 p-4">
                        <span className="mb-0 h5">
                          Feedback
                        </span>
                      </Card.Header>
                    </Card>
                  </div>

                  <Dropdown.Header className="px-4 mt-2">Player Feedback</Dropdown.Header>

                  <div className="px-4 mb-4">
                    <h5 className="font-weight-bold">
                      Submit Your Screenshot
                    </h5>
                    <div className="small opacity-50 mb-4" style={{ maxWidth: '20rem', whiteSpace: 'break-spaces', }}>
                      If you're getting an error message or seeing an issue while using our software, get in touch with us. You can forward a screenshot to us via our software, mobile app, or website.
                    </div>
                    <Button
                      variant="instagram rounded-pill"
                      className="font-weight-bold"
                      onClick={this.onHandleToggle}>
                      Capture Now
                    </Button>
                  </div>

                </div>

              </Dropdown.Menu>
            </Dropdown>

          </OverlayTrigger>
        )}

        {/* / Live Poker Screenshot Button  */}
      </>
    )
  }
}

export default LivePokerScreenshotButton