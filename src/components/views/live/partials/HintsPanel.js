import React, { Component } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'
import '../../../../vendor/styles/pages/chat.scss'

class HintsPanel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Hints Panel */}
        <div className="flex-grow-1 position-relative">
          <PerfectScrollbar options={{
            suppressScrollX: true,
            wheelPropagation: true,
          }} className="chat-contacts list-group chat-scroll py-3">
            <div className="flex-grow-1 position-relative mb-4"></div>
          </PerfectScrollbar>
        </div>
        {/* / Hints Panel */}
      </>
    )
  }
}

export default HintsPanel