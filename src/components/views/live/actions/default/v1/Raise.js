import React, { Component, useCallback, useEffect, useState } from 'react'
import { Button, InputGroup, Form, Dropdown, Row, Col } from 'react-bootstrap'

// import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_RAISE,
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

const RaiseDefaultToggle = React.forwardRef(({
  onClick,
  props,
  min,
  disabled,
  reset,
}, ref) => {
  // const [label, setLabel] = useState('')
  // const [currentVal, setCurrentVal] = useState(0)
  // useEffect(() => {    
  //   if (props.options.raise.display) {
  //     if (!disabled && min) {
  //       setLabel(`Raise ${min}`)
  //       // setCurrentVal(min)        
  //     }
  //   } else {
  //     setLabel('Raise')
  //   }
  // }, [min, disabled, props.options.raise.display])
  
  // function renderProgress() {
  //   if (props.settings.optionA9 && !disabled) {
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
  //         if (
  //           Number(props.game.data.current_game_values.raise_ref) > 0 &&
  //           currentVal >= Number(props.game.data.current_game_values.raise_level) * 1.5
  //         ) {            
  //           var amount1 = parseFloat(currentVal).toFixed(2)
  //           this.props.client.sendGameAction(
  //             this.props.game.data.room_name,
  //             this.props.game.data.current_round,
  //             GAME_ACTION_TYPE_RAISE,
  //             Number(amount1),
  //           )
  //           reset()            
  //         } else if (
  //           Number(props.game.data.current_game_values.raise_ref) === 0 &&
  //           currentVal >= Number(props.game.data.current_game_values.raise_level) * 2
  //         ) {
  //           var amount2 = parseFloat(currentVal).toFixed(2)
  //           props.client.sendGameAction(
  //             props.game.data.room_name,
  //             props.game.data.current_round,
  //             GAME_ACTION_TYPE_RAISE,
  //             Number(amount2),
  //           )
  //           reset()            
  //         }
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
    //     background= 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
    //     color={`${props.settings.optionA9
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
    //       height: "72px",
    //       fontVariantNumeric: "lining-nums",          
    //       border: "1px solid #84DAFF",
    //       borderRadius: "12px",
    //       pointerEvents: disabled
    //         ? 'none'
    //         : 'initial',
    //     }} />

    // </div>
  )
})

const RaiseDefaultMenu = React.forwardRef(({
  props,
  // changeRaiseValue,
  close,
  reset,
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
          // changeRaiseValue(Number(value))
          if (props.game.player) {
            if (
              value >= 0 &&
              value <= props.game.player.p_balance_display &&
              value >= props.game.data.current_game_values.table_big_blind
            ) {
              if (
                Number(props.game.data.current_game_values.raise_ref) > 0 &&
                value >= Number(props.game.data.current_game_values.raise_level) * 1.5
              ) {
                setValid(true)
              } else if (
                Number(props.game.data.current_game_values.raise_ref) === 0 &&
                value >= Number(props.game.data.current_game_values.raise_level) * 2
              ) {
                setValid(true)
              }
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
    props.game.data.current_game_values.raise_ref,
    props.game.data.current_game_values.raise_level,
    props.game.data.current_game_values.table_big_blind,        
  ])

  useEffect(() => {
    if (
      props.game.data &&
      props.game.player
    ) {
      // setInit(true)
      if (props.settings.optionD2) {
        if (Number(props.game.data.current_game_values.raise_ref) > 0) {
          validate(Number(parseFloat(props.game.data.current_game_values.raise_level * 1.5).toFixed(2)))
        } else if (Number(props.game.data.current_game_values.raise_ref) === 0) {
          validate(Number(parseFloat(props.game.data.current_game_values.raise_level * 2.0).toFixed(2)))
        }
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

  function setValueByOption(option) {
    switch (option) {
      case 0:
        // if (Number(props.game.data.current_game_values.raise_ref) > 0) {
        //   validate(Number(parseFloat(props.game.data.current_game_values.raise_level * 1.5).toFixed(2)))
        // } else if (Number(props.game.data.current_game_values.raise_ref) === 0) {
        //   validate(Number(parseFloat(props.game.data.current_game_values.raise_level * 2.0).toFixed(2)))
        // }
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
          if (
            Number(props.game.data.current_game_values.raise_ref) > 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 1.5
          ) {
            var amount1 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_ALL_IN,
              Number(amount1),
            )
            reset()
            // close()
          } else if (
            Number(props.game.data.current_game_values.raise_ref) === 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 2
          ) {
            var amount2 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_ALL_IN,
              Number(amount2),
            )
            reset()
            // close()
          }
        }
      }
    } catch {
      setValue(0)
    }
  }

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
          if (
            Number(props.game.data.current_game_values.raise_ref) > 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 1.5
          ) {
            var amount1 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_RAISE,
              Number(amount1),
            )
            reset()
            // close()
          } else if (
            Number(props.game.data.current_game_values.raise_ref) === 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 2
          ) {
            var amount2 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_RAISE,
              Number(amount2),
            )
            reset()
            // close()
          }
        }
      }
    } catch {
      setValue(0)
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

          if (
            Number(props.game.data.current_game_values.raise_ref) > 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 1.5
          ) {
            var amount1 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_RAISE,
              Number(amount1),
            )
            reset()
            // close()
          } else if (
            Number(props.game.data.current_game_values.raise_ref) === 0 &&
            value >= Number(props.game.data.current_game_values.raise_level) * 2
          ) {
            var amount2 = parseFloat(value).toFixed(2)
            props.client.sendGameAction(
              props.game.data.room_name,
              props.game.data.current_round,
              GAME_ACTION_TYPE_RAISE,
              Number(amount2),
            )
            reset()
            // close()
          }

        }
      }
    } catch {
      setValue(0)
    }
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
                className="d-flex align-items-center justify-content-center w-100"                      
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
                  Raise {formatPrice(value)}
                </span>
              </Button>
            </Col>
          </Row>
          
        </div>
    </div>
      
  )
},
)

