import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { RSSocialButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/live.scss'

class LivePokerSolverButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionD3) {
      this.setState({
        init: this.props.settings.optionD3,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionD3 !== this.props.settings.optionD3) {
      this.setState({
        init: this.props.settings.optionD3,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionD3', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Poker Solver Button */}

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
              Live Poker Hints
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
              ? 'MdVisibility'
              : 'MdVisibilityOff'}`}
            iconSize={20}
            onClick={() => { this.onHandleToggle() }}
            className='example-social-button'
          />

        </OverlayTrigger>

        {/* / Live Poker Solver Button  */}
      </>
    )
  }
}

export default LivePokerSolverButton