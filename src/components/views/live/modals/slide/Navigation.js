import React, { Component } from 'react'
import { Badge, Button, Dropdown, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Clock from 'react-live-clock'

import '../../../../../vendor/styles/pages/chat.scss'

class Navigation extends Component {

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Navigation Modal */}
        <Modal.Body>

          <div className="d-flex justify-content-start align-items-center">
            <div style={{ width: "100px", }}>
              <div className="w-100 position-relative" style={{ paddingBottom: '20%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                  alt="Live Poker Studio™" className="d-block" style={{ width: "140px", }} />
              </div>
            </div>
          </div>

          {/* Live Clock */}
          <div className="bg-transparent d-flex justify-content-between small">
            <span className="font-weight-bold my-2 opacity-50 small">
              <span>
                {this.props.game.data.auto_mode ? "Auto Mode" : "Live Mode"}
              </span>
            </span>
            <span className="font-weight-bold my-2 opacity-50 small">
              <Clock format={"MMMM Do YYYY, h:mm:ss a"} ticking={true} />
            </span>
          </div>
          {/* / Live Clock */}

          <hr className="border-light m-0 py-2" />

          <>
            <span className="nav_parent__container shadow-none p-0">
              <div className="p-0 pb-3">
                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(10)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__live">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-live`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Table Insights
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(2)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__game_play">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Game Insights
                  </span>
                </Dropdown.Item>

                {this.props.settings.optionF7 && (
                  <Dropdown.Item
                    as={Link} to={'#'}
                    onClick={() => this.props.open(4)}
                    className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                    <div className="nav_content__s1">
                      <svg className="nav_content__s2 icon__chat">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-chat`}></use>
                      </svg>
                    </div>
                    <span className="d-flex align-items-center justify-content-between w-100 font-weight-semibold">
                      <span className="d-flex align-items-center justify-content-center">
                        Messages
                      </span>
                      <span className="d-flex align-items-center justify-content-center">
                        <Badge pill variant="default" className="font-weight-bold">
                          {this.props.game.messages.length < 999 ? this.props.game.messages.length : '999+'}
                        </Badge>
                      </span>
                    </span>
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(11)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__document">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-document`}></use>
                    </svg>
                  </div>
                  <span className="d-flex align-items-center justify-content-between w-100 font-weight-semibold">
                    <span className="d-flex align-items-center justify-content-center">
                      Bet History
                    </span>
                    <span className="d-flex align-items-center justify-content-center">
                      <Badge pill variant="default" className="font-weight-bold">
                        {this.props.game.report.length < 99 ? this.props.game.report.length : '99+'}
                      </Badge>
                    </span>
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(17)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__eye">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                    </svg>
                  </div>
                  <span className="d-flex align-items-center justify-content-between w-100 font-weight-semibold">
                    <span className="d-flex align-items-center justify-content-center">
                      Hand History
                    </span>
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(18)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__eye">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-add-square`}></use>
                    </svg>
                  </div>
                  <span className="d-flex align-items-center justify-content-between w-100 font-weight-semibold">
                    <span className="d-flex align-items-center justify-content-center">
                      Transactions
                    </span>
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openFill(15)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__email">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-search`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Rules Of Play
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openFill(12)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__email">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-email`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Feedback
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(7)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__settings">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-settings`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Settings
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.open(9)}
                  className="d-flex align-items-center px-0 mt-0 nav_link__container nav_link__item pr-4">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__logout">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-logout`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Exit Game
                  </span>
                </Dropdown.Item>
              </div>
            </span>
          </>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="default" block
            onClick={this.props.close}
            className="font-weight-bold">
            Continue
          </Button>

        </Modal.Body>
        {/* / Navigation Modal */}
      </>
    )
  }
}

export default Navigation