class RaiseDefault extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)
    this.getMinimumRaise = this.getMinimumRaise.bind(this)
    this.componentIsDisabled = this.componentIsDisabled.bind(this)
    // this.test = this.test.bind(this)

    this.state = {
      init: true,
      // raiseValue: '$0.00',
    }
  }

  componentDidMount() {
    this.getMinimumRaise()
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    })
  }

  getMinimumRaise() {
    try {
      if (
        Number(this.props.game.data.current_game_values.raise_ref) > 0 &&
        Number(this.props.game.data.current_game_values.raise_level * 1.5) <= this.props.game.player.p_balance_display
      ) {
        return `${formatPrice(Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)))}`
      } else if (
        Number(this.props.game.data.current_game_values.raise_ref) === 0 &&
        Number(this.props.game.data.current_game_values.raise_level * 2.0) <= this.props.game.player.p_balance_display
      ) {
        // this.setState({
        //   raiseValue: `${formatPrice(Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)))}`
        // })
        return `${formatPrice(Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)))}`
      }
      return null
    } catch {
      return null
    }
  }

  componentIsDisabled() {
    try {
      if (this.props.disabled) {
        return true
      }
      if (
        Number(this.props.game.data.current_game_values.raise_ref) > 0 &&
        Number(this.props.game.data.current_game_values.raise_level * 1.5) <= this.props.game.player.p_balance_display
      ) {
        return false
      } else if (
        Number(this.props.game.data.current_game_values.raise_ref) === 0 &&
        Number(this.props.game.data.current_game_values.raise_level * 2.0) <= this.props.game.player.p_balance_display
      ) {
        return false
      }
      return true
    } catch {
      return false
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  // test(val) {    
  //   this.setState({
  //     raiseValue: `${formatPrice(Number(parseFloat(val).toFixed(2)))}`
  //   })
  // }

  render() {
    return (
      <div className="position-relative">
        {/* Raise Default Action */}        
        <Dropdown
          alignRight
          drop="up"
          show={this.state.init}
          onToggle={() => { this.onHandleToggle() }}
          style={{ width: "inherit", }}
          >

          <Dropdown.Toggle
            as={RaiseDefaultToggle}
            props={this.props}
            min={this.getMinimumRaise()}
            // min={this.state.raiseValue}
            disabled={this.componentIsDisabled()}
            reset={this.props.reset} 
            />

          <Dropdown.Menu
            alignRight
            as={RaiseDefaultMenu}            
            props={this.props}
            // changeRaiseValue={(val) => this.test(val)}
            // close={this.onHandleToggle}
            reset={this.props.reset} />

        </Dropdown>
        
        {/* / Raise Default Action */}
      </div>
    )
  }
}

export default RaiseDefault