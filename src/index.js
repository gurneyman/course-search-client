import React from 'react'  
import ReactDOM from 'react-dom'  
import { applyMiddleware, createStore, compose } from 'redux'  
import { Provider } from 'react-redux'  
import createSagaMiddleware from 'redux-saga'  
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import all of our components
import App from './App'  
import Login from './login'  
import Signup from './signup'  
import Profile from './profile' 

import 'normalize.css'
import './index.css'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'  
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

// Redux DevTools - completely optional, but this is necessary for it to
// work properly with redux saga.  Otherwise you'd just do:
//
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(  
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(  
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
//registerServiceWorker();
