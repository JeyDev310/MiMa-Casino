import React, { Component } from 'react'
// import { RSButton } from 'reactsymbols-kit'
import { Button } from 'react-bootstrap'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class CheckAuto extends Component {

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
    this.props.change('optionA8', false)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Check Auto Action */}
        <div
          style={{ width: "inherit", }}>
          <Button              
              className="d-flex align-items-center justify-content-center w-100"                      
              style={{                                        
                background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",                
                borderRadius: "12px",
                fontSize: "22px",
                lineHeight: "28px",
                fontVariantNumeric: "lining-nums",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                border: `${this.props.settings.optionA8
                ? '1px solid #249F4A'
                : '1px solid #84DAFF'}`,                     
                height: "72px",
                pointerEvents: `${this.props.settings.optionA5 || this.props.disabled
                ? 'none'
                : 'initial'}`,
                opacity: `${this.props.settings.optionA5 || this.props.disabled
                  ? '0.6'
                  : '1.0'}`,
                color : `${this.props.settings.optionA8 ? '#484747':'#FFFFFF'}`,
                boxShadow: `${this.props.settings.optionA8 ? 'inset 0px 4px 17px rgba(0, 0, 0, 0.25)': 'none'}`                    
              }}
              onClick={() => !this.props.settings.optionA5 && this.props.change('optionA8', !this.props.settings.optionA8)}
              // disabled={!valid}
              >
              <span className="font-weight-bold" style={{textShadow: `${this.props.settings.optionA8 ? 'inset -1px 0px 3px rgba(0, 0, 0, 0.25)': 'none'}` }}>
                Check
              </span>
            </Button>
          {/* <RSButton
            size={this.onGetButtonStyle()}
            value='Check'
            iconName={`${(this.props.settings.optionA5 || this.props.disabled) ? 'FaTimesCircle' : ''}`}
            iconSize={18}
            background={`${this.props.settings.optionA8
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA8 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => !this.props.settings.optionA5 && this.props.change('optionA8', !this.props.settings.optionA8)}
            className='w-100'
            style={{
              height: "72px",
              border: this.props.settings.optionA8
                ? "1px solid #249F4A"
                : "1px solid #84DAFF",
              borderRadius: "12px",
              pointerEvents: this.props.settings.optionA5 || this.props.disabled
                ? "none"
                : "initial",
              opacity: this.props.settings.optionA5 || this.props.disabled
                ? "0.6"
                : "1.0",
            }} /> */}

        </div>
        {/* / Check Auto Action */}
      </>
    )
  }
}

export default CheckAuto