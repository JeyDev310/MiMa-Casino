import React, { Component } from 'react'
import styles from './Loader.module.scss'
import ResourceLoaderB from '../../components/views/utilities/loaders/ResourceLoaderB'

class LoaderAuth extends Component {

  async componentWillUnmount() {
    await new Promise(resolve =>
      setTimeout(() => resolve(), 5000)
    )
  }

  render() {
    return (
      <div
        className="authentication-wrapper authentication-1 ui-bg-cover ui-bg-overlay-container"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/img-25-04.jpg')`,
        }} >
        <div className={styles.Container}>
          <div className={styles.Spinner}>
            <ResourceLoaderB height="4rem" width="4rem" />
          </div>
        </div>
      </div>
    )
  }
}

export default LoaderAuth