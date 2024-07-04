import React, { Component } from 'react'
// import { Card } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/live.scss'
import '../../../../../vendor/styles/pages/network.scss'

class GameStatus extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      auto: false,
    }
  }

  componentDidMount() {
    if (this.props.game.data) {
      this.setState({
        auto: this.props.game.data.auto_mode,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.auto_mode !== this.props.game.data.auto_mode) {
      this.setState({
        auto: this.props.game.data.auto_mode,
      })
    }
  }

  render() {
    return (
      <>

        {/* {this.state.auto && (
          <Card.Body
            style={{
              display: "grid",
              alignContent: "center",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              position: "absolute",
              filter: `brightness(1)`,
            }}>
            <Card className="d-flex w-100 mb-0 bg-transparent border-0 shadow-none">
              <div className="d-flex align-items-center justify-content-center mb-5">
                <span className="game__action cursor-pointer nav_link__container nav_link__item nav_link__item__active game-status-icon-notch-animation">
                  <i className="fas fa-circle-notch icon game-status-icon-notch icon__success game-status-icon-notch-opacity"></i>
                </span>
              </div>
            </Card>
          </Card.Body>
        )} */}

      </>
    )
  }
}

export default GameStatus