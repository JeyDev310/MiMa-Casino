import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, ListGroup, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import MinHeightSlider from '../utilities/MinHeightSlider'
import PromotionSlider from '../utilities/PromotionSlider'

import moment from 'moment'
import * as numeral from 'numeral'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import {
  truncateUsername,
} from '../live/utilities/TextPreprocessing'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/contacts.scss'
import '../../../vendor/styles/pages/products.scss'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class LeaderboardView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Leaderboard')

    this.onRefreshLeaderboard = this.onRefreshLeaderboard.bind(this)
    this.onHandleRenderLeaderboardIcon = this.onHandleRenderLeaderboardIcon.bind(this)

    this.renderChartMostActivePlayers = this.renderChartMostActivePlayers.bind(this)
    this.renderChartAllTimeBestPlayers = this.renderChartAllTimeBestPlayers.bind(this)
    this.renderChartMostGamesPlayedPlayers = this.renderChartMostGamesPlayedPlayers.bind(this)
    this.renderChartMostProfitLastSessionPlayers = this.renderChartMostProfitLastSessionPlayers.bind(this)

    this.state = {
      username: null,
      email: null,
      data: [],
      scale1: true,
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/auth/login")
    }
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
    }
    if (localStorage.getItem('user')) {
      this.props.objectsRequestHandler(
        'REQ_LEADERBOARD_GET', null, this.props.history
      ).then(() => {
        this.setState({
          init: true,
          data: this.props.leaderboard,
        })
      })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_WALLET_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          })
        })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_STATISTICS_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
        })
    }
  }

  onRefreshLeaderboard() {
    if (localStorage.getItem('user')) {
      this.props.objectsRequestHandler(
        'REQ_LEADERBOARD_GET', null, this.props.history
      ).then(() => {
        this.setState({ init: true, data: this.props.leaderboard }, () => {
          this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
              <h6>
                Live Poker Studio™ Leaderboard
              </h6>
              <p className="mb-0">
                Leaderboard has been updated successfully.
              </p>
            </div>
          </>, 'info')
        })
      })
    }
  }

  onHandleChangeScale(field) {
    const value = !this.state[field]
    this.setState({
      [field]: value,
    })
  }

  onHandleRenderLeaderboardIcon(index) {
    switch (index) {
      case 0:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 51 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }} >
            <path d="M5.40625 26.375L4.30469 31.9297C4.23438 32.2344 4.21094 32.6797 4.21094 32.9844C4.21094 34.5312 5.21875 35.5391 6.95312 35.5391C8.82812 35.5391 9.95312 34.6016 10.3281 32.6328L11.5703 26.375H16.8672L15.7422 31.9297C15.6719 32.2344 15.6484 32.6797 15.6484 32.9844C15.6484 34.5312 16.6562 35.5391 18.3906 35.5391C20.2656 35.5391 21.3906 34.6016 21.7656 32.6094L23.0312 26.375H25.9844C28.1875 26.375 29.5234 25.0859 29.5234 23.0703C29.5234 21.4766 28.4219 20.4453 26.6406 20.4453H24.1797L25.1875 15.2656H28.1406C30.3438 15.2656 31.6562 13.9766 31.6562 11.9844C31.6562 10.3906 30.5781 9.38281 28.7734 9.38281H26.3594L27.3906 4.25C27.4609 3.94531 27.4844 3.5 27.4844 3.19531C27.4844 1.64844 26.4766 0.640625 24.7422 0.640625C22.8672 0.640625 21.7422 1.57812 21.3672 3.57031L20.1953 9.38281H14.9453L15.9531 4.25C16.0234 3.94531 16.0703 3.5 16.0703 3.19531C16.0703 1.64844 15.0391 0.640625 13.3047 0.640625C11.4297 0.640625 10.3047 1.57812 9.92969 3.57031L8.73438 9.38281H5.85156C3.64844 9.38281 2.3125 10.6719 2.3125 12.6875C2.3125 14.2578 3.41406 15.3125 5.19531 15.3125H7.58594L6.57812 20.4922H3.71875C1.51562 20.4922 0.203125 21.7812 0.203125 23.7734C0.203125 25.3672 1.28125 26.375 3.08594 26.375H5.40625ZM12.1094 21.0781L13.3984 14.6562H19.6562L18.3438 21.0781H12.1094Z" fill="white" />
            <path d="M46.5859 35.5391C49.1406 35.5391 50.8516 33.875 50.8516 31.2969V5.44531C50.8516 2.49219 49.0469 0.640625 45.9531 0.640625C44.2656 0.640625 42.8125 0.828125 41.0078 2.04688L34.6094 6.40625C33.3906 7.25 32.8984 8.21094 32.8984 9.45312C32.8984 11.1875 34.1406 12.4297 35.8047 12.4297C36.625 12.4297 37.1406 12.2422 37.9141 11.7031L42.1328 8.77344H42.2969V31.2969C42.2969 33.875 44.0312 35.5391 46.5859 35.5391Z" fill="white" />
          </svg>
        )

      case 1:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 61 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.45312 26.375L4.35156 31.9297C4.28125 32.2344 4.25781 32.6797 4.25781 32.9844C4.25781 34.5312 5.26562 35.5391 7 35.5391C8.875 35.5391 10 34.6016 10.375 32.6328L11.6172 26.375H16.9141L15.7891 31.9297C15.7188 32.2344 15.6953 32.6797 15.6953 32.9844C15.6953 34.5312 16.7031 35.5391 18.4375 35.5391C20.3125 35.5391 21.4375 34.6016 21.8125 32.6094L23.0781 26.375H26.0312C28.2344 26.375 29.5703 25.0859 29.5703 23.0703C29.5703 21.4766 28.4688 20.4453 26.6875 20.4453H24.2266L25.2344 15.2656H28.1875C30.3906 15.2656 31.7031 13.9766 31.7031 11.9844C31.7031 10.3906 30.625 9.38281 28.8203 9.38281H26.4062L27.4375 4.25C27.5078 3.94531 27.5312 3.5 27.5312 3.19531C27.5312 1.64844 26.5234 0.640625 24.7891 0.640625C22.9141 0.640625 21.7891 1.57812 21.4141 3.57031L20.2422 9.38281H14.9922L16 4.25C16.0703 3.94531 16.1172 3.5 16.1172 3.19531C16.1172 1.64844 15.0859 0.640625 13.3516 0.640625C11.4766 0.640625 10.3516 1.57812 9.97656 3.57031L8.78125 9.38281H5.89844C3.69531 9.38281 2.35938 10.6719 2.35938 12.6875C2.35938 14.2578 3.46094 15.3125 5.24219 15.3125H7.63281L6.625 20.4922H3.76562C1.5625 20.4922 0.25 21.7812 0.25 23.7734C0.25 25.3672 1.32812 26.375 3.13281 26.375H5.45312ZM12.1562 21.0781L13.4453 14.6562H19.7031L18.3906 21.0781H12.1562Z" fill="white" />
            <path d="M38.0078 35H56.7578C58.9375 35 60.2031 33.6641 60.2031 31.6953C60.2031 29.6797 58.9375 28.3906 56.7578 28.3906H45.0625V28.2266L51.7891 22.0859C57.1562 17.2344 59.3594 14.75 59.3594 10.4141C59.3594 4.4375 54.2969 0.335938 46.5859 0.335938C40.4219 0.335938 35.9219 3.3125 34.4453 7.20312C34.1875 7.8125 34.0938 8.42188 34.0938 9.07812C34.0938 11.1875 35.4297 12.4766 37.6562 12.4766C39.3906 12.4766 40.3984 11.7969 41.4766 10.1328C42.7188 7.88281 44.2422 6.80469 46.4688 6.80469C49.1641 6.80469 51.0391 8.53906 51.0391 10.9766C51.0391 13.1797 49.9609 14.7266 46 18.3359L36.3438 27.1016C34.6562 28.5547 33.9766 29.7031 33.9766 31.3203C33.9766 33.4531 35.2422 35 38.0078 35Z" fill="white" />
          </svg>
        )

      case 2:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 61 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.32031 26.375L4.21875 31.9297C4.14844 32.2344 4.125 32.6797 4.125 32.9844C4.125 34.5312 5.13281 35.5391 6.86719 35.5391C8.74219 35.5391 9.86719 34.6016 10.2422 32.6328L11.4844 26.375H16.7812L15.6562 31.9297C15.5859 32.2344 15.5625 32.6797 15.5625 32.9844C15.5625 34.5312 16.5703 35.5391 18.3047 35.5391C20.1797 35.5391 21.3047 34.6016 21.6797 32.6094L22.9453 26.375H25.8984C28.1016 26.375 29.4375 25.0859 29.4375 23.0703C29.4375 21.4766 28.3359 20.4453 26.5547 20.4453H24.0938L25.1016 15.2656H28.0547C30.2578 15.2656 31.5703 13.9766 31.5703 11.9844C31.5703 10.3906 30.4922 9.38281 28.6875 9.38281H26.2734L27.3047 4.25C27.375 3.94531 27.3984 3.5 27.3984 3.19531C27.3984 1.64844 26.3906 0.640625 24.6562 0.640625C22.7812 0.640625 21.6562 1.57812 21.2812 3.57031L20.1094 9.38281H14.8594L15.8672 4.25C15.9375 3.94531 15.9844 3.5 15.9844 3.19531C15.9844 1.64844 14.9531 0.640625 13.2188 0.640625C11.3438 0.640625 10.2188 1.57812 9.84375 3.57031L8.64844 9.38281H5.76562C3.5625 9.38281 2.22656 10.6719 2.22656 12.6875C2.22656 14.2578 3.32812 15.3125 5.10938 15.3125H7.5L6.49219 20.4922H3.63281C1.42969 20.4922 0.117188 21.7812 0.117188 23.7734C0.117188 25.3672 1.19531 26.375 3 26.375H5.32031ZM12.0234 21.0781L13.3125 14.6562H19.5703L18.2578 21.0781H12.0234Z" fill="white" />
            <path d="M47.0391 35.8438C55.5234 35.8438 60.9844 31.7656 60.9844 25.4375C60.9844 20.8672 57.75 17.9844 52.6406 17.4688V17.3047C56.5078 16.5312 59.6484 13.7656 59.6484 9.42969C59.6484 3.6875 54.3516 0.335938 46.9922 0.335938C40.3359 0.335938 36.3516 3.52344 35.0156 6.80469C34.7109 7.53125 34.5938 8.11719 34.5938 8.84375C34.5938 10.8125 35.7891 12.2188 38.1328 12.2188C40.0312 12.2188 41.0625 11.5391 42.0234 9.73438C43.0547 7.71875 44.625 6.73438 47.0391 6.73438C49.9688 6.73438 51.6562 8.25781 51.6562 10.6484C51.6562 13.1094 49.6406 14.7266 46.3359 14.7266H45.5625C43.5234 14.7266 42.4453 15.9219 42.4453 17.6328C42.4453 19.3906 43.5234 20.5625 45.5625 20.5625H46.3828C50.1328 20.5625 52.2422 22.0859 52.2422 24.9219C52.2422 27.3594 50.1797 29.0938 47.2266 29.0938C44.0156 29.0938 42.4922 27.8516 41.25 25.7422C40.4062 24.3828 39.3516 23.7969 37.7109 23.7969C35.3672 23.7969 33.9375 25.1562 33.9375 27.3125C33.9375 27.9219 34.0781 28.625 34.3594 29.2812C35.7188 32.5625 39.8438 35.8438 47.0391 35.8438Z" fill="white" />
          </svg>
        )

      case 3:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 63 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.32812 26.375L4.22656 31.9297C4.15625 32.2344 4.13281 32.6797 4.13281 32.9844C4.13281 34.5312 5.14062 35.5391 6.875 35.5391C8.75 35.5391 9.875 34.6016 10.25 32.6328L11.4922 26.375H16.7891L15.6641 31.9297C15.5938 32.2344 15.5703 32.6797 15.5703 32.9844C15.5703 34.5312 16.5781 35.5391 18.3125 35.5391C20.1875 35.5391 21.3125 34.6016 21.6875 32.6094L22.9531 26.375H25.9062C28.1094 26.375 29.4453 25.0859 29.4453 23.0703C29.4453 21.4766 28.3438 20.4453 26.5625 20.4453H24.1016L25.1094 15.2656H28.0625C30.2656 15.2656 31.5781 13.9766 31.5781 11.9844C31.5781 10.3906 30.5 9.38281 28.6953 9.38281H26.2812L27.3125 4.25C27.3828 3.94531 27.4062 3.5 27.4062 3.19531C27.4062 1.64844 26.3984 0.640625 24.6641 0.640625C22.7891 0.640625 21.6641 1.57812 21.2891 3.57031L20.1172 9.38281H14.8672L15.875 4.25C15.9453 3.94531 15.9922 3.5 15.9922 3.19531C15.9922 1.64844 14.9609 0.640625 13.2266 0.640625C11.3516 0.640625 10.2266 1.57812 9.85156 3.57031L8.65625 9.38281H5.77344C3.57031 9.38281 2.23438 10.6719 2.23438 12.6875C2.23438 14.2578 3.33594 15.3125 5.11719 15.3125H7.50781L6.5 20.4922H3.64062C1.4375 20.4922 0.125 21.7812 0.125 23.7734C0.125 25.3672 1.20312 26.375 3.00781 26.375H5.32812ZM12.0312 21.0781L13.3203 14.6562H19.5781L18.2656 21.0781H12.0312Z" fill="white" />
            <path d="M54.0781 35.5391C56.4219 35.5391 58.1328 34.1797 58.1328 31.4375V29.2344H59.4453C61.6953 29.2344 62.8672 27.8516 62.8672 25.9062C62.8672 23.9609 61.7188 22.5547 59.4453 22.5547H58.1328V6.6875C58.1328 3.00781 55.3438 0.640625 51.0312 0.640625C47.6328 0.640625 45.6406 2 43.0391 6.03125C39.9219 10.7422 37.2266 15.0078 34.9766 19.0625C33.7812 21.1719 33.2656 22.7891 33.2656 24.4297C33.2656 27.2891 35.375 29.2344 38.4688 29.2344H50V31.4375C50 34.1797 51.7109 35.5391 54.0781 35.5391ZM50.2344 22.8594H40.4609V22.625C43.2031 17.3516 45.9922 13.0156 50.0703 7.10938H50.2344V22.8594Z" fill="white" />
          </svg>
        )

      case 4:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 62 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.39062 26.375L4.28906 31.9297C4.21875 32.2344 4.19531 32.6797 4.19531 32.9844C4.19531 34.5312 5.20312 35.5391 6.9375 35.5391C8.8125 35.5391 9.9375 34.6016 10.3125 32.6328L11.5547 26.375H16.8516L15.7266 31.9297C15.6562 32.2344 15.6328 32.6797 15.6328 32.9844C15.6328 34.5312 16.6406 35.5391 18.375 35.5391C20.25 35.5391 21.375 34.6016 21.75 32.6094L23.0156 26.375H25.9688C28.1719 26.375 29.5078 25.0859 29.5078 23.0703C29.5078 21.4766 28.4062 20.4453 26.625 20.4453H24.1641L25.1719 15.2656H28.125C30.3281 15.2656 31.6406 13.9766 31.6406 11.9844C31.6406 10.3906 30.5625 9.38281 28.7578 9.38281H26.3438L27.375 4.25C27.4453 3.94531 27.4688 3.5 27.4688 3.19531C27.4688 1.64844 26.4609 0.640625 24.7266 0.640625C22.8516 0.640625 21.7266 1.57812 21.3516 3.57031L20.1797 9.38281H14.9297L15.9375 4.25C16.0078 3.94531 16.0547 3.5 16.0547 3.19531C16.0547 1.64844 15.0234 0.640625 13.2891 0.640625C11.4141 0.640625 10.2891 1.57812 9.91406 3.57031L8.71875 9.38281H5.83594C3.63281 9.38281 2.29688 10.6719 2.29688 12.6875C2.29688 14.2578 3.39844 15.3125 5.17969 15.3125H7.57031L6.5625 20.4922H3.70312C1.5 20.4922 0.1875 21.7812 0.1875 23.7734C0.1875 25.3672 1.26562 26.375 3.07031 26.375H5.39062ZM12.0938 21.0781L13.3828 14.6562H19.6406L18.3281 21.0781H12.0938Z" fill="white" />
            <path d="M47.6484 35.8438C55.6875 35.8438 61.2656 30.9453 61.2656 23.5156C61.2656 17.0938 56.6719 12.5938 50.2734 12.5938C46.7344 12.5938 43.9922 14.0703 42.6797 16.2969H42.5156L43.1719 7.78906H56.1094C58.1719 7.78906 59.4844 6.5 59.4844 4.48438C59.4844 2.46875 58.1484 1.17969 56.1094 1.17969H40.8984C38.0156 1.17969 36.3281 2.46875 36.0938 5.5625L35.2031 17.4453C35.2031 17.4922 35.2031 17.5156 35.2031 17.5625C35.0625 19.8359 36.3516 21.8047 39.1875 21.8047C41.0625 21.8047 41.9297 21.3828 43.2422 20.2344C44.3203 19.2734 45.7969 18.4297 47.6484 18.4297C50.8828 18.4297 53.1562 20.6094 53.1562 23.7031C53.1562 26.8672 50.7891 29.2109 47.5781 29.2109C44.8594 29.2109 43.2188 27.9219 41.9062 25.9531C40.875 24.6641 39.8438 24.125 38.2266 24.125C36.0469 24.125 34.7578 25.3906 34.7578 27.5C34.7578 28.3203 34.9688 29.1172 35.3438 29.8672C37.0781 33.3125 42.0469 35.8438 47.6484 35.8438Z" fill="white" />
          </svg>
        )

      case 5:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 62 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.42188 26.375L4.32031 31.9297C4.25 32.2344 4.22656 32.6797 4.22656 32.9844C4.22656 34.5312 5.23438 35.5391 6.96875 35.5391C8.84375 35.5391 9.96875 34.6016 10.3438 32.6328L11.5859 26.375H16.8828L15.7578 31.9297C15.6875 32.2344 15.6641 32.6797 15.6641 32.9844C15.6641 34.5312 16.6719 35.5391 18.4062 35.5391C20.2812 35.5391 21.4062 34.6016 21.7812 32.6094L23.0469 26.375H26C28.2031 26.375 29.5391 25.0859 29.5391 23.0703C29.5391 21.4766 28.4375 20.4453 26.6562 20.4453H24.1953L25.2031 15.2656H28.1562C30.3594 15.2656 31.6719 13.9766 31.6719 11.9844C31.6719 10.3906 30.5938 9.38281 28.7891 9.38281H26.375L27.4062 4.25C27.4766 3.94531 27.5 3.5 27.5 3.19531C27.5 1.64844 26.4922 0.640625 24.7578 0.640625C22.8828 0.640625 21.7578 1.57812 21.3828 3.57031L20.2109 9.38281H14.9609L15.9688 4.25C16.0391 3.94531 16.0859 3.5 16.0859 3.19531C16.0859 1.64844 15.0547 0.640625 13.3203 0.640625C11.4453 0.640625 10.3203 1.57812 9.94531 3.57031L8.75 9.38281H5.86719C3.66406 9.38281 2.32812 10.6719 2.32812 12.6875C2.32812 14.2578 3.42969 15.3125 5.21094 15.3125H7.60156L6.59375 20.4922H3.73438C1.53125 20.4922 0.21875 21.7812 0.21875 23.7734C0.21875 25.3672 1.29688 26.375 3.10156 26.375H5.42188ZM12.125 21.0781L13.4141 14.6562H19.6719L18.3594 21.0781H12.125Z" fill="white" />
            <path d="M48.3594 35.8438C56.2109 35.8438 61.9531 30.7812 61.9531 23.6094C61.9531 17.2812 57.6172 12.6875 51.0312 12.6875C46.4609 12.6875 43.2266 14.9141 41.9375 18.0781H41.7734V17.7031C41.7266 11.3516 43.7891 6.92188 48.2188 6.92188C50.2578 6.92188 51.6875 7.60156 53.1875 9.21875C54.3828 10.4141 55.3438 11.1172 57.0312 11.1172C59.2812 11.1172 60.5234 9.64062 60.5234 7.8125C60.5234 7.17969 60.3828 6.59375 60.1016 5.96094C58.6719 2.86719 54.5 0.3125 48.2188 0.3125C39.1719 0.3125 33.5469 7.10938 33.5469 18.2188C33.5469 22.2969 34.3438 25.8125 35.75 28.4375C38.4219 33.4766 42.8047 35.8438 48.3594 35.8438ZM48.2422 29.2344C45.1953 29.2344 42.8281 26.9141 42.8281 23.8672C42.8281 20.8438 45.1953 18.7109 48.3125 18.7109C51.3594 18.7109 53.6797 20.8906 53.6562 23.9844C53.6328 26.9375 51.2656 29.2344 48.2422 29.2344Z" fill="white" />
          </svg>
        )

      case 6:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 59 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.34375 26.375L4.24219 31.9297C4.17188 32.2344 4.14844 32.6797 4.14844 32.9844C4.14844 34.5312 5.15625 35.5391 6.89062 35.5391C8.76562 35.5391 9.89062 34.6016 10.2656 32.6328L11.5078 26.375H16.8047L15.6797 31.9297C15.6094 32.2344 15.5859 32.6797 15.5859 32.9844C15.5859 34.5312 16.5938 35.5391 18.3281 35.5391C20.2031 35.5391 21.3281 34.6016 21.7031 32.6094L22.9688 26.375H25.9219C28.125 26.375 29.4609 25.0859 29.4609 23.0703C29.4609 21.4766 28.3594 20.4453 26.5781 20.4453H24.1172L25.125 15.2656H28.0781C30.2812 15.2656 31.5938 13.9766 31.5938 11.9844C31.5938 10.3906 30.5156 9.38281 28.7109 9.38281H26.2969L27.3281 4.25C27.3984 3.94531 27.4219 3.5 27.4219 3.19531C27.4219 1.64844 26.4141 0.640625 24.6797 0.640625C22.8047 0.640625 21.6797 1.57812 21.3047 3.57031L20.1328 9.38281H14.8828L15.8906 4.25C15.9609 3.94531 16.0078 3.5 16.0078 3.19531C16.0078 1.64844 14.9766 0.640625 13.2422 0.640625C11.3672 0.640625 10.2422 1.57812 9.86719 3.57031L8.67188 9.38281H5.78906C3.58594 9.38281 2.25 10.6719 2.25 12.6875C2.25 14.2578 3.35156 15.3125 5.13281 15.3125H7.52344L6.51562 20.4922H3.65625C1.45312 20.4922 0.140625 21.7812 0.140625 23.7734C0.140625 25.3672 1.21875 26.375 3.02344 26.375H5.34375ZM12.0469 21.0781L13.3359 14.6562H19.5938L18.2812 21.0781H12.0469Z" fill="white" />
            <path d="M41.2969 35.5391C43.125 35.5391 44.1562 34.8828 45.1172 33.0312L56.7422 10.7188C57.8438 8.63281 58.3125 7.27344 58.3125 5.75C58.3125 2.91406 56.1328 1.17969 53.2734 1.17969H36.1406C34.1484 1.17969 32.7188 2.46875 32.7188 4.46094C32.7188 6.45312 34.1484 7.78906 36.1406 7.78906H49.7109V7.95312L38.0859 29.3516C37.5938 30.2422 37.3594 31.0391 37.3594 32.0469C37.3594 33.9922 38.8359 35.5391 41.2969 35.5391Z" fill="white" />
          </svg>
        )

      case 7:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 63 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.57031 26.375L4.46875 31.9297C4.39844 32.2344 4.375 32.6797 4.375 32.9844C4.375 34.5312 5.38281 35.5391 7.11719 35.5391C8.99219 35.5391 10.1172 34.6016 10.4922 32.6328L11.7344 26.375H17.0312L15.9062 31.9297C15.8359 32.2344 15.8125 32.6797 15.8125 32.9844C15.8125 34.5312 16.8203 35.5391 18.5547 35.5391C20.4297 35.5391 21.5547 34.6016 21.9297 32.6094L23.1953 26.375H26.1484C28.3516 26.375 29.6875 25.0859 29.6875 23.0703C29.6875 21.4766 28.5859 20.4453 26.8047 20.4453H24.3438L25.3516 15.2656H28.3047C30.5078 15.2656 31.8203 13.9766 31.8203 11.9844C31.8203 10.3906 30.7422 9.38281 28.9375 9.38281H26.5234L27.5547 4.25C27.625 3.94531 27.6484 3.5 27.6484 3.19531C27.6484 1.64844 26.6406 0.640625 24.9062 0.640625C23.0312 0.640625 21.9062 1.57812 21.5312 3.57031L20.3594 9.38281H15.1094L16.1172 4.25C16.1875 3.94531 16.2344 3.5 16.2344 3.19531C16.2344 1.64844 15.2031 0.640625 13.4688 0.640625C11.5938 0.640625 10.4688 1.57812 10.0938 3.57031L8.89844 9.38281H6.01562C3.8125 9.38281 2.47656 10.6719 2.47656 12.6875C2.47656 14.2578 3.57812 15.3125 5.35938 15.3125H7.75L6.74219 20.4922H3.88281C1.67969 20.4922 0.367188 21.7812 0.367188 23.7734C0.367188 25.3672 1.44531 26.375 3.25 26.375H5.57031ZM12.2734 21.0781L13.5625 14.6562H19.8203L18.5078 21.0781H12.2734Z" fill="white" />
            <path d="M48.2266 35.8438C56.7812 35.8438 62.7109 31.8125 62.7109 25.8594C62.7109 21.2891 59.2656 18.0781 54.5078 17.2578V17.0938C58.6094 16.1797 61.4688 13.25 61.4688 9.57031C61.4688 4.20312 56.0781 0.335938 48.2266 0.335938C40.3984 0.335938 34.9844 4.20312 34.9844 9.54688C34.9844 13.2969 37.8672 16.1797 41.9922 17.0938V17.2578C37.2344 18.0781 33.7656 21.2656 33.7656 25.8359C33.7656 31.8125 39.6484 35.8438 48.2266 35.8438ZM48.2266 14.6562C45.4609 14.6562 43.4922 12.9219 43.4922 10.4375C43.4922 7.92969 45.4844 6.21875 48.2266 6.21875C50.9922 6.21875 53.0078 7.92969 53.0078 10.4375C53.0078 12.9219 51.0156 14.6562 48.2266 14.6562ZM48.2266 29.9375C45.0156 29.9375 42.7891 27.9453 42.7891 25.2031C42.7891 22.5078 45.0156 20.5625 48.2266 20.5625C51.4609 20.5625 53.6875 22.5078 53.6875 25.2031C53.6875 27.9453 51.4609 29.9375 48.2266 29.9375Z" fill="white" />
          </svg>
        )

      case 8:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 62 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.35156 26.375L4.25 31.9297C4.17969 32.2344 4.15625 32.6797 4.15625 32.9844C4.15625 34.5312 5.16406 35.5391 6.89844 35.5391C8.77344 35.5391 9.89844 34.6016 10.2734 32.6328L11.5156 26.375H16.8125L15.6875 31.9297C15.6172 32.2344 15.5938 32.6797 15.5938 32.9844C15.5938 34.5312 16.6016 35.5391 18.3359 35.5391C20.2109 35.5391 21.3359 34.6016 21.7109 32.6094L22.9766 26.375H25.9297C28.1328 26.375 29.4688 25.0859 29.4688 23.0703C29.4688 21.4766 28.3672 20.4453 26.5859 20.4453H24.125L25.1328 15.2656H28.0859C30.2891 15.2656 31.6016 13.9766 31.6016 11.9844C31.6016 10.3906 30.5234 9.38281 28.7188 9.38281H26.3047L27.3359 4.25C27.4062 3.94531 27.4297 3.5 27.4297 3.19531C27.4297 1.64844 26.4219 0.640625 24.6875 0.640625C22.8125 0.640625 21.6875 1.57812 21.3125 3.57031L20.1406 9.38281H14.8906L15.8984 4.25C15.9688 3.94531 16.0156 3.5 16.0156 3.19531C16.0156 1.64844 14.9844 0.640625 13.25 0.640625C11.375 0.640625 10.25 1.57812 9.875 3.57031L8.67969 9.38281H5.79688C3.59375 9.38281 2.25781 10.6719 2.25781 12.6875C2.25781 14.2578 3.35938 15.3125 5.14062 15.3125H7.53125L6.52344 20.4922H3.66406C1.46094 20.4922 0.148438 21.7812 0.148438 23.7734C0.148438 25.3672 1.22656 26.375 3.03125 26.375H5.35156ZM12.0547 21.0781L13.3438 14.6562H19.6016L18.2891 21.0781H12.0547Z" fill="white" />
            <path d="M46.9297 35.8438C56.3047 35.8438 61.9531 29.1172 61.9531 17.9375C61.9531 13.8594 61.1562 10.3438 59.7734 7.71875C57.1016 2.67969 52.6953 0.335938 47.1641 0.335938C39.3125 0.335938 33.5703 5.375 33.5703 12.5469C33.5703 19.2266 38.6328 23.5156 44.7969 23.5156C49.3203 23.5156 52.4609 21.2656 53.5859 18.0547H53.7266C53.7266 18.1953 53.7266 18.3125 53.7266 18.4062C53.8203 24.5938 51.9688 29.2578 47.3047 29.2578C45.1484 29.2578 43.8125 28.5078 42.2656 26.9375C41.0703 25.7891 40.1328 25.0391 38.4219 25.0391C36.1719 25.0391 34.9531 26.5156 34.9531 28.3438C34.9531 28.9531 35.0938 29.5391 35.375 30.1719C36.8281 33.4531 41.2109 35.8438 46.9297 35.8438ZM47.2109 17.4453C44.1406 17.4453 41.8438 15.2891 41.8438 12.1953C41.8438 9.21875 44.2344 6.92188 47.2812 6.92188C50.3047 6.92188 52.6719 9.26562 52.6719 12.3125C52.6719 15.3125 50.3281 17.4453 47.2109 17.4453Z" fill="white" />
          </svg>
        )

      case 9:
        return (
          <svg className="d-block ui-w-30" width="48" height="48" viewBox="0 0 87 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            filter: "drop-shadow(0px 0px 5px #fff)",
          }}>
            <path d="M5.54688 26.375L4.44531 31.9297C4.375 32.2344 4.35156 32.6797 4.35156 32.9844C4.35156 34.5312 5.35938 35.5391 7.09375 35.5391C8.96875 35.5391 10.0938 34.6016 10.4688 32.6328L11.7109 26.375H17.0078L15.8828 31.9297C15.8125 32.2344 15.7891 32.6797 15.7891 32.9844C15.7891 34.5312 16.7969 35.5391 18.5312 35.5391C20.4062 35.5391 21.5312 34.6016 21.9062 32.6094L23.1719 26.375H26.125C28.3281 26.375 29.6641 25.0859 29.6641 23.0703C29.6641 21.4766 28.5625 20.4453 26.7812 20.4453H24.3203L25.3281 15.2656H28.2812C30.4844 15.2656 31.7969 13.9766 31.7969 11.9844C31.7969 10.3906 30.7188 9.38281 28.9141 9.38281H26.5L27.5312 4.25C27.6016 3.94531 27.625 3.5 27.625 3.19531C27.625 1.64844 26.6172 0.640625 24.8828 0.640625C23.0078 0.640625 21.8828 1.57812 21.5078 3.57031L20.3359 9.38281H15.0859L16.0938 4.25C16.1641 3.94531 16.2109 3.5 16.2109 3.19531C16.2109 1.64844 15.1797 0.640625 13.4453 0.640625C11.5703 0.640625 10.4453 1.57812 10.0703 3.57031L8.875 9.38281H5.99219C3.78906 9.38281 2.45312 10.6719 2.45312 12.6875C2.45312 14.2578 3.55469 15.3125 5.33594 15.3125H7.72656L6.71875 20.4922H3.85938C1.65625 20.4922 0.34375 21.7812 0.34375 23.7734C0.34375 25.3672 1.42188 26.375 3.22656 26.375H5.54688ZM12.25 21.0781L13.5391 14.6562H19.7969L18.4844 21.0781H12.25Z" fill="white" />
            <path d="M46.7266 35.5391C49.2812 35.5391 50.9922 33.875 50.9922 31.2969V5.44531C50.9922 2.49219 49.1875 0.640625 46.0938 0.640625C44.4062 0.640625 42.9531 0.828125 41.1484 2.04688L34.75 6.40625C33.5312 7.25 33.0391 8.21094 33.0391 9.45312C33.0391 11.1875 34.2812 12.4297 35.9453 12.4297C36.7656 12.4297 37.2812 12.2422 38.0547 11.7031L42.2734 8.77344H42.4375V31.2969C42.4375 33.875 44.1719 35.5391 46.7266 35.5391Z" fill="white" />
            <path d="M72.25 35.8438C81.2031 35.8438 86.7344 29.0469 86.7344 18.0078C86.7344 6.89844 81.1562 0.3125 72.25 0.3125C63.3672 0.3125 57.7422 6.92188 57.7422 18.0312C57.7422 29.0938 63.2969 35.8438 72.25 35.8438ZM72.25 29.1406C68.6875 29.1406 66.4844 25.4141 66.4844 18.0078C66.4844 10.6484 68.6875 7.01562 72.25 7.01562C75.8125 7.01562 77.9922 10.625 77.9922 18.0312C77.9922 25.4141 75.8359 29.1406 72.25 29.1406Z" fill="white" />
          </svg>
        )

      default:
        break
    }
  }

  renderChartAllTimeBestPlayers() {
    var totalWins = []
    this.props.leaderboard.forEach(function (v) {
      totalWins.push(Number(v.total_games_won))
    })
    return (
      <Card
        className="mb-4"
        style={{
          borderRadius: "15px",
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
        }}>

        <Card.Header
          as="h6"
          className="d-flex align-items-center justify-content-center font-weight-bold">
          <span>
            <span>
              All-Time Best Players
            </span>
            <Badge
              pill
              variant="default"
              className="align-text-bottom ml-1 cursor-pointer font-weight-bold">
              Total
            </Badge>
          </span>
        </Card.Header>

        <Card.Body className="p-0">
          {this.props.leaderboard && (
            <ListGroup>
              {this.props.leaderboard.slice(0, 5).map((item, index) =>

                <ListGroup.Item
                  key={index}
                  onClick={this.prevent}
                  className="px-4 py-3 border-0 card-hover bg-dark cursor-pointer">

                  <Row className="d-flex align-items-center">
                    <Col md={6} className="mb-0">
                      <div className="d-flex align-items-center">
                        <div className="text-muted small">
                          {this.onHandleRenderLeaderboardIcon(index)}
                        </div>
                        <div className="ml-5">
                          <div className="text-body text-big font-weight-bold">
                            {truncateUsername(item.user.username)}
                            <Badge pill variant="default" className="align-text-bottom ml-1 cursor-pointer">
                              {this.calcPlayerRate(item)}
                            </Badge>
                          </div>
                          <span className="text-muted text-tiny mt-0">
                            Last Updated: {moment(item.updated_at).format('DD.MM.YYYY HH:mm')}
                          </span>
                        </div>
                      </div>
                    </Col>

                    <Col md={3} className="mb-0">
                      <div className="small text-muted">
                        <span>
                          Wins/Played
                        </span>
                      </div>
                      <span className="font-weight-bold">
                        {item.total_games_won}/{item.total_games_played}
                      </span>
                    </Col>

                    <Col md={3} className="mb-0">
                      <div className="text-muted small d-flex justify-content-end align-items-center">
                        <Dropdown
                          alignRight={true}
                          className="dropdown-toggle-hide-arrow">
                          <Dropdown.Toggle
                            variant="default"
                            size="sm"
                            className="icon-btn borderless rounded-pill md-btn-flat">
                            <i className="ion ion-ios-more"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              disabled
                              onClick={this.prevent}
                              className="small">
                              Show Stats
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>

                </ListGroup.Item>
              )}
            </ListGroup>
          )}
        </Card.Body>

        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">
                Average Wins
              </div>
              <strong className="text-body">
                {this.formatInt(this.calcListAverage(totalWins))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">
                Min/Max Wins
              </div>
              <strong className="text-body">
                {this.formatInt(this.calcListMinimum(totalWins))}/{this.formatInt(this.calcListMaximum(totalWins))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    )
  }

  renderChartMostGamesPlayedPlayers() {
    var totalPlayed = []
    this.props.leaderboard.forEach(function (v) {
      totalPlayed.push(Number(v.total_games_played))
    })
    return (
      <Card
        className="mb-4"
        style={{
          borderRadius: "15px",
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
        }}>

        <Card.Header
          as="h6"
          className="d-flex align-items-center justify-content-center font-weight-bold">
          <span>
            <span>
              Most Games Played
            </span>
            <Badge
              pill
              variant="default"
              className="align-text-bottom ml-1 cursor-pointer font-weight-bold">
              Total
            </Badge>
          </span>
        </Card.Header>

        <Card.Body className="p-0">
          {this.props.leaderboard && (
            <ListGroup>
              {this.props.leaderboard
                .slice(0, 5)
                .sort((a, b) => b.total_games_played - a.total_games_played)
                .map((item, index) =>

                  <ListGroup.Item
                    key={index}
                    onClick={this.prevent}
                    className="px-4 py-3 border-0 card-hover bg-dark cursor-pointer">

                    <Row className="d-flex align-items-center">
                      <Col md={6} className="mb-0">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">
                            {this.onHandleRenderLeaderboardIcon(index)}
                          </div>
                          <div className="ml-5">
                            <div className="text-body text-big font-weight-bold">
                              {truncateUsername(item.user.username)}
                              <Badge pill variant="default" className="align-text-bottom ml-1 cursor-pointer">
                                {this.calcPlayerRate(item)}
                              </Badge>
                            </div>
                            <span className="text-muted text-tiny mt-0">
                              Last Updated: {moment(item.updated_at).format('DD.MM.YYYY HH:mm')}
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="small text-muted">
                          <span>
                            Games Played
                          </span>
                        </div>
                        <span className="font-weight-bold">
                          {item.total_games_played}
                        </span>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="text-muted small d-flex justify-content-end align-items-center">
                          <Dropdown
                            alignRight={true}
                            className="dropdown-toggle-hide-arrow">
                            <Dropdown.Toggle
                              variant="default"
                              size="sm"
                              className="icon-btn borderless rounded-pill md-btn-flat">
                              <i className="ion ion-ios-more"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                disabled
                                onClick={this.prevent}
                                className="small">
                                Show Stats
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Col>
                    </Row>

                  </ListGroup.Item>
                )}

            </ListGroup>
          )}
        </Card.Body>

        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">
                Average Games
              </div>
              <strong className="text-body">
                {this.formatInt(this.calcListAverage(totalPlayed))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">
                Min/Max Games
              </div>
              <strong className="text-body">
                {this.formatInt(this.calcListMinimum(totalPlayed))}/{this.formatInt(this.calcListMaximum(totalPlayed))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    )
  }

  renderChartMostProfitLastSessionPlayers() {
    var sessionProfits = []
    this.props.leaderboard.forEach(function (v) {
      sessionProfits.push(Number(v.session_profit))
    })
    return (
      <Card
        className="mb-4"
        style={{
          borderRadius: "15px",
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
        }}>

        <Card.Header
          as="h6"
          className="d-flex align-items-center justify-content-center font-weight-bold">
          <span>
            <span>
              Most Profit
            </span>
            <Badge
              pill
              variant="default"
              className="align-text-bottom ml-1 cursor-pointer font-weight-bold">
              Session
            </Badge>
          </span>
        </Card.Header>

        <Card.Body className="p-0">
          {this.props.leaderboard && (
            <ListGroup>
              {this.props.leaderboard
                .slice(0, 5)
                .sort((a, b) => b.session_profit - a.session_profit)
                .map((item, index) =>

                  <ListGroup.Item
                    key={index}
                    onClick={this.prevent}
                    className="px-4 py-3 border-0 card-hover bg-dark cursor-pointer">

                    <Row className="d-flex align-items-center">
                      <Col md={6} className="mb-0">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">
                            {this.onHandleRenderLeaderboardIcon(index)}
                          </div>
                          <div className="ml-5">
                            <div className="text-body text-big font-weight-bold">
                              {truncateUsername(item.user.username)}
                              <Badge
                                pill variant="default"
                                className="align-text-bottom ml-1 cursor-pointer">
                                {this.calcPlayerRate(item)}
                              </Badge>
                            </div>
                            <span className="text-muted text-tiny mt-0">
                              Last Updated: {moment(item.updated_at).format('DD.MM.YYYY HH:mm')}
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="small text-muted">
                          <span>
                            Profit Last Session
                          </span>
                        </div>
                        <span className="font-weight-bold">
                          {this.formatPrice(item.session_profit)}
                        </span>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="text-muted small d-flex justify-content-end align-items-center">
                          <Dropdown
                            alignRight={true}
                            className="dropdown-toggle-hide-arrow">
                            <Dropdown.Toggle
                              variant="default"
                              size="sm"
                              className="icon-btn borderless rounded-pill md-btn-flat">
                              <i className="ion ion-ios-more"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                disabled
                                onClick={this.prevent}
                                className="small">
                                Show Stats
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Col>
                    </Row>

                  </ListGroup.Item>
                )}

            </ListGroup>
          )}
        </Card.Body>

        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Average Profit</div>
              <strong className="text-body">
                {this.formatPrice(this.calcListAverage(sessionProfits))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Min/Max Profit</div>
              <strong className="text-body">
                {this.formatPrice(this.calcListMinimum(sessionProfits))}/{this.formatPrice(this.calcListMaximum(sessionProfits))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    )
  }

  renderChartMostActivePlayers() {
    var totalPlaytimes = []
    this.props.leaderboard.forEach(function (v) {
      totalPlaytimes.push(Number(v.total_playtime))
    })
    return (
      <Card
        className="mb-4"
        style={{
          borderRadius: "15px",
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
        }}>

        <Card.Header
          as="h6"
          className="d-flex align-items-center justify-content-center font-weight-bold">
          <span>
            <span>
              Most Active Players
            </span>
            <Badge
              pill
              variant="default"
              className="align-text-bottom ml-1 cursor-pointer font-weight-bold">
              Total
            </Badge>
          </span>
        </Card.Header>

        <Card.Body className="p-0">
          {this.props.leaderboard && (
            <ListGroup>
              {this.props.leaderboard
                .slice(0, 5)
                .sort((a, b) => b.total_playtime - a.total_playtime)
                .map((item, index) =>

                  <ListGroup.Item
                    key={index}
                    onClick={this.prevent}
                    className="px-4 py-3 border-0 card-hover bg-dark cursor-pointer">

                    <Row className="d-flex align-items-center">
                      <Col md={6} className="mb-0">
                        <div className="d-flex align-items-center">
                          <div className="text-muted small">
                            {this.onHandleRenderLeaderboardIcon(index)}
                          </div>
                          <div className="ml-5">
                            <div className="text-body text-big font-weight-bold">
                              {truncateUsername(item.user.username)}
                              <Badge pill variant="default" className="align-text-bottom ml-1 cursor-pointer">
                                {this.calcPlayerRate(item)}
                              </Badge>
                            </div>
                            <span className="text-muted text-tiny mt-0">
                              Last Updated: {moment(item.updated_at).format('DD.MM.YYYY HH:mm')}
                            </span>
                          </div>
                        </div>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="small text-muted">
                          <span>
                            Total Playtime
                          </span>
                        </div>
                        <span className="font-weight-bold">
                          {this.formatTime(item.total_playtime)}
                        </span>
                      </Col>

                      <Col md={3} className="mb-0">
                        <div className="text-muted small d-flex justify-content-end align-items-center">
                          <Dropdown
                            alignRight={true}
                            className="dropdown-toggle-hide-arrow">
                            <Dropdown.Toggle
                              variant="default"
                              size="sm"
                              className="icon-btn borderless rounded-pill md-btn-flat">
                              <i className="ion ion-ios-more"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                disabled
                                onClick={this.prevent}
                                className="small">
                                Show Stats
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Col>
                    </Row>

                  </ListGroup.Item>
                )}
            </ListGroup>
          )}

        </Card.Body>

        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">
                Average Playtime
              </div>
              <strong className="text-body">
                {this.formatTime(this.calcListAverage(totalPlaytimes))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">
                Min/Max Playtime
              </div>
              <strong className="text-body">
                {this.formatTime(this.calcListMinimum(totalPlaytimes))}/{this.formatTime(this.calcListMaximum(totalPlaytimes))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    )
  }

  formatInt(v) {
    return numeral(v).format('0,0')
  }

  formatTime(time) {
    return `${Math.floor((time / 60) / 60)} h`
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  calcListAverage(arr) {
    if (arr) {
      if (arr.length > 0) {
        return arr.reduce((a, b) => a + b, 0) / arr.length
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  calcListMaximum(arr) {
    if (arr.length > 0) {
      return Math.max(...arr)
    } else {
      return 0
    }
  }

  calcListMinimum(arr) {
    if (arr.length > 0) {
      return Math.min(...arr)
    } else {
      return 0
    }
  }

  calcPlayerRate(item) {
    var rate = Number(parseFloat((item.total_games_won / item.total_games_played) * 100).toFixed(1))
    if (isNaN(rate)) {
      return '0%'
    } else {
      return `${rate}%`
    }
  }

  showToastify(message, type) {
    toast(message, {
      type: type,
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        {/* Promotion Slider */}
        <PromotionSlider
          {...this.state} {...this.props} />
        {/* / Promotion Slider */}

        <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
          <span>Leaderboard</span>
          <span className="my-0">
            <Badge
              pill
              variant="danger"
              className="text-small font-weight-bold ml-2">
              Beta</Badge>
          </span>
          <Button
            variant="default"
            size="md"
            className="ml-auto"
            onClick={this.onRefreshLeaderboard}>
            <i className="ion ion-md-refresh text-danger mr-2"></i>
            <span>Refresh</span>
          </Button>
        </h5>

        <Row>
          <Col sm={12} md={12} lg={12} xl={6}>

            {/* All-Time Best Players */}
            {this.props.leaderboard && (
              this.renderChartAllTimeBestPlayers()
            )}
            {/* / All-Time Best Players */}

          </Col>

          <Col sm={12} md={12} lg={12} xl={6}>

            {/* Most Wins */}
            {this.props.leaderboard && (
              this.renderChartMostGamesPlayedPlayers()
            )}
            {/* / Most Wins */}

          </Col>

          <Col sm={12} md={12} lg={12} xl={6}>

            {/* Most Profit */}
            {this.props.leaderboard && (
              this.renderChartMostProfitLastSessionPlayers()
            )}
            {/* / Most Profit */}

          </Col>

          <Col sm={12} md={12} lg={12} xl={6}>

            {/* Most Active */}
            {this.props.leaderboard && (
              this.renderChartMostActivePlayers()
            )}
            {/* / Most Active */}

          </Col>
        </Row>

        {/* MinHeight Slider */}
        {this.props.leaderboard && (
          <MinHeightSlider
            {...this.state} {...this.props} />
        )}
        {/* / MinHeight Slider */}

        <h6 className="text-left text-lighter text-muted text-tiny mb-4">
          All players are ranked according to their win and loss ratio. In addition,
          the current ranking is influenced by the number of <br />games played and the maximum
          amount of winnings. The ranking list is updated after each played session.
        </h6>

        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  leaderboard: state.objects.leaderboard.items,
  avatar: state.objects.avatar,
  statistics: state.objects.profile.statistics,
  wallet: state.objects.profile.wallet,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(LeaderboardView))