import React, { Component, useRef } from 'react'
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap'

import { RSButton } from 'reactsymbols-kit'
import PerfectScrollbar from 'react-perfect-scrollbar'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

const EMOJI_LIST = [
  ['grinning face', '0x1F600'],
  ['grinning face with big eyes', '0x1F603'],
  ['grinning face with smiling eyes', '0x1F604'],
  ['beaming face with smiling eyes', '0x1F601'],
  ['grinning squinting face', '0x1F606'],
  ['grinning face with sweat', '0x1F605'],
  ['rolling on the floor laughing', '0x1F923'],
  ['face with tears of joy', '0x1F602'],
  ['slightly smiling face', '0x1F642'],
  ['upside-down face', '0x1F643'],
  ['winking face', '0x1F609'],
  ['smiling face with smiling eyes', '0x1F60A'],
  ['smiling face with halo', '0x1F607'],
  ['confused face', '0x1F615'],
  ['worried face', '0x1F61F'],
  ['slightly frowning face', '0x1F641'],
  ['face with open mouth', '0x1F62E'],
  ['astonished face', '0x1F632'],
  ['flushed face', '0x1F633'],
  ['face with symbols on mouth', '0x1F92C'],
  ['face screaming in fear', '0x1F631'],
  ['loudly crying face', '0x1F62D'],
  ['anxious face with sweat', '0x1F630'],
  ['fearful face', '0x1F628'],
  ['frowning face with open mouth', '0x1F626'],
  ['face with steam from nose', '0x1F624'],
  ['vulcan salute', '0x1F596'],
  ['hand with fingers splayed', '0x1F590'],
  ['raised back of hand', '0x1F91A'],
  ['waving hand', '0x1F44B'],
  ['zzz', '0x1F4A4'],
  ['ok hand', '0x1F44C'],
  ['victory hand', '0x270C'],
  ['crossed fingers', '0x1F91E'],
  ['love-you gesture', '0x1F91F'],
  ['sign of the horns', '0x1F918'],
  ['call me hand', '0x1F919'],
  ['backhand index pointing left', '0x1F448'],
  ['backhand index pointing right', '0x1F449'],
  ['backhand index pointing up', '0x1F446'],
  ['middle finger', '0x1F595'],
  ['backhand index pointing down', '0x1F447'],
  ['index pointing up', '0x261D'],
  ['thumbs up', '0x1F44D'],
  ['thumbs down', '0x1F44E'],
  ['raised fist', '0x270A'],
  ['oncoming fist', '0x1F44A'],
  ['clapping hands', '0x1F44F'],
  ['handshake', '0x1F91D'],
  ['palms up together', '0x1F932'],
  ['open hands', '0x1F450'],
  ['folded hands', '0x1F64F'],
  ['hourglass done', '0x231B'],
  ['hourglass not done', '0x23F3'],
  ['alarm clock', '0x23F0'],
  ['high voltage', '0x26A1'],
  ['christmas tree', '0x1F384'],
  ['fireworks', '0x1F386'],
  ['firecracker', '0x1F9E8'],
  ['party', '0x1F389'],
  ['confetti ball', '0x1F38A'],
  ['military medal', '0x1F396'],
  ['trophy', '0x1F3C6'],
  ['flexed biceps', '0x1F4AA'],
  ['ear', '0x1F442'],
  ['brain', '0x1F9E0'],
]

const Emoji = React.memo(({ className, label, symbol }) =>
  <span className={className} role="img" aria-label={label} style={{
    fontSize: "1.6rem",
  }}>
    {String.fromCodePoint(symbol)}
  </span>
)

const EmojiSearchboxToggle = React.forwardRef(({
  props,
  onClick,
}, ref) => (
  <>
    <span
      ref={ref}>
      <RSButton
        size='medium'
        value=''
        background='rgba(43, 43, 51, 0)'
        color="#FFFFFF"
        iconName='FaSmileO'
        iconSize={20}
        onClick={(e) => {
          e.preventDefault()
          if (!props.disabled) {
            onClick(e)
          }
        }}
        className='w-100'
        style={{
          borderRadius: "0px 0px 15px 0px",
          zIndex: "0",
          pointerEvents: props.disabled
            ? "none"
            : "initial",
          opacity: props.disabled
            ? "0.6"
            : "1.0",
        }} />
    </span>
  </>
))

const EmojiSearchboxMenu = React.forwardRef(
  ({
    props,
    close,
    children,
    style,
    className,
    'aria-labelledby': labeledBy,
  }, ref) => {
    const columnRef = useRef(null)
    return (<>
      <div
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
        style={{
          borderRadius: "15px",
          borderWidth: "0px",
          height: "250px",
          width: "250px",
        }}>
        <PerfectScrollbar
          options={{
            suppressScrollX: true,
            wheelPropagation: true,
          }}
          className="chat-messages chat-scroll p-2"
          ref={columnRef}>
          <div style={{ alignSelf: "center", display: "flex", }}>
            <Card className="d-flex w-100 bg-transparent border-0 shadow-none" style={{
              borderRadius: "15px",
            }}>
              <Row noGutters className="h-100 border-0 bg-transparent">
                {EMOJI_LIST
                  .map((icon, index) => (
                    <Col
                      key={index}
                      sm={2} md={2} lg={2}
                      className="d-flex align-items-center border-0 shadow-none mb-0 justify-content-center">
                      <Button
                        variant="borderless"
                        className="p-0"
                        disabled={props.disabled}
                        onClick={() => {
                          props.submit(icon[1])
                          close()
                        }}>
                        <Card
                          className="d-inline-flex justify-content-center align-items-center bg-light card-hover border-0">
                          <Emoji
                            symbol={icon[1]}
                            className="px-2 py-1" />
                        </Card>
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Card>
          </div>
        </PerfectScrollbar>
      </div>
    </>
    );
  },
)

class EmojiModal extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)

    this.state = {
      init: false,
    }
  }

  onHandleToggle() {
    this.setState({
      init: !this.state.init,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Emoji Modal */}
        <Dropdown
          alignRight
          className="my-0 w-100"
          drop="left"
          show={this.state.init}
          onToggle={() => {
            this.onHandleToggle()
          }}>
          <Dropdown.Toggle
            as={EmojiSearchboxToggle}
            props={this.props} />
          <Dropdown.Menu
            alignRight
            as={EmojiSearchboxMenu}
            props={this.props}
            close={this.onHandleToggle}
            className="bg-dark mb-2" />
        </Dropdown>
        {/* / Emoji Modal */}
      </>
    )
  }
}

export default EmojiModal