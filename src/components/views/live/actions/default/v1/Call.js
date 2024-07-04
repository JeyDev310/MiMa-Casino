import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ACTION_TYPE_CALL,
} from '../../../core/GameActionTypes'

import {
  formatPrice,
} from '../../../utilities/TextPreprocessing'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class CallDefault extends Component {

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onResetAll = this.onResetAll.bind(this)
    this.onRenderLabel = this.onRenderLabel.bind(this)
    this.onRenderProgress = this.onRenderProgress.bind(this)

    this.state = {
      init: false,
      callAmount: Number(0),
      callDisabled: true,
    }
  }

  componentDidMount() {
    try {
      if (
        this.props.game.data.current_game_values.raise_level > 0
      ) {
        if (
          this.props.game.player
        ) {
          var diffCallAmount = Number(Number(this.props.game.data.current_game_values.raise_level) - Number(this.props.game.player.p_bet_per_round))
          if (
            Number(this.props.game.player.p_balance_display) >= diffCallAmount
          ) {
            this.setState({
              callAmount: Number(this.props.game.data.current_game_values.raise_level),
              callDisabled: false,
            })
          }
        }
      }
      if (this.props.disabled) {
        this.setState({
          callDisabled: true,
        })
      }
    } catch { }
  }

  onRenderLabel() {
    if (!this.state.callDisabled) {
      if (this.state.callAmount > 0) {
        return `Call ${formatPrice(this.state.callAmount)}`
      }
    }
    return 'Call'
  }

  onRenderProgress() {
    if (this.props.settings.optionA4) {
      if (!this.state.callDisabled) {
        return 'live-auto-action-progress'
      } else {
        return null
      }
    } else if (this.props.settings.optionA10) {
      if (!this.state.callDisabled) {
        return 'live-auto-action-progress'
      } else {
        return null
      }
    }
  }

  onSubmit() {
    if (!this.state.callDisabled) {
      this.props.client.sendGameAction(
        this.props.game.data.room_name,
        this.props.game.data.current_round,
        GAME_ACTION_TYPE_CALL,
        0,
      )
      if (this.props.settings.optionA6) {
        this.props.reset()
      }
    }
  }

  onResetAll() {
    this.props.change('optionA4', false)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Call Default Action */}
        <div style={{ width: "inherit", }}>

          <RSButton
            size='large'
            value={this.onRenderLabel()}
            background={`${this.props.settings.optionA4 || this.props.settings.optionA10
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA4 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => { this.onSubmit() }}
            className={`${this.state.callDisabled && 'opacity-75'} w-100 ${this.onRenderProgress()}`}
            style={{
              height: "72px",
              fontVariantNumeric: "lining-nums",
              border: this.props.settings.optionA4
                ? "1px solid #249F4A"
                : "1px solid #84DAFF", 
              borderRadius: "12px",
              width: "inherit",
              pointerEvents: this.state.callDisabled
                ? 'none'
                : 'initial',
            }} />

        </div>
        {/* / Call Default Action */}
      </>
    )
  }
}

export default CallDefault