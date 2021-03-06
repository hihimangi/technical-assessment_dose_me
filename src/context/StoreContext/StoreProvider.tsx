import React, { PureComponent } from 'react'

import { StoreContext } from '.'
import { TStoreContent, TStoreContext } from './types'

class StoreProvider extends PureComponent {
  state: TStoreContext = {
    store : {
      data: []
    },
    setStore: (store: TStoreContent) => {
      this.setState({
        store
      })
    }
  }

  public render(): JSX.Element {
    const {
      children
    } = this.props

    return (
      <StoreContext.Provider value={this.state}>
        {children}
      </StoreContext.Provider>
    )
  }
}

export {
  StoreProvider
}
