import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_NO_ACTION,
} from '../../../core/GameActionTypes'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class NoActionDefault extends Component {

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      init: false,
    }
  }

  onSubmit() {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      GAME_ACTION_TYPE_NO_ACTION,
      0,
    )
    if (this.props.settings.optionA6) {
      this.props.reset()
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* NoAction Default Action */}
        <div style={{ width: "inherit", }}>

          <RSButton
            size='large'
            value='No Action'
            background='linear-gradient(-1deg, rgb(0, 0, 0) 2%, rgb(41, 41, 41) 98%)'
            color="#FFFFFF"
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => { this.onSubmit() }}
            className='w-100'
            style={{
              borderRadius: "0px",
              fontVariantNumeric: "lining-nums",
              width: "inherit",
            }} />

        </div>
        {/* / NoAction Default Action */}
      </>
    )
  }
}

export default NoActionDefault