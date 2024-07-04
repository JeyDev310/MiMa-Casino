import './CompleteUi.scss'
import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import CuiNumeral from './CuiNumeral'
import CuiRcInputNumber from './CuiRcInputNumber'
import CuiNouisliderReact from './CuiNouisliderReact'
import CuiReactSelect from './CuiReactSelect'
import CuiReactDatepicker from './CuiReactDatepicker'
import CuiReactFlatpickr from './CuiReactFlatpickr'
import CuiReactBigCalendar from './CuiReactBigCalendar'
import CuiReactColor from './CuiReactColor'
import CuiReactTextMask from './CuiReactTextMask'
import CuiReactAutosizeTextarea from './CuiReactAutosizeTextarea'
import CuiSweetAlert2 from './CuiSweetAlert2'
import CuiReactToastify from './CuiReactToastify'
import CuiReactMde from './CuiReactMde'
import CuiReactQuill from './CuiReactQuill'
import CuiReactBootstrapTypeahead from './CuiReactBootstrapTypeahead'
import CuiReactTable from './CuiReactTable'
import CuiReactBootstrapTable2 from './CuiReactBootstrapTable2'
import CuiReactDropzone from './CuiReactDropzone'
import CuiReactBeautifulDnd from './CuiReactBeautifulDnd'
import CuiReactIdSwiper from './CuiReactIdSwiper'
import CuiReactContextmenu from './CuiReactContextmenu'
import CuiReactSortableTree from './CuiReactSortableTree'
import CuiReactLadda from './CuiReactLadda'
import CuiReactAvatarEditor from './CuiReactAvatarEditor'
import CuiReactClipboardjs from './CuiReactClipboardjs'
import CuiReactMasonryComponent from './CuiReactMasonryComponent'
import CuiReactImageLightbox from './CuiReactImageLightbox'
import CuiReactImages from './CuiReactImages'
import CuiReactIdleTimer from './CuiReactIdleTimer'
import CuiReactStepzilla from './CuiReactStepzilla'
import CuiReactPerfectScrollbar from './CuiReactPerfectScrollbar'
import CuiSpinkit from './CuiSpinkit'
import CuiPlyr from './CuiPlyr'

class Plugins extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Plugins - React Complete UI')
  }

  render() {
    return (
      <div>
        <h1 id="main-header" className="theme-bg-dark theme-text-white">
          <span id="main-header-path">React Complete UI &nbsp;/&nbsp;</span>
          <Dropdown>
            <Dropdown.Toggle as="a" className="cursor-pointer theme-text-white">Plugins</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/complete-ui/base" className="dropdown-item text-big py-2 px-4">
                <span className="d-inline-block py-1 px-2">Base</span>
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/complete-ui/charts" className="dropdown-item text-big py-2 px-4">
                <span className="d-inline-block py-1 px-2">Charts</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h1>

        <CuiNumeral />
        <CuiRcInputNumber />
        <CuiNouisliderReact />
        <CuiReactSelect />
        <CuiReactDatepicker />
        <CuiReactFlatpickr />
        <CuiReactBigCalendar />
        <CuiReactColor />
        <CuiReactTextMask />
        <CuiReactAutosizeTextarea />
        <CuiSweetAlert2 />
        <CuiReactToastify />
        <CuiReactMde />
        <CuiReactQuill />
        <CuiReactBootstrapTypeahead />
        <CuiReactTable />
        <CuiReactBootstrapTable2 />
        <CuiReactDropzone />
        <CuiReactBeautifulDnd />
        <CuiReactIdSwiper />
        <CuiReactContextmenu />
        <CuiReactSortableTree />
        <CuiReactLadda />
        <CuiReactAvatarEditor />
        <CuiReactClipboardjs />
        <CuiReactMasonryComponent />
        <CuiReactImageLightbox />
        <CuiReactImages />
        <CuiReactIdleTimer />
        <CuiReactStepzilla />
        <CuiReactPerfectScrollbar />
        <CuiSpinkit />
        <CuiPlyr />
      </div>
    )
  }
}

export default Plugins
