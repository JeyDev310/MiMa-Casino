import React, { Component } from 'react'

import CardsPanel from './CardsPanel'
import DealerPanel from './DealerPanel'
import GameActions from './GameActions'
import GameStateMinimal from './GameStateMinimal'
import PlayerState from './PlayerState'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/live.scss'
import '../../../../vendor/styles/pages/navigation.scss'
import '../../../../vendor/styles/layouts/1/layout.scss'

class ActionPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      dragElementWidth: 0,
      dragElementHeight: 0,
    }
  }

  getDragElementSize() {
    switch (this.props.settings.optionF5) {
      case 0:
        return `scale(0.65)`
      case 1:
        return `scale(0.75)`
      case 2:
        return `scale(0.85)`
      case 3:
        return `scale(1.00)`
      default:
        return `scale(0.85)`
    }
  }

  getDragElementWidth() {
    switch (this.props.settings.optionF6) {
      case 0:
        return `550px`
      case 1:
        return `600px`
      case 2:
        return `650px`
      case 3:
        return `700px`
      default:
        return `600px`
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Action Panel */}
        <div className="flex-grow-1 position-relative action-panel-layout-s1 d-none live-d-lg-initial">
          <div
            className={`chat-messages chat-scroll p-2 overflow-visible align-items-center ${this.props.settings.optionF8
              ? 'action-panel-parent-s1'
              : 'action-panel-parent-s2'}`}
            style={{ justifyContent: "flex-end", }}>
            <span
              className="list-group-item list-group-item-action online bg-transparent action-panel-parent-element action-panel-parent-s4"
              style={{
                padding: "0px",
                borderWidth: "0px",
                alignItems: "center",
                transform: this.getDragElementSize(),
              }}>

              <>
                {/* Cards Panel */}
                <CardsPanel
                  {...this.props}
                  {...this.state}
                  exit={this.props.exit}
                />
                {/* / Cards Panel */}

                {/* Player State */}
                <PlayerState
                  {...this.props}
                  {...this.state}
                  openFill={this.props.openFill}
                  openSlide={this.props.openSlide}
                />
                {/* / Player State */}

                {/* Game Actions Panel */}
                <GameActions
                  {...this.props}
                  {...this.state}
                  size="lg"
                  color="dark"
                  rounded={false}
                  change={this.props.change}
                  resetAuto={this.props.resetAuto}
                />
                {/* / Game Actions Panel */}

                {/* Game State Minimal */}
                <GameStateMinimal
                  {...this.props}
                  {...this.state}
                />
                {/* / Game State Minimal */}
              </>

              {/* Dealer Panel */}
              <DealerPanel
                {...this.props}
                {...this.state}
                openDealer={this.props.openDealer}
              />
              {/* / Dealer Panel */}

            </span>
          </div>
        </div>
        {/* / Action Panel */}

        {/* Action Panel Indicator */}
        {!this.props.settings.optionF8 && (
          <div
            className="position-absolute d-none live-d-lg-initial"
            onClick={(e) => { this.props.change('optionF8', !this.props.settings.optionF8) }}>
            <nav className="footer bg-transparent" style={{
              position: "fixed",
              left: "50%",
              bottom: "0px",
              transform: "translate(-50%, -20%)",
              margin: "0 0 0 0px !important",
              padding: "0 0 0 0px !important",
            }}>
              <div className="container text-center action-panel-parent-s3 cursor-pointer">
                <div className="pt-1">
                  <span className="footer-text text-body font-weight-bold opacity-100">
                    <span
                      className={`game__action cursor-pointer nav_link__container nav_link__item nav_link__item__active`}
                      onClick={(e) => this.props.change('optionF8', !this.props.settings.optionF8)}>
                      <svg className={`icon icon-wand icon__success`}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        )}
        {/* / Action Panel Indicator */}
      </>
    )
  }
}

export default ActionPanel