import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'
import toast from 'react-hot-toast'

import Clipboard from 'react-clipboard.js'

class GameDetails extends Component {

  onHandleClipboardCallback() {
    toast.success("Copied to clipboard.", {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        zIndex: '99999',
      },
    })
  }

  render() {
    return (
      <>
        {/* Game Details */}
        <span>
          <span
            className="text-body text-big font-weight-bold"
            style={{
              lineHeight: "0px",
            }}>
            <Badge
              pill variant="default"
              className="font-weight-bold align-text-bottom mr-2 cursor-pointer">
              Round ID
            </Badge>

            <Clipboard
              data-clipboard-text={this.props.game.data.session_id.slice(-17)}
              className="btn btn-default p-0 border-0 shadow-none mb-0 bg-transparent"
              onClick={() => { this.onHandleClipboardCallback() }}>
              <Badge
                pill variant="default"
                className="font-weight-bold align-text-bottom cursor-pointer mb-0">
                {this.props.game.data.session_id.slice(-17)}
              </Badge>
            </Clipboard>
          </span>
        </span>
        {/* / Game Details */}
      </>
    )
  }
}

export default GameDetails