import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

import LiveCards from '../../live/modals/fill/LiveCards'
import Showdown from '../../live/modals/fill/Showdown'

import '../../../../vendor/styles/pages/chat.scss'

class DealerModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.setState({
        init: false,
      }, () => {
        setTimeout(() => {
          this.setState({
            init: true,
          })
        }, 10000)
      })
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Modal */}
        <Modal
          className="modal-top"
          show={this.props.dealerModalShow}
          size="xl"
          onHide={this.props.close}
          onEnter={this.props.enter}>

          {this.props.dealerModalContent === 1
            ? <React.Fragment>

              {this.state.init
                ? <React.Fragment>

                  {/* Live Cards Modal */}
                  <LiveCards {...this.props} />
                  {/* / Live Cards Modal */}

                </React.Fragment>
                : <React.Fragment>

                  {/* Showdown Modal */}
                  <Showdown {...this.props} />
                  {/* / Showdown Modal */}

                </React.Fragment>}

            </React.Fragment>
            : null}

        </Modal>
        {/* / Dealer Modal */}
      </>
    )
  }
}

export default DealerModal