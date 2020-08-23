import React, { useState } from 'react'
import axios from 'axios'
import { AuthCodeFunctions } from 'react-oauth2-authcode-provider'

function Account() {
    const [userInfoLoading, setUserInfoLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    return (
        <div>
            <h1>My Account</h1>
            <p className="lead">
                This is the my account screen.
                You need to be logged in to access this page.
            </p>
            <div className='mt-3 mb-3'>
            <button className='btn btn-primary mr-3' onClick={() => {
                setUserInfoLoading(true)
                axios
                .post('https://dev-emf33n24.eu.auth0.com/userinfo', null, {
                    headers: AuthCodeFunctions.signRequest({
                    'content-type': 'application/json'
                    })
                })
                .then((response) => {
                    setUserInfoLoading(false)
                    setUserInfo(response)
                })
                .catch((error) => {
                    console.log(error)
                    setUserInfoLoading(false)
                    setUserInfo(error)
                })
                }}>Get Account Info</button>
                {userInfoLoading ? 'Loading...' : ''}
                {userInfo && !userInfoLoading ? <div className='mt-2'>{userInfo?.data ? JSON.stringify(userInfo?.data) : 'Error'}</div> : ''}
            </div>
        </div>
    )
}

export default Account