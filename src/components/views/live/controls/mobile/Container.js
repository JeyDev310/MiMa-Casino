import React, { Component } from 'react'
import { Draggable } from 'drag-react'

import PerfectScrollbar from 'react-perfect-scrollbar'

import CardsPanel from './CardsPanel'
import ControllerSettings from './ControllerSettings'
import DealerPanel from './DealerPanel'
import GameActions from './GameActions'
import GameStateMinimal from './GameStateMinimal'
import PlayerState from './PlayerState'

import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'
import '../../../../vendor/styles/pages/chat.scss'

class ActionPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      dragElementWidth: 0,
      dragElementHeight: 0,
    }
  }

  componentDidMount() {
    const element = document.getElementsByClassName("drag-react")[0]
    this.setState({
      dragElementWidth: element.clientWidth,
      dragElementHeight: element.clientHeight,
    })
  }

  getDragElementSize() {
    switch (this.props.settings.optionF5) {
      case 0:
        return `scale(0.75)`
      case 1:
        return `scale(0.85)`
      case 2:
        return `scale(1.00)`
      case 3:
        return `scale(1.20)`
      default:
        return `scale(1.00)`
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

        <div className="flex-grow-1 position-relative">

          <PerfectScrollbar options={{
            suppressScrollX: true,
            wheelPropagation: true,
          }}
            className="chat-messages chat-scroll p-2"
            style={{ alignItems: "center", justifyContent: "flex-end", }}>

            <span
              className="list-group-item list-group-item-action online bg-transparent"
              style={{
                padding: "0px",
                borderWidth: "0px",
                alignItems: "center",
                width: "90%",
              }}>

              {this.props.settings.optionF8 && (
                <>
                  <Draggable
                    style={{
                      position: 'fixed',
                      left: Number((window.innerWidth / 2) - (this.state.dragElementWidth / 2)) + 'px',
                      top: Number((window.innerHeight / 2) - (this.state.dragElementHeight / 2)) + 'px',
                      zIndex: 99999,
                      cursor: 'grab',
                      width: this.getDragElementWidth(),
                      transform: this.getDragElementSize(),
                      WebkitTransition: "all .25s ease",
                      WebkitTransitionProperty: "transform, height, width",
                      OTransition: "all .25s ease",
                      OTransitionProperty: "transform, height, width",
                      transition: "all .25s ease",
                      transitionProperty: "transform, height, width",
                    }}>

                    {/* Cards Panel */}
                    <CardsPanel
                      {...this.props} {...this.state}
                      exit={this.props.exit} />
                    {/* / Cards Panel */}

                    {/* Player State */}
                    <PlayerState
                      {...this.props} {...this.state}
                      openFill={this.props.openFill}
                      openSlide={this.props.openSlide} />
                    {/* / Player State */}

                    {/* Game Actions Panel */}
                    <GameActions
                      {...this.props} {...this.state}
                      change={this.props.change}
                      resetAuto={this.props.resetAuto} />
                    {/* / Game Actions Panel */}

                    {/* Game State Minimal */}
                    <GameStateMinimal
                      {...this.props} {...this.state} />
                    {/* / Game State Minimal */}

                    {/* Controller Settings */}
                    <ControllerSettings
                      {...this.props} {...this.state}
                      change={this.props.change} />
                    {/* / Controller Settings */}

                  </Draggable>
                </>
              )}

              {/* Dealer Panel */}
              <DealerPanel
                {...this.props} {...this.state}
                openDealer={this.props.openDealer} />
              {/* / Dealer Panel */}

            </span>

          </PerfectScrollbar>

        </div>

        {/* / Action Panel */}
      </>
    )
  }
}

export default ActionPanel