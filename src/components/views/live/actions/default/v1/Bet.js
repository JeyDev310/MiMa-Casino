import React, { Component, useCallback, useEffect, useState } from 'react'
import { Button, InputGroup, Form, Dropdown, Row, Col } from 'react-bootstrap'

// import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_BET,
} from '../../../core/GameActionTypes'

import {
  GAME_ACTION_TYPE_ALL_IN,
} from '../../../core/GameActionTypes'

import {
  formatPrice,
} from '../../../utilities/TextPreprocessing'

// import ResourceLoaderC from '../../../../utilities/loaders/ResourceLoaderC'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/chat.scss'

const BetDefaultToggle = React.forwardRef(({
  onClick,
  props,
  min,
  disabled,
  reset,
}, ref) => {
  // const [label, setLabel] = useState('')
  // const [currentVal, setCurrentVal] = useState(0)

  // useEffect(() => {
  //   if (props.options.bet.display) {
  //     if (!disabled && min) {
  //       setLabel(`Bet ${min}`)
  //       // setCurrentVal(min)        
  //     }
  //   } else {
  //     setLabel('Bet')
  //   }
    
  // }, [min, disabled, props.options.bet.display])
  // function renderProgress() {
  //   if (props.settings.optionA7) {
  //     return 'live-auto-action-progress'
  //   } else {
  //     return null
  //   }
  // }

  // function onSubmit() {
  //   try {
  //     if (
  //       props.game.data &&
  //       props.game.player
  //     ) {
  //       if (
  //         currentVal >= 0 &&
  //         currentVal <= props.game.player.p_balance_display &&
  //         currentVal >= props.game.data.current_game_values.table_big_blind
  //       ) {
  //         var amount = parseFloat(currentVal).toFixed(2)
  //         props.client.sendGameAction(
  //           props.game.data.room_name,
  //           props.game.data.current_round,
  //           GAME_ACTION_TYPE_BET,
  //           Number(amount),
  //         )
  //         reset()         
  //       }
  //     }
  //   } catch {
  //     setLabel('')
  //   }
  // }

  return ( <div style={{height:"72px"}}></div>
    // <div
    //   ref={ref}
    //   style={{ width: "inherit", }}>

    //   <RSButton
    //     size='large'
    //     value={label}
    //     background={`${props.settings.optionA7
    //       ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
    //       : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
    //     color={`${props.settings.optionA7
    //       ? '#FFFFFF'
    //       : '#FFFFFF'}`}
    //     onContextMenu={(e) => e.preventDefault()}
    //     onClick={(e) => {
    //       e.preventDefault()
    //       // onSubmit()
    //     }}
    //     className={`${disabled && 'opacity-75'} w-100 ${renderProgress()}`}
    //     style={{
    //       opacity:"0",
    //       fontVariantNumeric: "lining-nums",
    //       height: "72px",
    //       border: "1px solid #84DAFF",
    //       borderRadius: "12px",
    //       pointerEvents: disabled
    //         ? 'none'
    //         : 'initial',
    //     }} />

    // </div>
  )
})

