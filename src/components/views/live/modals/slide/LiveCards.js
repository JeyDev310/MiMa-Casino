import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, Form, InputGroup, Media, Modal, Row, Spinner, SplitButton } from 'react-bootstrap'

import {
    MSG_TYPE_DEALER_START_SHUFFLE_LIVE_FALSE,
    MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE,
    MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS,
    MSG_TYPE_DEALER_PROCESS_START_NEW_GAME,
    MSG_TYPE_DEALER_RESUME_GAME,
    MSG_TYPE_DEALER_NEXT_PLAYER,
    MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
    MSG_TYPE_DEALER_HARD_RESET,
    MSG_TYPE_DEALER_DISCONNECT_ALL,
    MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
} from '../../core/DealerActionTypes'

import {
    formatPrice,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class LiveCardsMonitor extends Component {

    constructor(props) {
        super(props)

        this.myInputRef = React.createRef()

        this.sendMessage = this.sendMessage.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
        this.sendRandomCardTest = this.sendRandomCardTest.bind(this)
        this.onHandleSubmitInput = this.onHandleSubmitInput.bind(this)
        this.onHandleReceiveInput = this.onHandleReceiveInput.bind(this)
        this.onHandleReceiveNewCard = this.onHandleReceiveNewCard.bind(this)

        this.state = {
            init: false,
            input: '',
            cseq: [],
            hseq: {},
        }
    }

    componentDidMount() {
        if (this.props.game.cards) {
            this.setState({
                init: true,
            }, () => {
                this.onHandleReceiveNewCard()
            })
        } else {
            this.setState({
                init: false,
            })
        }
        setTimeout(() => {
            this.myInputRef.current.focus()
        }, 1)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.game.cards !== this.props.game.cards) {
            if (this.props.game.cards) {
                this.setState({
                    init: true,
                }, () => {
                    this.onHandleReceiveNewCard()
                })
            } else {
                this.setState({
                    init: false,
                })
            }
        }
    }

    sendMessage(action) {
        this.props.client.sendDealerAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            action,
            JSON.stringify([]),
        )
    }

    sendRandomCardTest() {
        this.props.client.sendDealerAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
            JSON.stringify(String(this.getRandomInt(1, 52))),
        )
    }

    onHandleReceiveNewCard() {
        this.setState({
            cseq: this.props.game.cards.manifest.community_cards,
            hseq: this.props.game.cards.manifest.hole_cards,
        })
    }

    getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

    onHandleReceiveInput(e) {
        this.setState({
            input: e.target.value,
        })
    }

    onHandleSubmitInput(target) {
        if (target.charCode === 13) {
            let currentInput = this.state.input
            this.setState({
                input: '',
            }, () => {
                // this.props.client.sendDealerAction(
                //     this.props.game.data.room_name,
                //     this.props.game.data.current_round,
                //     MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
                //     JSON.stringify(String(this.getRandomInt(1, 52))),
                // )
                console.log(currentInput)
            })
        }
    }

    prevent(e) {
        e.preventDefault()
    }

    render() {
        return (
            <>
                {/* Live Cards Monitor Modal */}

                <Modal.Body style={{ margin: "0" }}>
                    <h4 className="text-left mb-4 font-weight-bold">Live Cards Monitor</h4>

                    <hr className="border-light m-0 pt-2 pb-2" />

                    <Card className="mb-3 bg-dark" style={{ borderRadius: "15px", }}>
                        <Card.Header as="h6" className="with-elements pr-0">
                            <div className="card-header-title d-flex align-items-center">
                                <span>
                                    <Badge variant={`${this.props.game.connection === "connected" ? "success" : "danger"} badge-dot indicator`} />
                                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                            <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="white" />
                                            <path d="M12.0006 11.1542C13.1434 11.1542 14.0777 10.22 14.0777 9.0771C14.0777 7.93424 13.1434 7 12.0006 7C10.8577 7 9.92348 7.93424 9.92348 9.0771C9.92348 10.22 10.8577 11.1542 12.0006 11.1542Z" fill="white" />
                                            <path d="M15.5652 13.814C15.5108 13.6779 15.4382 13.551 15.3566 13.4331C14.9393 12.8163 14.2954 12.4081 13.5697 12.3083C13.479 12.2993 13.3793 12.3174 13.3067 12.3718C12.9257 12.653 12.4722 12.7981 12.0006 12.7981C11.5289 12.7981 11.0754 12.653 10.6944 12.3718C10.6219 12.3174 10.5221 12.2902 10.4314 12.3083C9.70578 12.4081 9.05272 12.8163 8.64456 13.4331C8.56293 13.551 8.49036 13.687 8.43595 13.814C8.40875 13.8684 8.41781 13.9319 8.44502 13.9864C8.51759 14.1133 8.60828 14.2403 8.68991 14.3492C8.81689 14.5215 8.95295 14.6757 9.10715 14.8208C9.23413 14.9478 9.37925 15.0657 9.52439 15.1836C10.2409 15.7188 11.1026 15.9999 11.9915 15.9999C12.8804 15.9999 13.7421 15.7188 14.4586 15.1836C14.6038 15.0748 14.7489 14.9478 14.8759 14.8208C15.021 14.6757 15.1661 14.5215 15.2931 14.3492C15.3838 14.2312 15.4655 14.1133 15.538 13.9864C15.5833 13.9319 15.5924 13.8684 15.5652 13.814Z" fill="white" />
                                        </svg>
                                    </span>
                                </span>
                                <span className="ml-2">
                                    {this.props.game.profile
                                        ? <h5 className="mb-0 h6 mb-0 d-flex">
                                            <Badge className="ml-0 h5 mb-0 font-weight-bold" pill variant="success">Connected</Badge>
                                            <Badge className="ml-1 h5 mb-0 font-weight-semibold" pill variant="default">{this.props.game.profile.email}</Badge>
                                        </h5>
                                        : <h5 className="mb-0 h6 mb-0">
                                            <strong>N/A</strong>
                                        </h5>
                                    }
                                </span>
                            </div>

                            <div className="card-header-elements ml-auto">
                                <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
                                    <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                                        <i className="ion ion-ios-more"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => { this.prevent(e) }}>
                                            <span className="font-weight-bold small">Refresh Connection</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>

                        <Card.Body className="d-flex justify-content-between align-items-center p-4" style={{
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.4)",
                        }}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text
                                        className="font-weight-bold text-tiny">
                                        Live
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    ref={this.myInputRef}
                                    autoFocus
                                    placeholder=""
                                    value={this.state.input}
                                    onChange={(e) => { this.onHandleReceiveInput(e) }}
                                    onKeyPress={(e) => { this.onHandleSubmitInput(e) }} />
                            </InputGroup>
                        </Card.Body>

                        <Card.Footer className="small text-muted">
                            System is ready.
                        </Card.Footer>
                    </Card>

                    <hr className="border-light m-0 pt-2 pb-2" />

                    <Card className="mb-3 bg-light" style={{ borderRadius: "15px", }}>
                        <Card.Header as="h6" className="with-elements pr-0">
                            <div className="card-header-title font-weight-bold small d-flex align-items-center">Community Cards</div>
                            <div className="card-header-elements ml-auto">
                                <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
                                    <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                                        <i className="ion ion-ios-more"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => { this.prevent(e) }}>
                                            <span className="font-weight-bold small">Refresh Cards</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.sendRandomCardTest() }}>
                                            <span className="font-weight-bold small">Send Random Card</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>

                        {this.state.init
                            ? <Card.Body className="d-flex justify-content-between align-items-center px-3 py-4" style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                            }}>
                                <div className="d-flex position-relative px-2">
                                    {this.state.cseq.map((card, index) =>
                                        <img
                                            key={index}
                                            src={`${process.env.PUBLIC_URL}/svg/cards/${card ? card : 'X'}.svg`}
                                            className={`d-block ui-w-50 ${this.state.cseq.length === index + 1 ? "mr-0" : "mr-2"}`}
                                            alt={card ? card : 'X'} />
                                    )}
                                </div>
                            </Card.Body>
                            : <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                                <Row noGutters className="row-bordered h-100 border-0 shadow-none mb-3">
                                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                                        <Spinner animation="border" variant="danger" className="d-block" style={{ height: "2rem", width: "2rem", }} />
                                    </Col>
                                </Row>

                                <div className={`text-center text-white opacity-75 mb-0 font-weight-bold small`}>Community cards currently not available...</div>
                            </Card>}

                        <Card.Footer className="small text-muted">
                            Community cards currently not available.
                        </Card.Footer>
                    </Card>

                    <Card className="mb-3 bg-light" style={{ borderRadius: "15px", }}>
                        <Card.Header as="h6" className="with-elements pr-0">
                            <div className="card-header-title font-weight-bold small d-flex align-items-center">Hole Cards</div>
                            <div className="card-header-elements ml-auto">
                                <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
                                    <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                                        <i className="ion ion-ios-more"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => { this.prevent(e) }}>
                                            <span className="font-weight-bold small">Refresh Cards</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.sendRandomCardTest() }}>
                                            <span className="font-weight-bold small">Send Random Card</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Card.Header>

                        {this.state.init
                            ? <React.Fragment>

                                {Object.keys(this.state.hseq).map((player, index) =>
                                    <Card.Body key={index} className="d-flex align-items-center px-3 py-2" style={{
                                        alignItems: "center",
                                        backgroundColor: `${index % 2 ? "rgba(37, 40, 46, 0.1)" : "rgba(37, 40, 46, 0.4)"}`,
                                    }}>
                                        <div className="d-flex position-relative px-2">
                                            {this.state.hseq[player].map((card, index) =>
                                                <img
                                                    key={index}
                                                    src={`${process.env.PUBLIC_URL}/svg/cards/${card ? card : 'X'}.svg`}
                                                    className={`d-block ui-w-30 ${this.state.hseq[player].length === index + 1 ? "mr-0" : "mr-1"}`}
                                                    alt={card ? card : 'X'} />
                                            )}
                                        </div>

                                        <div className="px-2 ml-2">
                                            <div className="font-weight-bold">{player}</div>
                                            <div className="small opacity-50 font-weight-bold">HOLE CARDS</div>
                                        </div>
                                    </Card.Body>
                                )}

                            </React.Fragment>
                            : <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                                <Row noGutters className="row-bordered h-100 border-0 shadow-none mb-3">
                                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                                        <Spinner animation="border" variant="danger" className="d-block" style={{ height: "2rem", width: "2rem", }} />
                                    </Col>
                                </Row>

                                <div className={`text-center text-white opacity-75 mb-0 font-weight-bold small`}>Hole cards currently not available...</div>
                            </Card>}

                        <Card.Footer className="small text-muted">
                            Hole cards currently not available.
                        </Card.Footer>
                    </Card>

                    <hr className="border-light m-0 pt-2 pb-2" />

                    <Row className="mb-3">
                        <Col sm={12} md={12} lg={12} className="d-flex justify-content-between">
                            <SplitButton variant="primary" title={<span className="font-weight-bold h6 mb-0 small">Create New Action</span>} alignRight={false}>
                                <Dropdown.Header>Game Analysis</Dropdown.Header>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS) }}>Get Player Data</Dropdown.Item>
                                <Dropdown.Header>Pre Game Actions</Dropdown.Header>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_START_SHUFFLE_LIVE_FALSE) }}>Start Shuffle (System)</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE) }}>Start Shuffle (Live)</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_PROCESS_START_NEW_GAME) }}>Start Game</Dropdown.Item>
                                <Dropdown.Header>Mid Game Actions</Dropdown.Header>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_RESUME_GAME) }}>Resume Game</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA) }}>Start Showdown</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>Player Handling</Dropdown.Header>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_NEXT_PLAYER) }}>Skip Player</Dropdown.Item>
                                <Dropdown.Header>Error Handling</Dropdown.Header>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_HARD_RESET) }}>Reset Game</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.sendMessage(MSG_TYPE_DEALER_DISCONNECT_ALL) }}>Disconnect All</Dropdown.Item>
                            </SplitButton>
                        </Col>
                    </Row>

                    <div className="mb-0 list-group pt-0 pb-3">
                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`} style={{
                            padding: "10px",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            alignItems: "center",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                                    <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Potsize</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.total_pot)}</h5>
                        </span>

                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                            padding: "10px",
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.8)",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                                    <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Small Blind</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_small_blind)}</h5>
                        </span>

                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                            padding: "10px",
                            alignItems: "center",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                                    <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Big Blind</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_big_blind)}</h5>
                        </span>

                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                            padding: "10px",
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.8)",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 22H3C2.4 22 2 21.6 2 21C2 20.4 2.4 20 3 20H21C21.6 20 22 20.4 22 21C22 21.6 21.6 22 21 22ZM11 6.59998V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V6.59998H11Z" fill="white" />
                                    <path opacity="0.3" d="M7 6.59999H17L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L7 6.59999Z" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Raise Level</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.raise_level)}</h5>
                        </span>

                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                            padding: "10px",
                            alignItems: "center",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z" fill="white" />
                                    <path d="M6.2238 13.2561C5.54282 12.5572 5.54281 11.4429 6.22379 10.7439L10.377 6.48107C10.8779 5.96697 11.75 6.32158 11.75 7.03934V16.9607C11.75 17.6785 10.8779 18.0331 10.377 17.519L6.2238 13.2561Z" fill="white" />
                                    <rect opacity="0.3" x="2" y="4" width="2" height="16" rx="1" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Buy-In Minimum</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}</h5>
                        </span>

                        <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                            padding: "10px",
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.8)",
                            borderBottomLeftRadius: "15px",
                            borderBottomRightRadius: "15px",
                        }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                                    <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="white" />
                                </svg>
                            </span>

                            <Media.Body className="ml-3">
                                <span className="text-medium font-weight-medium h6">Game Id</span>
                            </Media.Body>
                            <h5 className="mb-0 font-weight-bold small">{this.props.game.profile.game_id}</h5>
                        </span>
                    </div>

                    <hr className="border-light m-0 py-2" />

                    <Button variant="primary" block onClick={this.props.close}>Continue</Button>
                </Modal.Body>

                {/* Live Cards Monitor Modal */}
            </>
        )
    }
}

export default LiveCardsMonitor