import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class LiveSettingsButtons extends Component {

  constructor(props) {
    super(props)

    this.state = {
      volumeOn: this.props.settings.optionB2,
      liveChatOn: this.props.settings.optionF7,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionB2) {
      this.setState({ volumeOn: this.props.settings.optionB2 })
    }
    if (this.props.settings.optionF7) {
      this.setState({ liveChatOn: this.props.settings.optionF7 })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionB2 !== this.props.settings.optionB2) {
      this.setState({ volumeOn: this.props.settings.optionB2 })
    }
    if (prevProps.settings.optionF7 !== this.props.settings.optionF7) {
      this.setState({ liveChatOn: this.props.settings.optionF7 })
    }
  }

  onHandleToggleAudioVolume() {
    this.setState({ volumeOn: !this.state.volumeOn }, () => {
      this.props.mute(this.state.volumeOn)
    })
  }

  onHandleToggleLiveChatNotifications() {
    this.setState({ liveChatOn: !this.state.liveChatOn }, () => {
      this.props.change('optionF7', this.state.liveChatOn)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Settings Buttons */}
        <span className="d-flex align-items-center justify-content-center">

          <OverlayTrigger
            // placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
                {this.state.volumeOn ? 'Turn Audio On' : 'Turn Audio Off'}
              </Tooltip>
            }>

            {this.state.volumeOn
              ? <div
                // className="nav_content__s1a d-flex align-items-center justify-content-center mr-2 mb-3 cursor-pointer nav_link__container "
                onClick={() => { this.onHandleToggleAudioVolume() }}>
                {/* <span className="d-flex align-items-center mx-3"> */}
                  <i className="fas fa-volume-mute text-body live_settings_btn__s2" />
                  {/* <span className="text-body font-weight-bold ml-2 small">
                    Audio {this.state.volumeOn ? 'Off' : 'On'}
                  </span> */}
                {/* </span> */}
              </div>
              : <div
                // className="nav_content__s1a d-flex align-items-center justify-content-center mr-2 mb-3 cursor-pointer nav_link__container "
                onClick={() => { this.onHandleToggleAudioVolume() }}>
                {/* <span className="d-flex align-items-center mx-3"> */}
                  <i className="fas fa-volume-up text-body live_settings_btn__s2" />
                  {/* <span className="text-body font-weight-bold ml-2 small">
                    Audio {this.state.volumeOn ? 'Off' : 'On'}
                  </span> */}
                {/* </span> */}
              </div>}

          </OverlayTrigger>

          {/* <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
                {this.state.liveChatOn ? 'Turn Live Chat Off' : 'Turn Live Chat On'}
              </Tooltip>
            }>

            {this.state.liveChatOn
              ? <div
                className="nav_content__s1 d-flex align-items-center justify-content-center mr-4 mb-3 cursor-pointer nav_link__container nav_link__item game_volume_btn"
                onClick={() => { this.onHandleToggleLiveChatNotifications() }}>
                <i className="ion ion-ios-notifications text-body live_settings_btn__s2" />
              </div>
              : <div
                className="nav_content__s1 d-flex align-items-center justify-content-center mr-4 mb-3 cursor-pointer nav_link__container nav_link__item game_volume_btn"
                onClick={() => { this.onHandleToggleLiveChatNotifications() }}>
                <i className="ion ion-ios-notifications-off text-body live_settings_btn__s2" />
              </div>}

          </OverlayTrigger> */}

        </span>
        {/* / Live Settings Buttons  */}
      </>
    )
  }
}

export default LiveSettingsButtons
