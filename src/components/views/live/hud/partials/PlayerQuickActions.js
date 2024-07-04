import React, { Component } from 'react'

class PlayerQuickActions extends Component {

  constructor(props) {
    super(props)

    this.handleRenderSitOutState = this.handleRenderSitOutState.bind(this)
    this.handleRenderSitOutClassName = this.handleRenderSitOutClassName.bind(this)
    this.handleSubmitSitOutState = this.handleSubmitSitOutState.bind(this)
    this.handleSubmitMuckCardsState = this.handleSubmitMuckCardsState.bind(this)
  }

  componentDidMount() {
    var elements = document.querySelectorAll('[id^="mobile-nav-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          const container1 = document.getElementById('mobile-nav-link-1-item')
          elements[i].addEventListener('mouseover', () => {
            container1.style.opacity = 1
            container1.setAttribute('content-before', 'Live Poker Hints')
          })
          elements[i].addEventListener('mouseleave', () => container1.style.opacity = 0)
          break
        case '2':
          const container2 = document.getElementById('mobile-nav-link-2-item')
          elements[i].addEventListener('mouseover', () => {
            container2.style.opacity = 1
            container2.setAttribute('content-before', 'Live Chat')
          })
          elements[i].addEventListener('mouseleave', () => container2.style.opacity = 0)
          break
        case '3':
          const container3 = document.getElementById('mobile-nav-link-3-item')
          elements[i].addEventListener('mouseover', () => {
            container3.style.opacity = 1
            container3.setAttribute('content-before', 'Sit Out')
          })
          elements[i].addEventListener('mouseleave', () => container3.style.opacity = 0)
          break
        case '4':
          const container4 = document.getElementById('mobile-nav-link-4-item')
          elements[i].addEventListener('mouseover', () => {
            container4.style.opacity = 1
            container4.setAttribute('content-before', 'Muck Cards')
          })
          elements[i].addEventListener('mouseleave', () => container4.style.opacity = 0)
          break
        default:
          break
      }
    }
  }

  handleSubmitSitOutState(value) {
    if (this.props.game.player) {
      this.props.client.sendPlayerSitOut(
        0,
        this.props.game.data.current_round,
        value ? 1 : 0,
      )
    }
  }

  handleSubmitMuckCardsState(value) {
    if (this.props.game.player) {
      this.props.client.sendPlayerMuckCards(
        0,
        this.props.game.data.current_round,
        value ? 1 : 0,
      )
    }
  }

  handleRenderSitOutState(request, state) {
    if (request && state) {
      return `icon__success`
    } else if (!request) {
      return `icon__default`
    } else if (request) {
      return `icon__success`
    }
  }

  handleRenderSitOutClassName(request, state) {
    if (request && state) {
      return `nav_link__item__active`
    } else if (!request && !state) {
      return ``
    } else if (request !== state) {
      return `nav_link__item__active`
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Player Quick Actions */}
        {this.props.game.data && (
          <div className="game-quick-actions-layout-s1 pl-3 pb-3 d-initial live-d-lg-none">
            <div className="game-quick-actions-layout-s2">

              <span
                id="mobile-nav-link-1"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionD3 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionD3', !this.props.settings.optionD3)}>
                <svg className={`icon icon-eye ${this.props.settings.optionD3 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                </svg>

                <span id="mobile-nav-container-1" >
                  <span id="mobile-nav-link-1-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                </span>
              </span>

              <span
                id="mobile-nav-link-2"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionF7 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionF7', !this.props.settings.optionF7)}>
                <svg className={`icon icon-wand ${this.props.settings.optionF7 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-chart`}></use>
                </svg>

                <span id="mobile-nav-container-2" >
                  <span id="mobile-nav-link-2-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                </span>
              </span>

              {this.props.game.player
                ? <span
                  id="mobile-nav-link-3"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.handleRenderSitOutClassName(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}
                  onClick={e => this.handleSubmitSitOutState(!this.props.game.player.p_sit_out_request)}>
                  <svg className={`icon icon-eye ${this.handleRenderSitOutState(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-pause`}></use>
                  </svg>

                  <span id="mobile-nav-container-3" >
                    <span id="mobile-nav-link-3-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                  </span>
                </span>
                : <span
                  id="mobile-nav-link-3"
                  className="game__action cursor-pointer nav_link__container nav_link__item"
                  onClick={e => this.prevent(e)}>
                  <svg className={`icon icon-eye icon__default`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-pause`}></use>
                  </svg>

                  <span id="mobile-nav-container-3" >
                    <span id="mobile-nav-link-3-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                  </span>
                </span>}

              {this.props.game.player
                ? <span
                  id="mobile-nav-link-4"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player.p_muck_cards && "nav_link__item__active"}`}
                  onClick={e => this.handleSubmitMuckCardsState(!this.props.game.player.p_muck_cards)}>
                  <svg className={`icon icon-wand ${this.props.game.player.p_muck_cards ? "icon__success" : "icon__default"}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-bookmarks`}></use>
                  </svg>

                  <span id="mobile-nav-container-4" >
                    <span id="mobile-nav-link-4-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                  </span>
                </span>
                : <span
                  id="mobile-nav-link-4"
                  className="game__action cursor-pointer nav_link__container nav_link__item"
                  onClick={e => this.prevent(e)}>
                  <svg className={`icon icon-wand icon__default`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-bookmarks`}></use>
                  </svg>

                  <span id="mobile-nav-container-4" >
                    <span id="mobile-nav-link-4-item" className="game__actions__hover-s3 game__actions__item ml-3" />
                  </span>
                </span>}

            </div>
          </div>
        )}
        {/* / Player Quick Actions */}
      </>
    )
  }
}

export default PlayerQuickActions