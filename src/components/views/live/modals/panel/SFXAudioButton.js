import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import {
  SFXUpIcon,
  SFXDownIcon,
} from '../../icons/SFX'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class SFXAudioButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionB4) {
      this.setState({
        init: this.props.settings.optionB4,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionB4 !== this.props.settings.optionB4) {
      this.setState({
        init: this.props.settings.optionB4,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionB4', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* SFX Audio Button */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
              {this.state.init ? 'Turn SFX On' : 'Turn SFX Off'}
            </Tooltip>
          }>

          <Button
            id="dropdown-menu-link-2"
            size="md"
            className="mr-1"
            variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
            onClick={() => { this.onHandleToggle() }}>

            {/* {this.state.init
              ? <div className="nav_content__s8">
                <span className="nav_content__s9">
                  <img
                    src={`${process.env.PUBLIC_URL}/svg/ui/1/media/musical-note-02.svg`}
                    alt="SFX"
                    style={{
                      width: "20px",
                      height: "20px",
                    }} />
                </span>
              </div>
              : <div className="nav_content__s8">
                <span className="nav_content__s9">
                  <img
                    src={`${process.env.PUBLIC_URL}/svg/ui/1/media/musical-note-01.svg`}
                    alt="SFX"
                    style={{
                      width: "20px",
                      height: "20px",
                    }} />
                </span>
              </div>} */}

            {this.state.init
              ? <SFXDownIcon />
              : <SFXUpIcon />}

          </Button>
        </OverlayTrigger>
        {/* / SFX Audio Button  */}
      </>
    )
  }
}

export default SFXAudioButton