import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_EXIT,
} from '../../../core/GameActionTypes'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class ExitDefault extends Component {

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onResetAll = this.onResetAll.bind(this)

    this.state = {
      init: false,
    }
  }

  onSubmit() {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      GAME_ACTION_TYPE_EXIT,
      0,
    )
    if (this.props.settings.optionA6) {
      this.props.reset()
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
        {/* Exit Default Action */}
        <div style={{ width: "inherit", }}>

          <RSButton
            size='large'
            value='Fold'
            background={`${this.props.settings.optionA3
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA3 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => { this.onSubmit() }}
            className='w-100'
            style={{
              height: "72px",
              fontVariantNumeric: "lining-nums",
              border: this.props.settings.optionA3
                ? "1px solid #249F4A"
                : "1px solid #84DAFF", 
              borderRadius: "12px",
              width: "inherit",
            }} />

        </div>
        {/* / Exit Default Action */}
      </>
    )
  }
}

export default ExitDefault