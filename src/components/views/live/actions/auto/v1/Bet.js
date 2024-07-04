import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import {
  DEFAULT_BET_VALUE_MINIMUM,
  DEFAULT_BET_VALUE_HALF_POT,
  DEFAULT_BET_VALUE_THIRD_POT,
  DEFAULT_BET_VALUE_POTSIZE,
} from '../../../core/BetValueTypes'

import {
  formatPrice,
} from '../../../utilities/TextPreprocessing'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class BetAuto extends Component {

  constructor(props) {
    super(props)

    this.onResetAll = this.onResetAll.bind(this)
    this.onGetSelected = this.onGetSelected.bind(this)
    this.onGetButtonStyle = this.onGetButtonStyle.bind(this)
    this.onComputePredefinedBetValues = this.onComputePredefinedBetValues.bind(this)

    this.state = {
      init: false,
    }

    this.selectOptions = [
      { id: 0, value: DEFAULT_BET_VALUE_MINIMUM, label: 'Bet Minimum', isDisabled: true, },
      { id: 1, value: DEFAULT_BET_VALUE_HALF_POT, label: '1/2 Potsize', isDisabled: true, },
      { id: 2, value: DEFAULT_BET_VALUE_THIRD_POT, label: '3/4 Potsize', isDisabled: true, },
      { id: 3, value: DEFAULT_BET_VALUE_POTSIZE, label: 'Potsize', isDisabled: true, },
    ]
  }

  componentDidMount() {
    this.onComputePredefinedBetValues()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      this.onComputePredefinedBetValues()
    }
  }

  onComputePredefinedBetValues() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {
      this.selectOptions.forEach((element) => {
        switch (element.value) {
          case DEFAULT_BET_VALUE_MINIMUM:
            if (
              this.props.game.data.current_game_values.table_big_blind > 0 &&
              this.props.game.data.current_game_values.table_big_blind <= this.props.game.player.p_balance_display
            ) {
              element.label = formatPrice(Number(this.props.game.data.current_game_values.table_big_blind))
              element.isDisabled = false
            } else {
              element.label = String('Bet Minimum')
              element.isDisabled = true
            }
            break
          case DEFAULT_BET_VALUE_HALF_POT:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.50 > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.50 <= this.props.game.player.p_balance_display
            ) {
              element.label = formatPrice(Number(this.props.game.data.current_game_values.total_pot * 0.50))
              element.isDisabled = false
            } else {
              element.label = String('1/2 Potsize')
              element.isDisabled = true
            }
            break
          case DEFAULT_BET_VALUE_THIRD_POT:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.75 > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.75 <= this.props.game.player.p_balance_display
            ) {
              element.label = formatPrice(Number(this.props.game.data.current_game_values.total_pot * 0.75))
              element.isDisabled = false
            } else {
              element.label = String('3/4 Potsize')
              element.isDisabled = true
            }
            break
          case DEFAULT_BET_VALUE_POTSIZE:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot <= this.props.game.player.p_balance_display
            ) {
              element.label = formatPrice(Number(this.props.game.data.current_game_values.total_pot))
              element.isDisabled = false
            } else {
              element.label = String('Potsize')
              element.isDisabled = true
            }
            break
          default:
            break
        }
      })
    }
  }

  onGetSelected(item) {
    switch (item.value) {
      case DEFAULT_BET_VALUE_MINIMUM:
        if (this.props.options.bet.preValue === DEFAULT_BET_VALUE_MINIMUM) {
          return <i className="fas fa-check"></i>
        }
        return null
      case DEFAULT_BET_VALUE_HALF_POT:
        if (this.props.options.bet.preValue === DEFAULT_BET_VALUE_HALF_POT) {
          return <i className="fas fa-check"></i>
        }
        return null
      case DEFAULT_BET_VALUE_THIRD_POT:
        if (this.props.options.bet.preValue === DEFAULT_BET_VALUE_THIRD_POT) {
          return <i className="fas fa-check"></i>
        }
        return null
      case DEFAULT_BET_VALUE_POTSIZE:
        if (this.props.options.bet.preValue === DEFAULT_BET_VALUE_POTSIZE) {
          return <i className="fas fa-check"></i>
        }
        return null
      default:
        return null
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
    this.props.change('optionA7', false)
    this.props.changeOptions('bet', 'preValue', null)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Bet Auto Action */}
        <div
          style={{ width: "inherit", }}>

          <RSButton
            size={this.onGetButtonStyle()}
            value='Bet'
            iconName={`${(this.props.settings.optionA5 || this.props.disabled) ? 'FaTimesCircle' : ''}`}
            iconSize={18}
            background={`${this.props.settings.optionA7
              ? 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'
              : 'linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)'}`}
            color= {this.props.settings.optionA7 ? "#484747":"#FFFFFF"}
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => !this.props.settings.optionA5 && this.props.change('optionA7', !this.props.settings.optionA7)}
            className='w-100'
            style={{
              border: this.props.settings.optionA7
                ? "1px solid #249F4A"
                : "1px solid #84DAFF",
              borderRadius: "12px",
              pointerEvents: this.props.settings.optionA5 || this.props.disabled
                ? "none"
                : "initial",
              opacity: this.props.settings.optionA5 || this.props.disabled
                ? "0.6"
                : "1.0",
            }} />

        </div>
        {/* / Bet Auto Action */}
      </>
    )
  }
}

export default BetAuto