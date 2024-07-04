import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import BetHistorySession from '../../live/modals/slide/BetHistorySession'
import ExitPlayer from '../../live/modals/slide/ExitPlayer'
import Feedback from '../../live/modals/slide/Feedback'
import GamePlayers from '../../live/modals/slide/GamePlayers'
import HandHistoryDb from '../../live/modals/slide/HandHistoryDb'
import HandHistorySession from '../../live/modals/slide/HandHistorySession'
import Insights from '../../live/modals/slide/Insights'
import LiveCards from '../../live/modals/slide/LiveCards'
import Messages from '../../live/modals/slide/Messages'
import Navigation from '../../live/modals/slide/Navigation'
import Notifications from '../../live/modals/slide/Notifications'
import Profile from '../../live/modals/slide/Profile'
import ReBuy from '../../live/modals/slide/ReBuy'
import Settings from '../../live/modals/slide/Settings'
import Support from '../../live/modals/slide/Support'
import SwitchTable from '../../live/modals/slide/SwitchTable'
import Table from '../../live/modals/slide/Table'
import Transactions from '../../live/modals/slide/Transactions'

import '../../../../vendor/styles/pages/chat.scss'

class SlideInModal extends Component {

  constructor(props) {
    super(props)

    this.onNotificationsChange = this.onNotificationsChange.bind(this)
    this.onTabChange = this.onTabChange.bind(this)

    this.state = {
      betHistoryTab: null,
      handHistoryTab: null,
      settingsTab: 1,
      supportTab: 0,
      profileTab: null,
      notifications: [],
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  onNotificationsChange(variant) {
    this.setState({
      notifications: this.state.notifications.filter(_variant => _variant !== variant)
    })
  }

  onTabChange(e, name, pane) {
    e.preventDefault()
    const value = this.state[name] === pane
      ? null
      : pane
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <>
        {/* Slide In Modal */}
        <Modal
          className="modal-slide"
          show={this.props.slideModalShow}
          onHide={this.props.close}
          onEnter={this.props.enter}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.close}>
            &times;
          </button>

          {this.props.slideModalContent === 1 && (
            <>
              {/* Profile Modal */}
              <Profile
                {...this.props} {...this.state}
                change={this.onTabChange} />
              {/* / Profile Modal */}
            </>
          )}

          {this.props.slideModalContent === 2 && (
            <>
              {/* Insights Modal */}
              <Insights {...this.props} />
              {/* / Insights Modal */}
            </>
          )}

          {this.props.slideModalContent === 3 && (
            <>
              {/* Re-Buy Modal */}
              <ReBuy {...this.props} />
              {/* / Re-Buy Modal */}
            </>
          )}

          {this.props.slideModalContent === 4 && (
            <>
              {/* Messages Modal */}
              <Messages {...this.props}
                change={this.props.changeSettings} />
              {/* / Messages Modal */}
            </>
          )}

          {this.props.slideModalContent === 5 && (
            <>
              {/* Notifications Modal */}
              <Notifications
                {...this.props} {...this.state}
                change={this.onNotificationsChange} />
              {/* / Notifications Modal */}
            </>
          )}

          {this.props.slideModalContent === 6 && (
            <>
              {/* Hand History Session Modal */}
              <HandHistorySession
                {...this.props} {...this.state}
                change={this.onTabChange} />
              {/* / Hand History Session Modal */}
            </>
          )}

          {this.props.slideModalContent === 7 && (
            <>
              {/* Settings Modal */}
              <Settings
                {...this.props} {...this.state}
                change={this.props.changeSettings}
                tab={this.onTabChange} />
              {/* / Settings Modal */}
            </>
          )}

          {this.props.slideModalContent === 8 && (
            <>
              {/* Support Modal */}
              <Support
                {...this.props} {...this.state}
                change={this.onTabChange} />
              {/* / Support Modal */}
            </>
          )}

          {this.props.slideModalContent === 9 && (
            <>
              {/* Exit Player Modal */}
              <ExitPlayer {...this.props} />
              {/* / Exit Player Modal */}
            </>
          )}

          {this.props.slideModalContent === 10 && (
            <>
              {/* Table Modal */}
              <Table {...this.props} {...this.state} />
              {/* / Table Modal */}
            </>
          )}

          {this.props.slideModalContent === 11 && (
            <>
              {/* Bet History Session Modal  */}
              <BetHistorySession
                {...this.props} {...this.state}
                change={this.onTabChange} />
              {/* / Bet History Session Modal  */}
            </>
          )}

          {this.props.slideModalContent === 12 && (
            <>
              {/* Game Players Modal  */}
              <GamePlayers {...this.props} {...this.state} />
              {/* / Game Players Modal  */}
            </>
          )}

          {this.props.slideModalContent === 14 && (
            <>
              {/* Live Cards Modal  */}
              <LiveCards {...this.props} {...this.state} />
              {/* / Live Cards Modal  */}
            </>
          )}

          {this.props.slideModalContent === 15 && (
            <>
              {/* Send Feedback Modal  */}
              <Feedback {...this.props} {...this.state} />
              {/* / Send Feedback Modal  */}
            </>
          )}

          {this.props.slideModalContent === 16 && (
            <>
              {/* Switch Table Modal  */}
              <SwitchTable {...this.props} {...this.state} />
              {/* / Switch Table Modal  */}
            </>
          )}

          {this.props.slideModalContent === 17 && (
            <>
              {/* Hand History Db Modal */}
              <HandHistoryDb
                {...this.props} {...this.state} />
              {/* / Hand History Db Modal */}
            </>
          )}

          {this.props.slideModalContent === 18 && (
            <>
              {/* Transactions Modal */}
              <Transactions
                {...this.props} {...this.state} />
              {/* / Transactions Modal */}
            </>
          )}

          {this.props.slideModalContent === 19 && (
            <>
              {/* Navigation Modal */}
              <Navigation
                {...this.props} {...this.state}
                open={this.props.openSlide} />
              {/* / Navigation Modal */}
            </>
          )}

        </Modal>
        {/* / Slide In Modal */}
      </>
    )
  }
}

export default SlideInModal