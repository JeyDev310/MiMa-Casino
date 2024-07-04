import React, { Component } from 'react'
import { Badge, Button, Card, Media, Modal } from 'react-bootstrap'

import API from '../../../../../api'

import {
    formatPrice,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class SwitchTable extends Component {

    constructor(props) {
        super(props)

        this.onToggleScale1Change = this.onToggleScale1Change.bind(this)
        this.onToggleScale2Change = this.onToggleScale2Change.bind(this)
        this.onHandleChangeChannel = this.onHandleChangeChannel.bind(this)
        this.onHandleGamePlayConnect = this.onHandleGamePlayConnect.bind(this)
        this.onHandleRequestPublicGames = this.onHandleRequestPublicGames.bind(this)

        this.state = {
            init: false,
            data: null,
            demo: false,
            scale1: false,
            scale2: false,
            isFetching: true,
        }
    }

    componentDidMount() {
        this.setState({
            demo: this.props.game.data.demo_mode,
        }, () => {
            this.onHandleRequestPublicGames()
        })
    }

    onHandleRequestPublicGames() {
        new Promise((resolve, reject) => {
            API.get(
                'public/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
                params: {
                    "action": 'read_public_games',
                }
            }).then(res => {
                if (res.status === 200) {
                    this.setState({
                        init: true,
                        data: res.data.filter((item) => item.table_game_id !== this.props.channelId),
                        isFetching: false,
                    })
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    onToggleScale1Change() {
        this.setState({
            scale1: !this.state.scale1,
        })
    }

    onToggleScale2Change() {
        this.setState({
            scale2: !this.state.scale2,
        })
    }

    onHandleChangeChannel(mode) {
        this.setState({
            demo: mode,
        })
    }

    onHandleGamePlayConnect(id) {
        this.props.exit()
    }

    formatStats(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "K" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
        ]
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value
        })
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
    }

    prevent(e) {
        e.preventDefault()
    }

    render() {
        return (
            <>
                {/* Switch Table Modal */}

                <Modal.Body style={{ margin: "0" }}>
                    <h4 className="text-left mb-4 font-weight-bold">Switch Table</h4>

                    <div className="text-left text-left text-white opacity-50 small mb-3">
                        This is an overview of all currently available live games offered by Live Poker Studio™. You can choose between live and demo games.
                    </div>

                    <hr className="border-light m-0 pt-2 pb-2" />

                    {/* Game Type Selector */}

                    <div className="flex-grow-0 py-0 pr-0 bg-lightest mb-3">
                        <Media className="align-items-center">
                            <Button
                                style={{
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                    borderTopRightRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                                variant={`${this.state.demo ? 'opaque1' : 'opaque2'}`}
                                className="py-1 d-flex align-items-center justify-content-center border-0 h5 mb-0 small font-weight-bold w-100"
                                disabled={false}
                                onClick={() => { this.onHandleChangeChannel(false) }}>
                                <span className="small font-weight-bold">
                                    Live Games
                                </span>
                            </Button>
                            <Button
                                style={{
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                }}
                                variant={`${this.state.demo ? 'opaque2' : 'opaque1'}`}
                                className="py-1 d-flex align-items-center justify-content-center border-0 h5 mb-0 small font-weight-bold w-100"
                                disabled={false}
                                onClick={() => { this.onHandleChangeChannel(true) }}>
                                <span className="small font-weight-bold">
                                    Free Games
                                </span>
                            </Button>
                        </Media>
                    </div>

                    {/* / Game Type Selector */}

                    {/* Available Live Games */}

                    {this.state.init && this.state.data
                        ? <>
                            {this.state.data.filter((item) => item.table_demo_mode === this.state.demo).length > 0
                                ? <>
                                    {this.state.data
                                        .filter((item) => item.table_demo_mode === this.state.demo)
                                        .filter((item) => item.table_game_id !== this.props.channelId)
                                        .sort((a, b) => { return a.table_id - b.table_id })
                                        .map((game, index) => (

                                            !game.table_demo_mode
                                                ? <Card
                                                    key={index}
                                                    className="mb-3 bg-transparent border-0">
                                                    <div className="w-100">
                                                        <span
                                                            className="text-body text-big font-weight-semibold img-thumbnail"
                                                            onClick={this.prevent}>

                                                            <span
                                                                className="img-thumbnail-overlay bg-dark opacity-25"
                                                                style={{
                                                                    borderRadius: "10px",
                                                                }}></span>

                                                            <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                                                                <Button
                                                                    variant="success rounded-pill"
                                                                    size="md"
                                                                    className="my-2 game-card-button-scale-transform-animation"
                                                                    onClick={() => {
                                                                        this.onHandleGamePlayConnect(game.table_game_id)
                                                                    }}>
                                                                    <span className="ion ion-md-play mr-2"></span>
                                                                    <span>
                                                                        Switch Table
                                                                    </span>
                                                                </Button>
                                                            </span>

                                                            <span
                                                                className="card-img-top d-block ui-rect-50 ui-bg-cover"
                                                                style={{
                                                                    borderRadius: "10px",
                                                                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0008.jpg')`,
                                                                    objectFit: "cover",
                                                                    height: "160px",
                                                                }}>

                                                                <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                                                                    <div className="flex-shrink-1">
                                                                        <div className="text-big">
                                                                            <Badge
                                                                                variant="dark"
                                                                                pill
                                                                                className="font-weight-bold">
                                                                                <i className="fas fa-user-circle text-danger mr-1"></i>
                                                                                {`${game.table_live_players}/${game.table_max_players} Players`}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                                                    <div className="flex-shrink-1">
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            <i className="fas fa-wifi" />
                                                                            <span className="ml-2">
                                                                                Live
                                                                            </span>
                                                                        </Badge>
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            <i className="fas fa-eye" />
                                                                            <span className="ml-2">
                                                                                {this.formatStats(game.table_view_stats.hits)}
                                                                            </span>
                                                                        </Badge>
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            Table {game.table_id}
                                                                        </Badge>
                                                                    </div>

                                                                    <div className="text-big">
                                                                        <Badge
                                                                            variant="dark"
                                                                            pill
                                                                            className="font-weight-bold">
                                                                            {formatPrice(game.table_small_blind)}/{formatPrice(game.table_big_blind)}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </span>

                                                        </span>
                                                    </div>
                                                </Card>
                                                : <Card
                                                    key={index}
                                                    className="mb-3 bg-transparent border-0">
                                                    <div className="w-100">
                                                        <span
                                                            className="text-body text-big font-weight-semibold img-thumbnail"
                                                            onClick={this.prevent}>

                                                            <span
                                                                className="img-thumbnail-overlay bg-dark opacity-25"
                                                                style={{
                                                                    borderRadius: "10px",
                                                                }}></span>

                                                            <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                                                                <Button
                                                                    variant="success rounded-pill"
                                                                    size="md"
                                                                    className="my-2 game-card-button-scale-transform-animation"
                                                                    onClick={() => {
                                                                        this.onHandleGamePlayConnect(game.table_game_id)
                                                                    }}>
                                                                    <span className="ion ion-md-play mr-2"></span>
                                                                    <span>
                                                                        Switch Table
                                                                    </span>
                                                                </Button>
                                                            </span>

                                                            <span
                                                                className="card-img-top d-block ui-rect-50 ui-bg-cover"
                                                                style={{
                                                                    borderRadius: "10px",
                                                                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0008.jpg')`,
                                                                    objectFit: "cover",
                                                                    height: "160px",
                                                                }}>

                                                                <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                                                                    <div className="flex-shrink-1">
                                                                        <div className="text-big">
                                                                            <Badge
                                                                                variant="dark"
                                                                                pill
                                                                                className="font-weight-bold">
                                                                                <i className="fas fa-user-circle text-danger mr-1"></i>
                                                                                {`${game.table_live_players}/${game.table_max_players} Players`}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                                                    <div className="flex-shrink-1">
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            <i className="fas fa-wifi" />
                                                                            <span className="ml-2">
                                                                                Live
                                                                            </span>
                                                                        </Badge>
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            <i className="fas fa-eye" />
                                                                            <span className="ml-2">
                                                                                {this.formatStats(game.table_view_stats.hits)}
                                                                            </span>
                                                                        </Badge>
                                                                        <Badge
                                                                            pill variant="default"
                                                                            className="mr-1 font-weight-bold">
                                                                            Table {game.table_id}
                                                                        </Badge>
                                                                    </div>

                                                                    <div className="text-big">
                                                                        <Badge
                                                                            variant="dark"
                                                                            pill
                                                                            className="font-weight-bold">
                                                                            {formatPrice(game.table_small_blind)}/{formatPrice(game.table_big_blind)}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </span>

                                                        </span>
                                                    </div>
                                                </Card>
                                        ))}
                                </>
                                : <>
                                    <Card
                                        className="mb-3 bg-transparent border-0">
                                        <div className="w-100">
                                            <span
                                                className="text-body text-big font-weight-semibold img-thumbnail"
                                                onClick={this.prevent}>
                                                <span
                                                    className="img-thumbnail-overlay bg-dark opacity-25"
                                                    style={{
                                                        borderRadius: "10px",
                                                    }}></span>

                                                <span
                                                    className="img-thumbnail-content text-white text-xlarge"
                                                    style={{ borderRadius: "10px !important", }}>
                                                    <Button
                                                        variant="instagram rounded-pill"
                                                        size="md"
                                                        className="my-2 game-card-button-scale-transform-animation"
                                                        onClick={this.prevent}>
                                                        <span className="fas fa-times mr-2"></span>
                                                        <span>
                                                            No Games
                                                        </span>
                                                    </Button>
                                                </span>

                                                <span
                                                    className="card-img-top d-block ui-rect-50 ui-bg-cover"
                                                    style={{
                                                        filter: "blur(3px)",
                                                        borderRadius: "10px",
                                                        backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0008.jpg')`,
                                                        objectFit: "cover",
                                                        height: "160px",
                                                    }}>

                                                    <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                                                        <div className="flex-shrink-1">
                                                            <div className="text-big">
                                                                <Badge
                                                                    variant="dark"
                                                                    pill
                                                                    className="font-weight-bold">
                                                                    <i className="fas fa-user-circle text-danger mr-1"></i>
                                                                    0/0 Players
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                                        <div className="flex-shrink-1">
                                                            {['Online', 'Live Game'].map(tag =>
                                                                <Badge
                                                                    variant="default"
                                                                    pill key={tag}
                                                                    className="mr-1 font-weight-bold">
                                                                    {tag}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-big">
                                                            <Badge
                                                                pill variant="dark"
                                                                className="font-weight-bold">
                                                                {formatPrice(0)}/{formatPrice(0)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </span>
                                            </span>
                                        </div>
                                    </Card>
                                </>}
                        </>
                        : <>
                            <Card className="mb-3 bg-transparent border-0">
                                <div className="w-100">
                                    <span
                                        className="text-body text-big font-weight-semibold img-thumbnail"
                                        onClick={this.prevent}>

                                        <span
                                            className="img-thumbnail-overlay bg-dark opacity-25"
                                            style={{
                                                borderRadius: "10px",
                                            }}></span>

                                        <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                                            <Button
                                                variant="instagram rounded-pill"
                                                size="md"
                                                className="my-2 game-card-button-scale-transform-animation"
                                                onClick={this.prevent}
                                                disabled={true}>
                                                <span className="ion ion-md-play mr-2"></span>
                                                <span>
                                                    Switch Table
                                                </span>
                                            </Button>
                                        </span>

                                        <span
                                            className="card-img-top d-block ui-rect-50 ui-bg-cover"
                                            style={{
                                                borderRadius: "10px",
                                                backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0008.jpg')`,
                                                objectFit: "cover",
                                                height: "160px",
                                            }}>

                                            <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                                                <div className="flex-shrink-1">
                                                    <div className="text-big">
                                                        <Badge
                                                            variant="dark"
                                                            pill
                                                            className="font-weight-bold">
                                                            <i className="fas fa-user-circle text-danger mr-1"></i>
                                                            {`0/6 Players`}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                                <div className="flex-shrink-1">
                                                    {['Not Available'].map(tag =>
                                                        <Badge
                                                            variant="primary"
                                                            pill key={tag}
                                                            className="mr-1 font-weight-bold">
                                                            {tag}
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="text-big">
                                                    <Badge
                                                        variant="dark"
                                                        pill
                                                        className="font-weight-bold">
                                                        {formatPrice(0)}/{formatPrice(0)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </span>

                                    </span>
                                </div>
                            </Card>
                        </>}

                    {/* / Available Live Games */}

                    <hr className="border-light m-0 py-2" />

                    <Button
                        variant="instagram" block
                        onClick={this.props.close}
                        className="font-weight-bold">
                        Continue
                    </Button>

                    <Button
                        variant="default" block
                        onClick={this.onHandleRequestPublicGames}
                        className="font-weight-bold">
                        Refresh
                    </Button>

                </Modal.Body>

                {/* / Switch Table Modal */}
            </>
        )
    }
}

export default SwitchTable