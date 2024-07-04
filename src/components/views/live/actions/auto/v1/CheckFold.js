import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class CheckFoldAuto extends Component {

  constructor(props) {
    super(props)

    this.onResetAll = this.onResetAll.bind(this)
    this.onGetButtonStyle = this.onGetButtonStyle.bind(this)

    this.state = {
      init: false,
    }
  }

  onGetButtonStyle() {
    if (this.props.settings) {
      if (this.props.settings.optionF4 === 0) {
        return String('large')
      } else if (this.props.settings.optionF4 === 1) {
        return String('medium')
      } else if (this.props.settings.optionF4 === 2) {
        return String('small')
      }
    }
  }

  onResetAll() {
    this.props.change('optionA1', false)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Check/Fold Auto Action */}
        <div
          style={{ width: "inherit", }}>

          <RSButton
            size={this.onGetButtonStyle()}
            value='Check/Fold'
            iconName={`${(this.props.settings.optionA5 || this.props.disabled) ? 'FaTimesCircle' : ''}`}
            iconSize={18}
            background={`${this.props.settings.optionA1
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
              color= {this.props.settings.optionA1 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => !this.props.settings.optionA5 && this.props.change('optionA1', !this.props.settings.optionA1)}
            className='w-100'
            style={{
              height: "72px",
              border: this.props.settings.optionA1
                ? "1px solid #249F4A"
                : "1px solid #84DAFF",
              borderRadius: "12px",
              pointerEvents: this.props.settings.optionA5 || this.props.disabled
                ? "none"
                : "initial",
              opacity: this.props.settings.optionA5 || this.props.disabled
                ? "0.6"
                : "1.0",
            }} />

        </div>
        {/* / Check/Fold Auto Action */}
      </>
    )
  }
}

export default CheckFoldAuto