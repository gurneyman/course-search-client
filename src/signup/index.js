import React, { Component } from 'react' 
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'  
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import signupRequest from './actions'

class Signup extends Component {  

  static propTypes = {
    handleSubmit: PropTypes.func,
    signupRequest: PropTypes.func,
    signup: PropTypes.shape({
        requesting: PropTypes.bool,
        successful: PropTypes.bool,
        messages: PropTypes.array,
        errors: PropTypes.array,
    }),
  }

  // Redux Form will call this when submitted which will trigger the action
  submit = (values) => {
      this.props.signupRequest(values)
  }

  render () {
    // Some weird assignment like .extend?
    // Anyway, this grabs what we need from global state and reduxForm apparently
    const {
        handleSubmit,
        signup: {
            requesting,
            successful,
            messages,
            errors,
        },
    } = this.props
    return (

        <div className="signup">
          <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
            <h1>Signup</h1>
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              type="text"
              id="username"
              className="email"
              label="Email"
              component="input"
            />
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              id="password"
              className="password"
              label="Password"
              component="input"
            />
            <button action="submit">SIGNUP</button>
          </form>
          <div className="auth-messages">
            {
                /* 
                These are all nothing more than helpers that will show up
                based on the UI states, not worth covering in depth.  Simply put
                if there are messages or errors, we show them
                */
            }
            {!requesting && !!errors.length && (
                <Errors message="Failure to signup due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
                <Messages messages={messages} />
            )}
            {!requesting && successful && (
                <div>
                Signup Successful! <Link to="/login">Click here to Login »</Link>
                </div>
            )}
            {/* Redux Router's <Link> component for quick navigation of routes */}
            {!requesting && !successful && (
                <Link to="/login">Already a Widgeter? Login Here »</Link>
            )}
            </div>
        </div>
      )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({  
  signup: state.signup,
})

// Connect our component to redux and attach the `signup` piece
// of state to our `props` in the component.  Also attach the
// `signupRequest` action to our `props` as well.
const connected = connect(mapStateToProps, { signupRequest })(Signup)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({  
  form: 'signup',
})(connected)

// Export our well formed component!
export default formed