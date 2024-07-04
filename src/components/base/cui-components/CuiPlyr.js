import React, { Component } from 'react'

import Plyr from 'plyr'
import '../vendor/libs/plyr/plyr.scss'

class CuiPlyr extends Component {
  componentDidMount() {
    this.videoPlayer = new Plyr('#plyr-video-player')
    this.audioPlayer = new Plyr('#plyr-audio-player')
  }

  componentWillUnmount() {
    this.videoPlayer && this.videoPlayer.destroy()
    this.audioPlayer && this.audioPlayer.destroy()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    return (
      <div className="ui-block">
        <h3 className="ui-block-heading">plyr</h3>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/sampotts/plyr" className="ui-block-description">https://github.com/sampotts/plyr</a>

        <div className="no-ie10" data-name="Plyr"></div>

        <h4 className="ui-block-heading">Examples</h4>

        {!isIE10Mode && <div className="cui-example cui-example-vertical-spacing">
          <div id="plyr-video-player" data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>

          <audio id="plyr-audio-player" controls>
            <source src={`${process.env.PUBLIC_URL}/audio/Water_Lily.mp3`} type="audio/mp3" />
          </audio>
        </div>}
      </div>
    )
  }
}

export default CuiPlyr
