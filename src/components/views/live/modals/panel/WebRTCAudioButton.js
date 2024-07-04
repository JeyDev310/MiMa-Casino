import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import {
  VolumeUpIcon,
  VolumeDownIcon,
} from '../../icons/Volume'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class WebRTCAudioButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionB2) {
      this.setState({
        init: this.props.settings.optionB2,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionB2 !== this.props.settings.optionB2) {
      this.setState({
        init: this.props.settings.optionB2,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionB2', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* WebRTC Audio Button */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
              {this.state.init ? 'Turn Stream Audio On' : 'Turn Stream Audio Off'}
            </Tooltip>
          }>

          <Button
            id="dropdown-menu-link-1"
            size="md"
            className="mr-1"
            variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
            onClick={() => { this.onHandleToggle() }}>

            {/* {this.state.init
              ? <div className="nav_content__s8">
                <span className="nav_content__s9">
                  <img src={`${process.env.PUBLIC_URL}/svg/ui/1/media/volume-mute.svg`} alt="Volume" />
                </span>
              </div>
              : <div className="nav_content__s8">
                <span className="nav_content__s9">
                  <img src={`${process.env.PUBLIC_URL}/svg/ui/1/media/volume-01.svg`} alt="Volume" />
                </span>
              </div>} */}

            {this.state.init
              ? <VolumeDownIcon />
              : <VolumeUpIcon />}

          </Button>
        </OverlayTrigger>
        {/* / WebRTC Audio Button  */}
      </>
    )
  }
}

export default WebRTCAudioButton