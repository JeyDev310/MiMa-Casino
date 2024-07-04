import React, { Component } from 'react'
import { Card, Collapse, Button, Media, Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class FrequentlyAskedQuestions extends Component {

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
                {/* Frequently Asked Questions Modal */}

                <Modal.Body style={{ margin: "0" }}>
                    <h4 className="text-left mb-4 font-weight-bold">Frequently Asked Questions</h4>

                    <div className="text-left text-left text-white opacity-50 small mb-3">
                        Get answers to the most frequently asked questions about this game. Contact our support channel if you have any further questions or technical problems.
                    </div>

                    <hr className="border-light m-0 pt-2 pb-2" />

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 1)}
                                aria-expanded={this.props.supportTab === 1}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Playing with Friends or Family</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 1}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        We're happy to let friends and relatives play at the same tables as each other.
                                        <br /><br />
                                        Here's a reminder of our rules:
                                        <br />
                                        (1) You can't share your account with anyone else. Using multiple accounts is also forbidden;
                                        <br /><br />
                                        (2) You're expected to play just as competitively against your friends as you would against any other player, and you can't share any information about your game or make any secret agreements. Doing so is collusion, which is also forbidden;
                                        <br /><br />
                                        (3) If you have an agreement to share a bankroll or split profits with your friend, then in the interest of fairness, you're not allowed to play at the same cash game table or in the same Sit & Go;
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 2)}
                                aria-expanded={this.props.supportTab === 2}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Table Live Chat</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 2}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        When you're seated at a table, select the Chat tab and type your messages in the field below. Just hit Enter and your message will appear at the table. If you're using a mobile, tap the chat box which will then expand on the screen and allow you to type your messages.
                                        <br />
                                        <br />
                                        There are certain restrictions in place to ensure players are not distracted:
                                        <br /><br />
                                        (1) Chat will sometimes not work during important stages of tournaments or hands where a player is all-in;
                                        <br /><br />
                                        (2) Chat by observers is not allowed at Play Money tables;
                                        <br /><br />
                                        (3) Observers cannot chat at real money tables unless they have enough funds in their account to pay for a buy-in at that table;
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 3)}
                                aria-expanded={this.props.supportTab === 3}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Min/Max Buy-Ins</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 3}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        All cash games are played with money at stake. You can only use the funds that you brought to the table before a hand begins. For No Limit and Pot Limit games, the minimum buy-in is 40 times the big blind. The maximum buy-in is 100 times the big blind. For example, in a standard $1/$2 NL game, the minimum buy-in is $80, and the maximum is $200. The minimum and maximum buy-ins may vary depending on the table. You’ll receive notification of these differences when you join a table.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 4)}
                                aria-expanded={this.props.supportTab === 4}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Server Crash</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 4}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        All transactions, including pots won and lost, are posted to your account at the completion of each game session. In the event of a server crash that prevents completion of a hand or session, the hands in progress at every table will be restored by rolling back these hands as if they had not happened.
                                        <br /><br />
                                        If a crash for any reason causes a hand to be incompletely recorded in our database, all of that hand's participants’ accounts will be restored to the way they were at the beginning of the hand. Such a hand shall be declared a misdeal, with all associated blinds, antes and bets returned to the players.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 5)}
                                aria-expanded={this.props.supportTab === 5}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Waiting for Big Blind</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 5}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        If you sit down at a table and decide to sit in before you are the big blind, you will be asked to pay the big blind as it is your first round and paying this big blind is mandatory.
                                        <br /><br />
                                        However, if you take a seat but remain sitting out for an entire orbit or more, when you come back and decide to play your first hand, if you're not in the big blind or small blind, you will be asked to pay both big and small blinds.
                                        <br /><br />
                                        The difference in the scenarios is the amount of time that you have been sitting out. If you have been actively participating at the table, then decide to sit out for an orbit or more, then finally return in a non-blind position, you will have to pay both the big and small blind. This is standard practice in most live and online games.
                                        <br /><br />
                                        When you sit out of an entire orbit, we deem you as occupying a seat for an entire orbit and to enter the game you must pay both your blinds.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 6)}
                                aria-expanded={this.props.supportTab === 6}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Moving Button System</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 6}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        We use a forward moving button system as opposed to the dead button system.
                                        <br /><br />
                                        This system works by moving the button to the next player on the left regardless of eliminations. There will always be a small and big blind in every hand (there is never a dead small). Heads-up play will proceed the same way (by moving the button to the next player on the left).
                                        <br /><br />
                                        This system is widely used in many brick and mortar casinos.
                                        <br /><br />
                                        When making this decision, we had to consider that online rooms are much more dynamic than their live counterparts. This is because online, players will join and leave games much more often. A table can go from 9 players to 2 players, and then back again in just a few moments.
                                        <br /><br />
                                        The dead button system would result in more peculiar situations than the forward moving button in this environment.
                                        <br /><br />
                                        A forward moving button system can result in you skipping the big blind for a round. This happens when you were under the gun and the player who was the big blind leaves the table or is eliminated. In this instance, the button moves forward, and whereas you were going to be posting a big blind, you are now effectively the small blind.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 7)}
                                aria-expanded={this.props.supportTab === 7}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">What is Rake?</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 7}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        Rake is a small fee we charge for providing our services. In Cash Games, rake depends on the stakes, game type, and the number of players at the table. At lower limits, we take a smaller rake that will never exceed a capped amount. We also don’t take a rake if no flop is dealt, also known as "no flop, no drop".
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 8)}
                                aria-expanded={this.props.supportTab === 8}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Sending a Screenshot of an Error or Malfunction affecting our Software</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 8}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        If you're getting an error message or seeing an issue while using our software, get in touch with us. Sending a screenshot (showing the full screen) to our Support Team may help us resolve the issue. Screenshot instructions for various devices are available from the take-a-screenshot.org website. You can forward the screenshot to us via our software, mobile app, or website.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 9)}
                                aria-expanded={this.props.supportTab === 9}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Time Frame to Receive Withdrawals</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 9}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        Once we approve a credit or debit card withdrawal, it can sometimes take up to 10 business days for your card issuing company to make the funds available to you.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <Card className="mb-3 bg-light">
                        <Card.Header>
                            <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                                onClick={e => this.props.change(e, 'supportTab', 10)}
                                aria-expanded={this.props.supportTab === 10}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                        <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                    </svg>
                                </span>
                                <div className="w-100 d-flex align-items-center ml-3">
                                    <div className="h6 mb-0 w-100">
                                        <div className="font-weight-bold">Contact Us</div>
                                    </div>
                                    <div className="opacity-75">
                                        <div>FAQ</div>
                                    </div>
                                </div>
                            </span>
                        </Card.Header>

                        <Collapse in={this.props.supportTab === 10}>
                            <div>
                                <Card.Body className="mb-0">
                                    <span className="h6 mb-0 small">
                                        If you've got questions, the fastest way to get answers is through our Help Bot. If our Help Bot isn't available where you are, you can always reach us via our Contact Support form.
                                    </span>
                                </Card.Body>

                                <hr className="border-light m-0" />

                                <Card.Body>
                                    <Media>
                                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                                <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
                                            </svg>
                                        </span>
                                        <Media.Body className="ml-3">
                                            <span className="h6 mb-0">Did this article answer your question?</span>
                                            <div>
                                                <span className="text-muted mr-2">Feedback</span>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-up mr-2"></span></a>
                                                <a href="#d" onClick={this.prevent} className="text-light"><span className="ion ion-ios-thumbs-down"></span></a>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    <hr className="border-light m-0 py-2" />

                    <Button variant="instagram" block onClick={this.props.close} className="font-weight-bold">Continue</Button>
                </Modal.Body>

                {/* / Frequently Asked Questions Modal */}
            </>
        )
    }
}

export default FrequentlyAskedQuestions