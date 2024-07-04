import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { RSSocialButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/live.scss'

class StreamPlayerButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionE1) {
      this.setState({
        init: this.props.settings.optionE1,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionE1 !== this.props.settings.optionE1) {
      this.setState({
        init: this.props.settings.optionE1,
      })
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    }, () => {
      this.props.change('optionE1', this.state.init)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Stream Player Button */}

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 ? 'd-none' : null} tooltip-dark font-weight-bold`}>
              {this.state.init ? 'Turn Video Off' : 'Turn Video On'}
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
              ? 'MdVideocam'
              : 'MdVideocamOff'}`}
            iconSize={22}
            onClick={() => { this.onHandleToggle() }}
            className='example-social-button'
          />

        </OverlayTrigger>

        {/* / Stream Player Button  */}
      </>
    )
  }
}

export default StreamPlayerButton