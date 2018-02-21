import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'

// import logo from './logo.svg'  
import './App.css'

const App = props => (  
  <div className="App">
    <Header />
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {  
  children: PropTypes.node,
}

export default App