const BetDefaultMenu = React.forwardRef(({
  props,
  close,
  reset,
  changeBetValue,
  className,
  'aria-labelledby': labeledBy,
}, ref) => {

  // const [init, setInit] = useState(false)
  const [valid, setValid] = useState(false)
  const [value, setValue] = useState('')

  const validate = useCallback((value) => {
    if (value !== '' || value !== undefined) {
      try {
        const re = /^\d{1,6}(\.\d{0,2})?$/
        if (value === '' || re.test(value)) {
          setValue(value)
          // changeBetValue(Number(value))
          if (props.game.player) {
            if (
              value >= 0 &&
              value <= props.game.player.p_balance_display &&
              value >= props.game.data.current_game_values.table_big_blind
            ) {
              setValid(true)
            } else {
              if (value >= 0) {
                setValid(false)
              } else {
                setValid(false)
              }
            }
          } else {
            setValid(false)
          }
        }
      } catch {
        setValid(false)
      }
    }
  }, [
    props.game.player,
    props.game.data.current_game_values.table_big_blind,    
  ])

  useEffect(() => {
    if (
      props.game.data &&
      props.game.player
    ) {
      // setInit(true)
      if (props.settings.optionD2) {
        validate(Number(parseFloat(props.game.data.current_game_values.table_big_blind).toFixed(2)))
      }
    } else {
      // setInit(false)
    }
  }, [
    props.game.data,
    props.game.player,
    props.settings.optionD2,
    validate,
  ])

  function onAllinSubmit() {
    try {
      if (
        props.game.data &&
        props.game.player
      ) {
        if (
          value >= 0 &&
          value <= props.game.player.p_balance_display &&
          value >= props.game.data.current_game_values.table_big_blind
        ) {
          var amount = parseFloat(value).toFixed(2)
          props.client.sendGameAction(
            props.game.data.room_name,
            props.game.data.current_round,
            GAME_ACTION_TYPE_ALL_IN,
            Number(amount),
          )
          reset()
          // close()
        }
      }
    } catch {
      setValue('')
    }
  }

  function setValueByOption(option) {
    switch (option) {
      case 0:
        validate(Number(props.game.data.current_game_values.total_pot * 0.30).toFixed(2))
        break
      case 1:
        validate(Number(props.game.data.current_game_values.total_pot * 0.50).toFixed(2))
        break
      case 2:
        validate(Number(props.game.data.current_game_values.total_pot * 0.75).toFixed(2))
        break
      case 3:
        validate(Number(props.game.data.current_game_values.total_pot).toFixed(2))
        break
      case 4:
        validate(Number(parseFloat(props.game.player.p_balance_display).toFixed(2)))
        break
      default:
        validate(Number(props.game.data.current_game_values.table_big_blind).toFixed(2))
    }
  }

  // function setValueByBB(option) {
  //   if (props.game.data) {
  //     switch (option) {
  //       case 0:
  //         var amount1 = parseFloat(value)
  //         var bb1 = parseFloat(props.game.data.current_game_values.table_big_blind)
  //         validate(Number(amount1 - bb1).toFixed(2))
  //         break
  //       case 1:
  //         var amount2 = parseFloat(value)
  //         var bb2 = parseFloat(props.game.data.current_game_values.table_big_blind)
  //         validate(Number(amount2 + bb2).toFixed(2))
  //         break
  //       default:
  //         validate(0)
  //     }
  //   }
  // }

  // function calculateRemainingBalance() {
  //   try {
  //     return props.game.player.p_balance_display - value
  //   } catch {
  //     return 0
  //   }
  // }

  function onSubmit() {
    try {
      if (
        props.game.data &&
        props.game.player
      ) {
        if (
          value >= 0 &&
          value <= props.game.player.p_balance_display &&
          value >= props.game.data.current_game_values.table_big_blind
        ) {
          var amount = parseFloat(value).toFixed(2)
          props.client.sendGameAction(
            props.game.data.room_name,
            props.game.data.current_round,
            GAME_ACTION_TYPE_BET,
            Number(amount),
          )
          reset()
          // close()
        }
      }
    } catch {
      setValue('')
    }
  }

  function onSubmitKeypress(e) {
    try {
      if (
        e.key === 'Enter' &&
        props.game.data &&
        props.game.player
      ) {
        if (
          value >= 0 &&
          value <= props.game.player.p_balance_display &&
          value >= props.game.data.current_game_values.table_big_blind
        ) {
          var amount = parseFloat(value).toFixed(2)
          props.client.sendGameAction(
            props.game.data.room_name,
            props.game.data.current_round,
            GAME_ACTION_TYPE_BET,
            Number(amount),
          )
          reset()
          // close()
        }
      }
    } catch { }
  }

  return (
    <div       
      style={{
        width: "460px",    
        background: "none",         
        border: "none",
        position: "absolute",
        right: "0",
        bottom: "0"                 
      }}>
        <div className="d-flex flex-column justify-content-end">
          <div className="d-flex justify-content-between"
          style={{
            background: "linear-gradient(347.47deg, #1B5160 -16.37%, #4FC7EC 86.21%)",
            borderRadius: "10px",
            border: "1px solid #84DAFF",
            padding: "6px 10px",
            marginBottom: "15px",
            marginRight: "10px"                         
          }}>
            <Button className="d-flex align-items-center"
              onClick={() => { setValueByOption(0) }}
              style={{
                background: "linear-gradient(180deg, #005676 0%, #000000 100%)",
                borderRadius: "4px",
                border: "0.4px solid #84DAFF",
                margin: "2px",
                padding: "8px",
                height: "34px",
                fontVariantNumeric: "lining-nums",
              }} >30%</Button>
            <Button className="d-flex align-items-center"
              onClick={() => { setValueByOption(1) }}
              style={{
                background: "linear-gradient(180deg, #005676 0%, #000000 100%)",
                borderRadius: "4px",
                border: "0.4px solid #84DAFF",
                margin: "2px",
                padding: "8px",
                height: "34px",
                fontVariantNumeric: "lining-nums",
              }} >50%</Button>
            <Button className="d-flex align-items-center"
              onClick={() => { setValueByOption(2) }}
              style={{
                background: "linear-gradient(180deg, #005676 0%, #000000 100%)",
                borderRadius: "4px",
                border: "0.4px solid #84DAFF",
                margin: "2px",
                padding: "8px",
                height: "34px",
                fontVariantNumeric: "lining-nums",
              }} >70%</Button>
            <Button className="d-flex align-items-center"
              onClick={() => { setValueByOption(3) }}
              style={{
                background: "linear-gradient(180deg, #005676 0%, #000000 100%)",
                borderRadius: "4px",
                border: "0.4px solid #84DAFF",
                margin: "2px",
                padding: "8px",
                height: "34px",
                fontVariantNumeric: "lining-nums",
              }} >Pot</Button>
              
              <Button className="d-flex align-items-center"
                onClick={() => { onAllinSubmit() }}
                style={{
                  background: "linear-gradient(180deg, #80B4C7 0%, #FFFFFF 100%)",
                  color: "#000000",
                  borderRadius: "4px",
                  border: "0.4px solid #000000",
                  margin: "2px",
                  padding: "8px",
                  height: "34px",
                  fontVariantNumeric: "lining-nums",
                }} >All In</Button>

            <InputGroup className="mx-1 d-flex" style={{width: "150px"}}>
              <InputGroup.Prepend className="d-flex">
              <InputGroup.Text className="font-weight-bold bg-black">
                $
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                autoFocus
                className="form-control font-weight-bold bg-black"
                placeholder=""
                maxLength="8"
                onKeyPress={(e) => onSubmitKeypress(e)}
                onChange={(e) => validate(e.target.value)}
                value={value}
                style={{fontVariantNumeric: "lining-nums"}}                     
              />
            </InputGroup>
          </div>
          <Row className="p-0 m-0">
            <Col className="p-2"></Col>
            <Col className="p-2"></Col>
            <Col className="p-0">
              <Button              
                className="d-flex align-items-center justify-content-center w-100 opacity-0"                      
                style={{                                         
                  background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",
                  color : "#FFFFFF",
                  borderRadius: "12px",
                  fontSize: "22px",
                  lineHeight: "28px",
                  fontVariantNumeric: "lining-nums",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  border: "1px solid #84DAFF",                     
                  height: "72px"                    
                }}
                onClick={() => { onSubmit() }}
                disabled={!valid}
                >
                <span className="font-weight-bold">
                  Bet {formatPrice(value)}
                </span>
              </Button>
            </Col>
          </Row>
        </div>
    </div>
    
  )
},
)

