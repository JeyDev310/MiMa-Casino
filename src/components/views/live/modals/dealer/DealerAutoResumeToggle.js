import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerAutoResumeToggle extends Component {

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
        {/* Dealer Auto Resume Toggle */}
        <div className="card-header-elements ml-auto mr-0">
          <Form.Group className="mb-0">
            <span className="switcher-label font-weight-bold small mr-2">Auto-Resume</span>
            <label className="switcher">
              <input
                type="checkbox"
                className="switcher-input"
                checked={this.props.auto}
                onChange={e => this.props.change('auto', e.target.checked)} />
              <span className="switcher-indicator">
                <span className="switcher-yes"></span>
                <span className="switcher-no"></span>
              </span>
            </label>
          </Form.Group>
        </div>
        {/* / Dealer Auto Resume Toggle */}
      </>
    )
  }
}

export default DealerAutoResumeToggle