import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import {profileRequest} from './actions'

class Profile extends Component {
    static propTypes = {
        client: PropTypes.shape({
            token: PropTypes.string,
        }),
        profileRequest: PropTypes.func,
        profile: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
            profileData: PropTypes.object,
        }),
    }

    componentWillMount() {
        this.props.profileRequest(this.props.client.token)
    }
    render () {
        const {
            client: {
                token,
            },
            profile: {
                errors,
                messages,
                profileData,
                requesting,
                successful,
            },
        } = this.props
        return (
            <div>
                {requesting && (
                    <div>
                        Loading profile
                    </div>
                )}
                {!requesting && !!errors.length && (
                    <div>
                        <Errors message="Failure to load profile:" errors={errors} />
                        <Redirect to="/login" />
                    </div>
                )}
                {!requesting && !!messages.length && (
                    <Messages messages={messages} />
                )}
                {!requesting && successful && (
                    <div>
                        {profileData.username}
                    </div>
                )}
            </div>
        )
    }
}

// Connect redux state to component props
const mapStateToProps = state => ({
    client: state.client,
    profile: state.profile,
})
const connected = connect(mapStateToProps, { profileRequest })(Profile)

export default connected