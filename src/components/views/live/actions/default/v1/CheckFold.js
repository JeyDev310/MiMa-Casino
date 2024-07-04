import React, { Component, useEffect, useState } from 'react'
import { ButtonGroup, Card, Col, Dropdown, Row } from 'react-bootstrap'

import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_FOLD,
} from '../../../core/GameActionTypes'

import {
  GAME_ROUND_TYPE_INIT,
} from '../../../core/GameRoundTypes'

import ResourceLoaderC from '../../../../utilities/loaders/ResourceLoaderC'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/chat.scss'

const CheckFoldDefaultToggle = React.forwardRef(({
  props,
  onClick,
  disabled,
}, ref) => {

  function renderProgress() {
    if (props.settings.optionA3) {
      return 'live-auto-action-progress'
    } else if (
      props.settings.optionA1 &&
      props.game.data.current_round_checkable === false
    ) {
      if (
        props.game.player.p_bigblind &&
        props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
        props.game.data.current_round_checkable === false &&
        Number(props.game.data.current_game_values.raise_ref) === 0
      ) {
        return null
      } else {
        return 'live-auto-action-progress'
      }
    } else {
      return null
    }
  }

  return (
    <div
      ref={ref}
      style={{ width: "inherit", }}>

      <RSButton
        size='large'
        value='Fold'
        background={`${props.settings.optionA3
          ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
          : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
        color={`${props.settings.optionA3
          ? '#FFFFFF'
          : '#FFFFFF'}`}
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
        className={`${disabled && 'opacity-75'} w-100 ${renderProgress()}`}
        style={{
          height: "72px",
          fontVariantNumeric: "lining-nums",
          border: "1px solid #84DAFF", 
          borderRadius: "12px",
          pointerEvents: disabled
            ? 'none'
            : 'initial',
        }} />

    </div>
  )
})

const CheckFoldDefaultMenu = React.forwardRef(({
  props,
  close,
  reset,
  className,
  'aria-labelledby': labeledBy,
}, ref) => {

  const [init, setInit] = useState(false)

  useEffect(() => {
    if (
      props.game.data &&
      props.game.player
    ) {
      setInit(true)
    } else {
      setInit(false)
    }
  }, [
    props.game.data,
    props.game.player,
  ])

  function onSubmitCheck() {
    try {
      if (
        props.game.data &&
        props.game.player
      ) {
        props.client.sendGameAction(
          props.game.data.room_name,
          props.game.data.current_round,
          GAME_ACTION_TYPE_CHECK,
          0,
        )
        reset()
        close()
      }
    } catch { }
  }

  function onSubmitFold() {
    try {
      if (
        props.game.data &&
        props.game.player
      ) {
        props.client.sendGameAction(
          props.game.data.room_name,
          props.game.data.current_round,
          GAME_ACTION_TYPE_FOLD,
          0,
        )
        reset()
        close()
      }
    } catch { }
  }

  return (<>
    <div
      ref={ref}
      className={className}
      aria-labelledby={labeledBy}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderRadius: "15px",
        borderWidth: "0px",
      }}>

      {init
        ? <Row noGutters className="h-100 py-2">

          <Col sm={12} md={12} lg={12} className="d-flex align-items-center px-3 py-2 mx-3">
            <div className="h3 mb-0 font-weight-bold">
              Fold
            </div>
          </Col>

          <Col sm={12} md={12} lg={12} className="d-flex align-items-center px-3 pt-2 mx-3 mb-2">
            <div className="h6 mb-0 font-weight-bold">
              Are you sure you want to fold?
            </div>
          </Col>

          <Col sm={12} md={12} lg={12} className="d-flex align-items-center px-3 pb-2 mx-3">
            <hr className="border-light m-0 my-1 w-100" style={{
              borderColor: "rgba(255, 255, 255, 0.12)",
            }} />
          </Col>

          <Col sm={12} md={12} lg={12} className="d-flex align-items-center px-3 py-1">

            <ButtonGroup size="md" className="w-100 mx-3">

              <RSButton
                size='medium'
                value='Check'
                background='linear-gradient(-180deg, #516173 3%, #3B4857 98%)'
                color='#FFFFFF'
                onClick={() => { onSubmitCheck() }}
                className='w-100'
                style={{
                  borderRadius: '5px 0px 0px 5px',
                }}
              />

              <RSButton
                size='medium'
                value='Fold'
                background='linear-gradient(-180deg, #516173 3%, #3B4857 98%)'
                color='#FFFFFF'
                onClick={() => { onSubmitFold() }}
                className='w-100'
                style={{
                  borderRadius: '0px 5px 5px 0px',
                }}
              />

            </ButtonGroup>

          </Col>
        </Row>
        : <Row noGutters className="h-100 px-4 py-3">
          <div>
            <p className="text-white text-large text-center font-weight-bold mb-0 display-1">
              Fold
            </p>
          </div>
          <hr className="border-light m-0 py-2" />
          <Card className="d-flex w-100 mb-2 bg-transparent border-0 shadow-none pt-2">
            <Row noGutters className="row-bordered h-100 border-0 shadow-none">
              <Col sm={12} md={12} lg={12}
                className="d-flex align-items-center border-0 shadow-none justify-content-center py-4">
                <ResourceLoaderC
                  height="4rem" width="4rem" />
              </Col>
            </Row>
          </Card>
          <RSButton
            size='medium'
            value='Continue'
            background='linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)'
            color='#FFFFFF'
            onClick={() => { close() }}
            className='w-100' />
        </Row>}
    </div>
  </>
  )
},
)

class CheckFoldDefault extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)

    this.state = {
      init: false,
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* CheckFold Default Action */}
        <Dropdown
          alignRight
          className="my-0"
          drop="up"
          show={this.state.init}
          onToggle={() => { this.onHandleToggle() }}
          style={{ width: "inherit", }}>

          <Dropdown.Toggle
            as={CheckFoldDefaultToggle}
            props={this.props}
            disabled={this.props.disabled} />

          <Dropdown.Menu
            alignRight
            as={CheckFoldDefaultMenu}
            className="mb-2"
            props={this.props}
            close={this.onHandleToggle}
            reset={this.props.reset} />

        </Dropdown>
        {/* / CheckFold Default Action */}
      </>
    )
  }
}

export default CheckFoldDefault