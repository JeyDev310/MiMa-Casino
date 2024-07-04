import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

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
          <Button
            size="md"
            className="mr-1"
            variant="opaque1 icon-btn rounded-pill md-btn-flat hide-arrow"
            onClick={() => { this.onHandleToggle() }}>
            <i className={`${this.state.init
              ? 'fas fa-eye'
              : 'fas fa-eye-slash'}`}></i>
          </Button>
        </OverlayTrigger>
        {/* / Live Poker Solver Button  */}
      </>
    )
  }
}

export default LivePokerSolverButton