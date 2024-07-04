import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_BIG_BLIND_CHECK,
} from '../../../core/GameActionTypes'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class CheckBBDefault extends Component {

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onResetAll = this.onResetAll.bind(this)
    this.onRenderProgress = this.onRenderProgress.bind(this)

    this.state = {
      init: false,
    }
  }

  onRenderProgress() {
    if (
      this.props.settings.optionA1 ||
      this.props.settings.optionA8
    ) {
      return 'live-auto-action-progress'
    } else {
      return null
    }
  }

  onSubmit() {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      GAME_ACTION_TYPE_BIG_BLIND_CHECK,
      0,
    )
    if (this.props.settings.optionA6) {
      this.props.reset()
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
        {/* Check Big Blind Default Action */}
        <div style={{ width: "inherit", }}>

          <RSButton
            size='large'
            value='Check'
            background={`${this.props.settings.optionA8
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA8 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => { this.onSubmit() }}
            className={`w-100 ${this.onRenderProgress()} ${this.props.disabled && 'opacity-75'}`}
            style={{
              height: "72px",
              fontVariantNumeric: "lining-nums",
              border: this.props.settings.optionA8
                ? "1px solid #249F4A"
                : "1px solid #84DAFF",  
              borderRadius: "12px",
              width: "inherit",
              pointerEvents: this.props.disabled
                ? 'none'
                : 'initial',
            }} />

        </div>
        {/* / Check Big Blind Default Action */}
      </>
    )
  }
}

export default CheckBBDefault