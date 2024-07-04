import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { RSSocialButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/live.scss'

class LiveChatButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionD4) {
      this.setState({
        init: this.props.settings.optionD4,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionD4 !== this.props.settings.optionD4) {
      this.setState({
        init: this.props.settings.optionD4,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionD4', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Chat Button */}

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
              Live Chat
            </Tooltip>
          }>

          <RSSocialButton
            rounded={8}
            background={`${this.state.init
              ? 'linear-gradient(-180deg, #F85359 3%, #DC151D 98%)'
              : 'linear-gradient(-180deg, rgb(38, 38, 38) 3%, rgb(0, 0, 0) 98%)'}`}
            color={`${this.state.init
              ? '#FFFFFF'
              : '#FFFFFF'}`}
            iconName={`${this.state.init
              ? 'FaComments'
              : 'FaCommentsO'}`}
            iconSize={20}
            onClick={() => { this.onHandleToggle() }}
            className='example-social-button'
          />

        </OverlayTrigger>

        {/* / Live Chat Button  */}
      </>
    )
  }
}

export default LiveChatButton