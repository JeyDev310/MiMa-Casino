import React, { Component } from 'react'
import { RSButton } from 'reactsymbols-kit'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../../vendor/styles/pages/live.scss'

class NextTurnDefault extends Component {

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
        {/* NextTurn Default Action */}
        <div style={{ width: "inherit", }}>

          <RSButton
            size='large'
            value='Next Turn'
            background='linear-gradient(-1deg, rgb(0, 0, 0) 2%, rgb(41, 41, 41) 98%)'
            color="#FFFFFF"
            onContextMenu={(e) => e.preventDefault()}
            onClick={this.prevent}
            className='w-100'
            style={{
              borderRadius: "0px",
              fontVariantNumeric: "lining-nums",
              width: "inherit",
            }} />

        </div>
        {/* / NextTurn Default Action */}
      </>
    )
  }
}

export default NextTurnDefault