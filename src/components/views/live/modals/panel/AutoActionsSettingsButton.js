import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { RSSocialButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/live.scss'

class AutoActionsSettingsButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionD1) {
      this.setState({
        init: this.props.settings.optionD1,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionD1 !== this.props.settings.optionD1) {
      this.setState({
        init: this.props.settings.optionD1,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionD1', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Auto Actions Settings Button */}

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
              Auto Actions
            </Tooltip>
          }>

          <RSSocialButton
            rounded={8}
            iconName={`${this.state.init
              ? 'FaToggleOn'
              : 'FaToggleOn'}`}
            iconSize={20}
            disabled={!this.props.settings.optionF2}
            onClick={() => { this.onHandleToggle() }}
            className='example-social-button opacity-25'
            style={{
              filter: 'invert(1)',
            }}
          />

        </OverlayTrigger>

        {/* / Auto Actions Settings Button  */}
      </>
    )
  }
}

export default AutoActionsSettingsButton