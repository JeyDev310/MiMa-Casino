import React, { Component } from 'react'

import {
  DEFAULT_BET_VALUE_MINIMUM,
  DEFAULT_BET_VALUE_HALF_POT,
  DEFAULT_BET_VALUE_THIRD_POT,
  DEFAULT_BET_VALUE_POTSIZE,
} from '../../core/BetValueTypes'

import {
  GAME_ACTION_TYPE_BET,
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_BIG_BLIND_CHECK,
  GAME_ACTION_TYPE_RAISE,
  GAME_ACTION_TYPE_CALL,
  GAME_ACTION_TYPE_ALL_IN,
  GAME_ACTION_TYPE_FOLD,
} from '../../core/GameActionTypes'

import {
  GAME_ROUND_TYPE_INIT,
} from '../../core/GameRoundTypes'

class AutoActionsController extends Component {

  constructor(props) {
    super(props)

    this.autoTimeout = 0
    this.onSendMessage = this.onSendMessage.bind(this)

    this.onEvaluateAutoActions = this.onEvaluateAutoActions.bind(this)
    this.onEvaluateAutoBet = this.onEvaluateAutoBet.bind(this)
    this.onEvaluateAutoCheck = this.onEvaluateAutoCheck.bind(this)
    this.onEvaluateAutoCheckFold = this.onEvaluateAutoCheckFold.bind(this)
    this.onEvaluateAutoRaise = this.onEvaluateAutoRaise.bind(this)
    this.onEvaluateAutoCall = this.onEvaluateAutoCall.bind(this)
    this.onEvaluateAutoCallAny = this.onEvaluateAutoCallAny.bind(this)
    this.onEvaluateAutoAllIn = this.onEvaluateAutoAllIn.bind(this)
    this.onEvaluateAutoFold = this.onEvaluateAutoFold.bind(this)

    this.state = {
      init: false,
      current: false,
    }
  }

  componentDidMount() {
    if (this.props.currentPlayer) {
      this.setState({
        current: true,
      }, () => {
        var conditions = [
          this.props.settings.optionA1,
          this.props.settings.optionA2,
          this.props.settings.optionA3,
          this.props.settings.optionA4,
          this.props.settings.optionA7,
          this.props.settings.optionA8,
          this.props.settings.optionA9,
          this.props.settings.optionA10,
        ]
        if (conditions.includes(true)) {
          this.onEvaluateAutoActions()
        }
      })
    } else {
      this.setState({
        current: false,
      })
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.currentPlayer !== this.props.currentPlayer) {
      if (this.props.currentPlayer) {
        this.setState({
          current: true,
        }, () => {
          var conditions = [
            this.props.settings.optionA1,
            this.props.settings.optionA2,
            this.props.settings.optionA3,
            this.props.settings.optionA4,
            this.props.settings.optionA7,
            this.props.settings.optionA8,
            this.props.settings.optionA9,
            this.props.settings.optionA10,
          ]
          if (conditions.includes(true)) {
            this.onEvaluateAutoActions()
          }
        })
      } else {
        this.setState({
          current: false,
        })
      }
    }

    if (prevProps.game.data.current_round !== this.props.game.data.current_round) {
      if (this.props.settings.optionA6) {
        this.props.reset()
      }
    }

  }

  componentWillUnmount() {
    clearTimeout(this.autoTimeout)
  }

  onEvaluateAutoActions() {
    if (
      this.props.game.data &&
      this.props.game.player &&
      this.props.settings
    ) {
      if (this.props.settings.optionA5) {
        return
      } else if (this.props.settings.optionA1) {
        this.onEvaluateAutoCheckFold()
      } else if (this.props.settings.optionA2) {
        this.onEvaluateAutoAllIn()
      } else if (this.props.settings.optionA3) {
        this.onEvaluateAutoFold()
      } else if (this.props.settings.optionA4) {
        this.onEvaluateAutoCall()
      } else if (this.props.settings.optionA7) {
        this.onEvaluateAutoBet()
      } else if (this.props.settings.optionA8) {
        this.onEvaluateAutoCheck()
      } else if (this.props.settings.optionA9) {
        this.onEvaluateAutoRaise()
      } else if (this.props.settings.optionA10) {
        this.onEvaluateAutoCallAny()
      }
    }
  }

