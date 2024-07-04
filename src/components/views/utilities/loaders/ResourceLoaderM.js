import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/loaders/loader14/light/SVG/data.json'

class ResourceLoaderM extends Component {

    constructor(props) {
        super(props)

        this.state = {
            init: false,
        }
    }

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            }
        }

        return <div>
            <Lottie
                options={defaultOptions}
                height={this.props.height}
                width={this.props.width} />
        </div>
    }
}

export default ResourceLoaderM