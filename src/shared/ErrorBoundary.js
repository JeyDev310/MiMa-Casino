import { Component } from 'react'
import history from '../history'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            init: false,
        }

        this.history = history()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            if (
                this.props.error.response &&
                this.props.error.response.status === 401
            ) {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }
        }
    }

    prevent(e) {
        e.preventDefault()
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, {})(ErrorBoundary))