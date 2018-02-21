import { handleApiErrors } from '../lib/api-errors'

export function fetchUserProfile (token) {
    const profileRequestUrl = '/users/current'
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }

    return fetch(profileRequestUrl, fetchOptions)
            .then(handleApiErrors)
            .then(response => response.json())
            .catch((error) => { throw error })
}