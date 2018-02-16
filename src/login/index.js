import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'

import loginRequest from './actions'

class Login extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
    }

    submit = (values) => {
        this.props.loginRequest(values)
    }

    render () {
        const {
            handleSubmit,
            login: {
                errors,
                messages,
                requesting,
                successful,
            }
        } = this.props

        return (
            <div className="login">
                <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
                    <h1>LOGIN</h1>
                    <label htmlFor="username">Username</label>
                    <Field
                        name="username"
                        type="text"
                        id="username"
                        className="email"
                        component="input"
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        id="password"
                        className="password"
                        component="input"
                    />
                    <button action="submit">LOGIN</button>
                </form>
                <div className="auth-messages">
                    {/* As in the signup, we're just using the message and error helpers */}
                    {!requesting && !!errors.length && (
                        <Errors message="Failure to login due to:" errors={errors} />
                    )}
                    {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                    )}
                    {requesting && <div>Logging in...</div>}
                    {!requesting && !successful && (
                        <Link to="/signup">Need to Signup? Click Here »</Link>
                    )}
                    {successful && (
                        <Redirect to="/profile" />
                    )}
                </div>
            </div>
        )
    }
}

// Connect redux state to component props
const mapStateToProps = state => ({
    login: state.login,
})
const connected = connect(mapStateToProps, { loginRequest })(Login)

// inject form into redux state as form.login
const formed = reduxForm({
    form: 'login'
})(connected)

export default formed