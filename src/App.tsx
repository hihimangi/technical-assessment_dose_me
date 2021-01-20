import React, { PureComponent, useContext } from 'react'

import { StoreProvider } from './context/StoreContext'
import { Home } from './pages/Home'
import { TopNav } from "./components/TopNav";

class App extends PureComponent {

  public render(): JSX.Element {
    return (
      <StoreProvider>
        <TopNav/>
        <Home />
      </StoreProvider>
    )
  }
}

export {
  App
}
