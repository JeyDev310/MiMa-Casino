import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/loaders/loader12/primary/SVG/data.json'

class ResourceLoaderS extends Component {

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

        return <div className="pb-0">
            <Lottie
                options={defaultOptions}
                height={this.props.height}
                width={this.props.width} />
        </div>
    }
}

export default ResourceLoaderS