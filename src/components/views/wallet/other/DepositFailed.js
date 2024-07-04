import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'

import {Link, useHistory} from 'react-router-dom'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/authentication.scss'

const DepositFailed = () => {

  const history = useHistory();
  useEffect(() => {
    evaluateActiveRoute()
  }, []) // eslint-disable-line

  const evaluateActiveRoute = () => {
    if (!localStorage.getItem('token')) {
      history.push("/login")
    }
  }

    const renderMessage = () => {
            return (
                <div className="p-4 p-sm-5">
                    <div className="display-1 lnr lnr-warning text-center text-warning mb-4"></div>
                    <h3 className="text-center mb-4 font-weight-bold">Deposit was failed</h3>
                    <Link to="/games">
                      <Button variant="primary" className="font-weight-bold" block>Proceed to dashboard</Button>
                    </Link>
                  </div>
            )
    }

    return (
      <React.Fragment>

        <div className="authentication-wrapper authentication-2 px-4 ui-bg-cover ui-bg-overlay-container" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/img-26-01.jpg')` }}>
          <div className="authentication-inner py-5">

            <div className="d-flex justify-content-center align-items-center">
              <div className="ui-w-200">
                <div className="w-140 position-relative" style={{ paddingBottom: '10%' }}>
                  <img src={`${process.env.PUBLIC_URL}/img/logos/logo-011.png`} alt="MiMa Live Poker" className="d-block ui-w-200" />
                </div>
              </div>
            </div>

            <Card as="form" className="my-3 bg-light border-0">
             <React.Fragment>
                 {renderMessage()}
                </React.Fragment>

            </Card>

          </div>
        </div>

      </React.Fragment >
    )
}

export default DepositFailed;