class BetDefault extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)
    this.getMinimumBet = this.getMinimumBet.bind(this)
    this.componentIsDisabled = this.componentIsDisabled.bind(this)
    // this.test = this.test.bind(this)

    this.state = {
      init: true,
      // betValue: '$0.00',
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    })
  }

  getMinimumBet() {
    if (
      Number(this.props.game.data.current_game_values.table_big_blind) > 0
    ) {
      // this.setState({
      //   betValue: `${formatPrice(Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)))}`
      // })
      return `${formatPrice(Number(parseFloat(this.props.game.data.current_game_values.table_big_blind).toFixed(2)))}`
    }
    return null
  }

  componentIsDisabled() {
    try {
      if (this.props.disabled) {
        return true
      }
      if (
        Number(this.props.game.data.current_game_values.table_big_blind) > 0 &&
        Number(this.props.game.data.current_game_values.table_big_blind) <= this.props.game.player.p_balance_display
      ) {
        return false
      }
      return true
    } catch {
      return false
    }
  }

  // test(val) {    
  //   this.setState({
  //     betValue: `${formatPrice(Number(parseFloat(val).toFixed(2)))}`
  //   })
  // }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="position-relative">
        {/* Bet Default Action */}
        <Dropdown
          alignRight
          drop="up"
          show={this.state.init}
          onToggle={() => { this.onHandleToggle() }}
          style={{ width: "inherit", }}
          >

          <Dropdown.Toggle
            as={BetDefaultToggle}
            props={this.props}
            min={this.getMinimumBet()}
            // min={this.state.betValue}
            disabled={this.componentIsDisabled()}
            reset={this.props.reset} />

          <Dropdown.Menu
            as={BetDefaultMenu}
            // changeBetValue={(val) => this.test(val)}
            props={this.props}
            // close={this.onHandleToggle}
            reset={this.props.reset} />

        </Dropdown>
        {/* / Bet Default Action */}
      </div>
    )
  }
}

export default BetDefault