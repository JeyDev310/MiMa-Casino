import React, { Component } from 'react'

import DealerModal from '../../../partials/DealerModal'
import FillInModal from '../../../partials/FillInModal'
import MessageModal from '../../../partials/MessageModal'
import Notifications from '../../../partials/Notifications'
import SFXPlayer from '../../../partials/SFXPlayer'
import SlideInModal from '../../../partials/SlideInModal'
import ToastAdapter from '../../../partials/ToastAdapter'

class OverlayPanel extends Component {

  render() {
    return (
      <>
        {/* Overlay Panel */}

        {/* Message Modal */}
        <MessageModal
          {...this.props}
          {...this.state}
          enter={this.onMessageModalEnter}
          close={this.onMessageModalClose} />
        {/* / Message Modal */}

        {/* Slide In Modal */}
        <SlideInModal
          {...this.props}
          {...this.state}
          enter={this.onSlideModalEnter}
          close={this.onSlideModalClose}
          changeSettings={this.onHandleSettingsChange}
          exit={this.onHandleLeaveGame} />
        {/* / Slide In Modal */}

        {/* Dealer Modal */}
        <DealerModal
          {...this.props}
          {...this.state}
          enter={this.onDealerModalEnter}
          close={this.onDealerModalClose} />
        {/* / Dealer Modal */}

        {/* Fill In Modal */}
        <FillInModal
          {...this.props}
          {...this.state}
          enter={this.onFillInModalEnter}
          close={this.onFillInModalClose}
          exit={this.onHandleLeaveGame}
          exitSession={this.onHandleExitSession}
          select={this.onHandleSelectSeat}
          change={this.onHandleSettingsChange}
          mute={this.onHandleMuteAudioElements}
          timeout={this.onHandleSetInactivityTimeout} />
        {/* / Fill In Modal */}

        {/* Notifications */}
        <Notifications
          {...this.props}
          {...this.state}
          open={this.onSlideModalOpen}
          change={this.onHandleSettingsChange}
          reset={this.onHandleResetPlayer}
          resetAuto={this.onHandleResetAutoOptions} />
        {/* / Notifications */}

        {/* SFXPlayer */}
        <SFXPlayer
          {...this.props}
          {...this.state} />
        {/* / SFXPlayer */}

        {/* Toast Adapter */}
        <ToastAdapter />
        {/* / Toast Adapter */}

        {/* / Overlay Panel */}
      </>
    )
  }
}

export default OverlayPanel