  onEvaluateAutoBet() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {
      if (
        this.props.game.data.current_round_checkable
      ) {
        var value = Number(parseFloat(this.props.game.data.current_game_values.table_big_blind).toFixed(2))
        if (
          this.props.options.bet.preValue
        ) {
          switch (this.props.options.bet.preValue) {
            case DEFAULT_BET_VALUE_MINIMUM:
              if (
                this.props.game.data.current_game_values.table_big_blind > 0 &&
                this.props.game.data.current_game_values.table_big_blind <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.table_big_blind).toFixed(2))
              }
              break
            case DEFAULT_BET_VALUE_HALF_POT:
              if (
                this.props.game.data.current_game_values.total_pot > 0 &&
                this.props.game.data.current_game_values.total_pot * 0.50 > 0 &&
                this.props.game.data.current_game_values.total_pot * 0.50 <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.total_pot * 0.50).toFixed(2))
              }
              break
            case DEFAULT_BET_VALUE_THIRD_POT:
              if (
                this.props.game.data.current_game_values.total_pot > 0 &&
                this.props.game.data.current_game_values.total_pot * 0.75 > 0 &&
                this.props.game.data.current_game_values.total_pot * 0.75 <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.total_pot * 0.75).toFixed(2))
              }
              break
            case DEFAULT_BET_VALUE_POTSIZE:
              if (
                this.props.game.data.current_game_values.total_pot > 0 &&
                this.props.game.data.current_game_values.total_pot <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.total_pot).toFixed(2))
              }
              break
            default:
              break
          }
        }
        if (
          value > 0 &&
          value <= this.props.game.player.p_balance_display
        ) {
          this.autoTimeout = setTimeout(() => {
            this.props.client.sendGameAction(
              this.props.game.data.room_name,
              this.props.game.data.current_round,
              GAME_ACTION_TYPE_BET,
              value,
            )
            if (this.props.settings.optionA6) {
              this.props.reset()
            }
          }, this.props.duration)
        }
      }
    }
  }

  onEvaluateAutoCheck() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {
      if (
        Number(this.props.game.data.current_game_values.raise_ref) === 0
      ) {
        if (
          this.props.game.player.p_bigblind &&
          this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
          this.props.game.data.current_round_checkable === false
        ) {
          this.autoTimeout = setTimeout(() => {
            this.onSendMessage(GAME_ACTION_TYPE_BIG_BLIND_CHECK)
            if (this.props.settings.optionA6) {
              this.props.reset()
            }
          }, this.props.duration)
        } else if (
          this.props.game.data.current_round_checkable
        ) {
          this.autoTimeout = setTimeout(() => {
            this.onSendMessage(GAME_ACTION_TYPE_CHECK)
            if (this.props.settings.optionA6) {
              this.props.reset()
            }
          }, this.props.duration)
        }
      }
    }
  }

  onEvaluateAutoCheckFold() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {

      if (
        this.props.game.player.p_bigblind &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
        this.props.game.data.current_round_checkable === false
      ) {

        if (
          Number(this.props.game.data.current_game_values.raise_level) > Number(this.props.game.data.current_game_values.table_big_blind)
        ) {

          this.autoTimeout = setTimeout(() => {
            this.onSendMessage(GAME_ACTION_TYPE_FOLD)
            if (this.props.settings.optionA6) {
              this.props.reset()
            }
          }, this.props.duration)

        } else {

          this.autoTimeout = setTimeout(() => {
            this.onSendMessage(GAME_ACTION_TYPE_BIG_BLIND_CHECK)
            if (this.props.settings.optionA6) {
              this.props.reset()
            }
          }, this.props.duration)

        }

      } else if (
        this.props.game.data.current_round_checkable
      ) {

        this.autoTimeout = setTimeout(() => {
          this.onSendMessage(GAME_ACTION_TYPE_CHECK)
          if (this.props.settings.optionA6) {
            this.props.reset()
          }
        }, this.props.duration)

      } else {

        this.autoTimeout = setTimeout(() => {
          this.onSendMessage(GAME_ACTION_TYPE_FOLD)
          if (this.props.settings.optionA6) {
            this.props.reset()
          }
        }, this.props.duration)

      }

    } else {

      this.autoTimeout = setTimeout(() => {
        this.onSendMessage(GAME_ACTION_TYPE_FOLD)
        if (this.props.settings.optionA6) {
          this.props.reset()
        }
      }, this.props.duration)

    }
  }

  onEvaluateAutoRaise() {
    if (
      this.props.game.data &&
      this.props.game.player &&
      this.props.game.data.current_round_checkable === false
    ) {
      var value = Number(0)
      if (
        Number(this.props.game.data.current_game_values.raise_ref) > 0
      ) {
        if (
          Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) > 0 &&
          Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) <= this.props.game.player.p_balance_display
        ) {
          value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2))
        }
      } else if (
        Number(this.props.game.data.current_game_values.raise_ref) === 0
      ) {
        if (
          Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) > 0 &&
          Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) <= this.props.game.player.p_balance_display
        ) {
          value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2))
        }
      }
      if (
        this.props.options.raise.preValue
      ) {
        switch (this.props.options.raise.preValue) {
          case DEFAULT_BET_VALUE_MINIMUM:
            if (
              Number(this.props.game.data.current_game_values.raise_ref) > 0
            ) {
              if (
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) > 0 &&
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2))
              }
            } else if (
              Number(this.props.game.data.current_game_values.raise_ref) === 0
            ) {
              if (
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) > 0 &&
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2))
              }
            }
            break
          case DEFAULT_BET_VALUE_HALF_POT:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.50 > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.50 <= this.props.game.player.p_balance_display
            ) {
              value = Number(parseFloat(this.props.game.data.current_game_values.total_pot * 0.50).toFixed(2))
            }
            break
          case DEFAULT_BET_VALUE_THIRD_POT:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.75 > 0 &&
              this.props.game.data.current_game_values.total_pot * 0.75 <= this.props.game.player.p_balance_display
            ) {
              value = Number(parseFloat(this.props.game.data.current_game_values.total_pot * 0.75).toFixed(2))
            }
            break
          case DEFAULT_BET_VALUE_POTSIZE:
            if (
              this.props.game.data.current_game_values.total_pot > 0 &&
              this.props.game.data.current_game_values.total_pot <= this.props.game.player.p_balance_display
            ) {
              value = Number(parseFloat(this.props.game.data.current_game_values.total_pot).toFixed(2))
            }
            break
          default:
            if (
              Number(this.props.game.data.current_game_values.raise_ref) > 0
            ) {
              if (
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) > 0 &&
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2)) <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 1.5).toFixed(2))
              }
            } else if (
              Number(this.props.game.data.current_game_values.raise_ref) === 0
            ) {
              if (
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) > 0 &&
                Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2)) <= this.props.game.player.p_balance_display
              ) {
                value = Number(parseFloat(this.props.game.data.current_game_values.raise_level * 2.0).toFixed(2))
              }
            }
            break
        }
      }
      if (
        value > 0 &&
        value <= this.props.game.player.p_balance_display
      ) {
        this.autoTimeout = setTimeout(() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_RAISE,
            value,
          )
          if (this.props.settings.optionA6) {
            this.props.reset()
          }
        }, this.props.duration)
      }
    }
  }

  onEvaluateAutoCall() {
    if (
      this.props.game.data &&
      this.props.game.player &&
      this.props.game.data.current_round_checkable === false
    ) {
      if (this.props.game.player) {
        var diffCallAmount = Number(Number(this.props.game.data.current_game_values.raise_level) - Number(this.props.game.player.p_bet_per_round))
        if (Number(this.props.game.player.p_balance_display) >= diffCallAmount) {
          if (
            this.props.game.player.p_bigblind &&
            this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
            this.props.game.data.current_round_checkable === false
          ) {
            if (
              Number(this.props.game.data.current_game_values.raise_ref) > 0
            ) {
              if (
                this.props.options.call.preValue === Number(parseFloat(this.props.game.data.current_game_values.raise_ref).toFixed(2))
              ) {
                this.autoTimeout = setTimeout(() => {
                  this.onSendMessage(GAME_ACTION_TYPE_CALL)
                  if (this.props.settings.optionA6) {
                    this.props.reset()
                  }
                }, this.props.duration)
              }
            }
          } else {
            if (
              this.props.options.call.preValue === Number(parseFloat(this.props.game.data.current_game_values.raise_ref).toFixed(2))
            ) {
              this.autoTimeout = setTimeout(() => {
                this.onSendMessage(GAME_ACTION_TYPE_CALL)
                if (this.props.settings.optionA6) {
                  this.props.reset()
                }
              }, this.props.duration)
            }
          }
        }
      }
    }
  }

  onEvaluateAutoCallAny() {
    if (
      this.props.game.data &&
      this.props.game.player &&
      this.props.game.data.current_round_checkable === false
    ) {
      if (
        this.props.game.player
      ) {
        var diffCallAmount = Number(Number(this.props.game.data.current_game_values.raise_level) - Number(this.props.game.player.p_bet_per_round))
        if (
          Number(this.props.game.player.p_balance_display) >= diffCallAmount
        ) {
          if (
            this.props.game.player.p_bigblind &&
            this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
            this.props.game.data.current_round_checkable === false
          ) {
            if (
              Number(this.props.game.data.current_game_values.raise_ref) > 0
            ) {
              this.autoTimeout = setTimeout(() => {
                this.onSendMessage(GAME_ACTION_TYPE_CALL)
                if (this.props.settings.optionA6) {
                  this.props.reset()
                }
              }, this.props.duration)
            }
          } else {
            this.autoTimeout = setTimeout(() => {
              this.onSendMessage(GAME_ACTION_TYPE_CALL)
              if (this.props.settings.optionA6) {
                this.props.reset()
              }
            }, this.props.duration)
          }
        }
      }
    }
  }

  onEvaluateAutoAllIn() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {
      this.autoTimeout = setTimeout(() => {
        this.onSendMessage(GAME_ACTION_TYPE_ALL_IN)
        if (this.props.settings.optionA6) {
          this.props.reset()
        }
      }, this.props.duration)
    }
  }

  onEvaluateAutoFold() {
    if (
      this.props.game.data &&
      this.props.game.player
    ) {
      this.autoTimeout = setTimeout(() => {
        this.onSendMessage(GAME_ACTION_TYPE_FOLD)
        if (this.props.settings.optionA6) {
          this.props.reset()
        }
      }, this.props.duration)
    }
  }

  onSendMessage(action) {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      0,
    )
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Auto Actions Controller */}
        {/* / Auto Actions Controller */}
      </>
    )
  }
}

export default AutoActionsController