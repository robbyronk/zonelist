import {takeEvery} from "redux-saga";
import {fork, put, call} from "redux-saga/effects";
import ActionTypes from '../actions'

import auth0 from 'auth0-js';
import {AUTH_CONFIG} from '../auth0-variables';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    Auth.logout = Auth.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    Auth.isAuthenticated = Auth.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        Auth.setSession(authResult);
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  static setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    console.log('set session complete')
  }

  static logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    console.log('logout complete')
  }

  static isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}


function* createSession() {
  console.log('create session')
  if (Auth.isAuthenticated()) {
    console.log('post /session')
    const data = {id_token: localStorage.getItem('id_token')}
    fetch(
      '/api/session',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
  } else {
    console.log('need to auth')
    const auth = new Auth()
    auth.login()
  }
}

export default function* sagas() {
  yield call(createSession)
}
