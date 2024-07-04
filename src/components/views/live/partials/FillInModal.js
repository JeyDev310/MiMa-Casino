import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import DealerTip from '../../live/modals/fill/DealerTip'
import DemoExpired from '../../live/modals/fill/DemoExpired'
import ErrorHandler from '../../live/modals/fill/ErrorHandler'
import ExitPlayer from '../../live/modals/fill/ExitPlayer'
import Feedback from '../modals/fill/Feedback'
import GamePlayers from '../../live/modals/fill/GamePlayers'
import GiphySearchbox from '../../live/modals/fill/GiphySearchbox'
import Inactivity from '../../live/modals/fill/Inactivity'
import JoinGame from '../../live/modals/fill/JoinGame'
import JoinGameTournament from '../../live/modals/fill/JoinGameTournament'
import LiveCards from '../../live/modals/fill/LiveCards'
import LiveScreenshot from '../../live/modals/fill/LiveScreenshot'
import ReBuy from '../../live/modals/fill/ReBuy'
import RulesOfPlay from '../modals/fill/RulesOfPlay'
import Showdown from '../../live/modals/fill/Showdown'
import SwitchTable from '../modals/fill/SwitchTable'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/layouts/1/layout.scss'

class FillInModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Fill In Modal */}
        <Modal
          className="modal-fill-in fill-in-modal-layout-s1"
          show={this.props.fillInModalShow}
          size="lg" onHide={this.props.close}
          onEnter={this.props.enter}>

          {this.props.fillInModalContent === 1 && (
            <>
              {/* Join Game Modal */}
              {this.props.game.tournament
                ? <JoinGameTournament
                  {...this.props}
                  change={this.props.change}
                  mute={this.props.mute}
                />
                : <JoinGame
                  {...this.props}
                  change={this.props.change}
                  mute={this.props.mute}
                />}
              {/* / Join Game Modal */}
            </>
          )}

          {this.props.fillInModalContent === 2 && (
            <>
              {/* Exit Player Modal */}
              <ExitPlayer {...this.props} />
              {/* / Exit Player Modal */}
            </>
          )}

          {this.props.fillInModalContent === 3 && (
            <>
              {/* Showdown Modal */}
              <Showdown {...this.props} />
              {/* / Showdown Modal */}
            </>
          )}

          {this.props.fillInModalContent === 4 && (
            <>
              {/* Re-Buy Modal */}
              <ReBuy {...this.props} />
              {/* / Re-Buy Modal */}
            </>
          )}

          {this.props.fillInModalContent === 5 && (
            <>
              {/* Game Players Modal */}
              <GamePlayers {...this.props} />
              {/* / Game Players Modal */}
            </>
          )}

          {this.props.fillInModalContent === 6 && (
            <>
              {/* Live Cards Modal */}
              <LiveCards {...this.props} />
              {/* / Live Cards Modal */}
            </>
          )}

          {this.props.fillInModalContent === 7 && (
            <>
              {/* Dealer Tip Modal */}
              <DealerTip {...this.props}
                open={this.props.openFill} />
              {/* / Dealer Tip Modal */}
            </>
          )}

          {this.props.fillInModalContent === 8 && (
            <>
              {/* Inactivity Warning Modal */}
              <Inactivity {...this.props} />
              {/* / Inactivity Warning Modal */}
            </>
          )}

          {this.props.fillInModalContent === 9 && (
            <>
              {/* Switch Table Modal */}
              <SwitchTable {...this.props} />
              {/* / Switch Table Modal */}
            </>
          )}

          {this.props.fillInModalContent === 10 && (
            <>
              {/* Live Poker Screenshot Modal */}
              <LiveScreenshot {...this.props} />
              {/* / Live Poker Screenshot Modal */}
            </>
          )}

          {this.props.fillInModalContent === 11 && (
            <>
              {/* Live Poker Error Modal */}
              <ErrorHandler {...this.props} />
              {/* / Live Poker Error Modal */}
            </>
          )}

          {this.props.fillInModalContent === 12 && (
            <>
              {/* Feedback Modal */}
              <Feedback {...this.props} />
              {/* / Feedback Modal */}
            </>
          )}

          {this.props.fillInModalContent === 14 && (
            <>
              {/* GiphySearchbox Modal */}
              <GiphySearchbox {...this.props} />
              {/* / GiphySearchbox Modal */}
            </>
          )}

          {this.props.fillInModalContent === 15 && (
            <>
              {/* RulesOfPlay Modal */}
              <RulesOfPlay {...this.props} />
              {/* / RulesOfPlay Modal */}
            </>
          )}

          {this.props.fillInModalContent === 16 && (
            <>
              {/* DemoExpired Modal */}
              <DemoExpired {...this.props} />
              {/* / DemoExpired Modal */}
            </>
          )}

        </Modal>
        {/* / Fill In Modal */}
      </>
    )
  }
}

export default FillInModal