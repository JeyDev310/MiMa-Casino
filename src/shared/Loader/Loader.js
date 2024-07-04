import React, { Component } from 'react'
import styles from './Loader.module.scss'
import ResourceLoaderB from '../../components/views/utilities/loaders/ResourceLoaderB'

class Loader extends Component {

  async componentWillUnmount() {
    await new Promise(resolve =>
      setTimeout(() => resolve(), 5000)
    )
  }

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.Spinner}>
          <ResourceLoaderB height="4rem" width="4rem" />
        </div>
      </div>
    )
  }
}

export default Loader