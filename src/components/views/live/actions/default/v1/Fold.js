import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'
// import { Button } from 'react-bootstrap'

import {
  GAME_ACTION_TYPE_FOLD,
} from '../../../core/GameActionTypes'

import {
  GAME_ROUND_TYPE_INIT,
} from '../../../core/GameRoundTypes'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class FoldDefault extends Component {

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
    if (this.props.settings.optionA3) {
      return 'live-auto-action-progress'
    } else if (
      this.props.settings.optionA1 &&
      this.props.game.data.current_round_checkable === false
    ) {
      if (
        this.props.game.player.p_bigblind &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
        this.props.game.data.current_round_checkable === false &&
        Number(this.props.game.data.current_game_values.raise_ref) === 0
      ) {
        return null
      } else {
        return 'live-auto-action-progress'
      }
    } else {
      return null
    }
  }

  onSubmit() {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      GAME_ACTION_TYPE_FOLD,
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
        {/* Fold Default Action */}
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
            className={`w-100 ${this.onRenderProgress()} ${this.props.disabled && 'opacity-75'}`}
            style={{
              height: "72px",              
              fontVariantNumeric: "lining-nums",
              border: this.props.settings.optionA3
                ? "1px solid #249F4A"
                : "1px solid #84DAFF",  
              borderRadius: "12px",              
              width: "inherit",
              pointerEvents: this.props.disabled
                ? 'none'
                : 'initial',
            }} />
            {/* <Button              
                className={`w-100 ${this.onRenderProgress()} ${this.props.disabled && 'opacity-75'}`}                      
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
                  border: "1px solid #84DAFF",                     
                  height: "72px"                    
                }}
                onContextMenu={(e) => e.preventDefault()}
                onClick={() => { this.onSubmit() }}
                >
                <span className="font-weight-bold">
                  Fold
                </span>
              </Button> */}

        </div>
        {/* / Fold Default Action */}
      </>
    )
  }
}

export default FoldDefault