import React, { Component } from 'react'
import { Badge, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class DropdownMenuNavigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }
  }

  onHandleToggle() {
    this.setState({
      show: !this.state.show,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dropdown Menu Navigation Button */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
              Navigation
            </Tooltip>
          }>

          {/* Dropdown Main */}
          <Dropdown className="demo-navbar-notifications live-d-lg-none">

            <Dropdown.Toggle
              id="dropdown-menu-link-4"
              size="md"
              className="mr-1"
              variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
              onToggle={this.onHandleToggle}>
              <i className="ion ion-md-menu"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu
              show={this.state.show}
              className="nav_parent__container shadow-none p-0 mt-1">
              <div className="p-3">

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openSlide(10)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__live">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-live`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Table
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openSlide(2)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__game_play">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Insights
                  </span>
                </Dropdown.Item>

                {this.props.settings.optionF7 && (
                  <Dropdown.Item
                    as={Link} to={'#'}
                    onClick={() => this.props.openSlide(4)}
                    className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
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
                          {this.props.game.messages.length < 99 ? this.props.game.messages.length : '99+'}
                        </Badge>
                      </span>
                    </span>
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openSlide(11)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
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
                  onClick={() => this.props.openSlide(17)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__eye">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                    </svg>
                  </div>
                  <span className="d-flex align-items-center justify-content-between w-100 font-weight-semibold">
                    <span className="d-flex align-items-center justify-content-center">
                      Hand History
                    </span>
                    {/* <span className="d-flex align-items-center justify-content-center">
                      <Badge pill variant="default" className="font-weight-bold">
                        {this.props.game.history.length < 99 ? this.props.game.history.length : '99+'}
                      </Badge>
                    </span> */}
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link} to={'#'}
                  onClick={() => this.props.openFill(15)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
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
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
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
                  onClick={() => this.props.openSlide(7)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
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
                  onClick={() => this.props.openSlide(9)}
                  className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
                  <div className="nav_content__s1">
                    <svg className="nav_content__s2 icon__logout">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-logout`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold">
                    Exit
                  </span>
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          {/* / Dropdown Main  */}

        </OverlayTrigger>
        {/* / Dropdown Menu Navigation Button  */}
      </>
    )
  }
}

export default DropdownMenuNavigation