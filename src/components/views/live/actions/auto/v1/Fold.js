import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
// import { RSButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class FoldAuto extends Component {

  constructor(props) {
    super(props)

    this.onResetAll = this.onResetAll.bind(this)
    this.onGetButtonStyle = this.onGetButtonStyle.bind(this)

    this.state = {
      init: false,
      isRounded: false,
    }
  }

  componentDidMount() {
    try {
      if (
        this.props.game.player &&
        this.props.game.data.game_started
      ) {
        this.setState({
          isRounded: true,
        })
      }
    } catch { }
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
    this.props.change('optionA3', false)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Fold Auto Action */}
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
                border: `${this.props.settings.optionA3
                ? '1px solid #249F4A'
                : '1px solid #84DAFF'}`,                     
                height: "72px",
                pointerEvents: `${this.props.settings.optionA5 || this.props.disabled
                ? 'none'
                : 'initial'}`,
                opacity: `${this.props.settings.optionA5 || this.props.disabled
                  ? '0.6'
                  : '1.0'}`,
                color : `${this.props.settings.optionA3 ? '#484747':'#FFFFFF'}`                    
              }}
              onClick={() => !this.props.settings.optionA5 && this.props.change('optionA3', !this.props.settings.optionA3)}
              // disabled={!valid}
              >
              <span className="font-weight-bold" style={{textShadow: `${this.props.settings.optionA8 ? 'inset -1px 0px 3px rgba(0, 0, 0, 0.25)': 'none'}` }}>
                Fold
              </span>
            </Button>
          {/* <RSButton
            size={this.onGetButtonStyle()}
            value='Fold'
            iconName={`${(this.props.settings.optionA5 || this.props.disabled) ? 'FaTimesCircle' : ''}`}
            iconSize={18}            
            background={`${this.props.settings.optionA3
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA3 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => !this.props.settings.optionA5 && this.props.change('optionA3', !this.props.settings.optionA3)}
            className='w-100'
            style={{              
              height: "72px",                           
              border: this.props.settings.optionA3
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
        {/* / Fold Auto Action */}
      </>
    )
  }
}

export default FoldAuto