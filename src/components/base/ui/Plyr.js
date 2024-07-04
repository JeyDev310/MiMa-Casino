import React, { Component } from 'react'

import Plyr from 'plyr'
import '../../vendor/libs/plyr/plyr.scss'

class PlyrComponent extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Plyr - UI elements')
  }

  componentDidMount() {
    this.videoPlayer = new Plyr('#plyr-video-player')
    this.audioPlayer = new Plyr('#plyr-audio-player')
  }

  componentWillUnmount() {
    if (this.videoPlayer) {
      this.videoPlayer.destroy()
      this.videoPlayer = null
    }
    if (this.audioPlayer) {
      this.audioPlayer.destroy()
      this.audioPlayer = null
    }
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">UI elements /</span> Plyr
        </h4>

        {isIE10Mode && <div className="alert alert-danger">
          Plyr doesn't support IE10.
        </div>}

        {!isIE10Mode && <div className="demo-vertical-spacing">
          <div id="plyr-video-player" data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>

          <audio id="plyr-audio-player" controls>
            <source src={`${process.env.PUBLIC_URL}/audio/Water_Lily.mp3`} type="audio/mp3" />
          </audio>
        </div>}
      </div>
    )
  }
}

export default PlyrComponent
