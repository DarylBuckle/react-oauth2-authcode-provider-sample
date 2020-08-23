import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css';
import { AuthCodeProvider, AuthCodeFunctions } from 'react-oauth2-authcode-provider'
import 'react-oauth2-authcode-provider/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Home';
import Account from './Account';

function App() {
  const myAuthenticationProps = {
      authUrl: 'https://dev-emf33n24.eu.auth0.com/authorize',
      callBackPath: '',
      tokenUrl: 'https://dev-emf33n24.eu.auth0.com/oauth/token',
      clientId: '0ujnTs1Uynm6W83ygzbkuRkMhqdTrZ26',
      clientSecret: 'DhYAsb9z9LxMDsZL3shPFaB90sCSqMptPaMU-EnB7fEUv-ECbMjqlvn6nQTOVoLG',
      scope: 'openid profile email phone address offline_access',
      logoutUrl: 'https://dev-emf33n24.eu.auth0.com/v2/logout',
      logoutCallBackPath: '',
  }

  const loggedIn = AuthCodeFunctions.isLoggedIn()

  let username = ''
  const idToken = localStorage.getItem('id_token')
  if (idToken) {
    try { 
      const idTokenObj = JSON.parse(AuthCodeFunctions.parseJwt(idToken))
      if (idTokenObj){
        username = idTokenObj.name
      } 
    } catch (e) {
      /*invalid json*/
    };
  }

  return (
    <div className="App">
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <ul className='navbar-nav ml-lg-5' data-toggle='collapse' data-target='.navbar-collapse.show'>
              <li className='nav-item mr-lg-3'>
                  <Link className='nav-link' to='/'>Home</Link>
              </li>
              <li className='nav-item mr-lg-3'>
                  <Link className='nav-link' to='/account'>Account</Link>
              </li>
          </ul>
          <ul className='navbar-nav ml-auto mr-lg-5'>
              <li className='nav-item mr-lg-3'>
                  {loggedIn ?
                    <button 
                      className='nav-link btn btn-link' 
                      onClick={() => AuthCodeFunctions.doLogoutFlow(myAuthenticationProps)}
                    >
                      Logout
                    </button>
                  :
                    <button 
                      className='nav-link btn btn-link' 
                      onClick={() => AuthCodeFunctions.doAuthorizationCodeFlow(myAuthenticationProps)}
                    >
                      Log In
                    </button>
                  }
              </li>
          </ul>
      </nav>
      <div className="mt-5">
          {'You '}
          <b>{loggedIn ? 'are' : 'are not'}</b>
          {' logged in'}
          <b>{loggedIn && username ? ' as ' + username : ''}</b>
          {'.'}
      </div>
      <div className="container mt-5 text-left">
        <Switch>
          <Route exact path='/'>
              <AuthCodeProvider
                authenticationProps={myAuthenticationProps}
                authenticationRequired={false}
              >
                <Home /> 
              </AuthCodeProvider>
          </Route>
          <Route exact path='/account'>
              <AuthCodeProvider
                authenticationProps={myAuthenticationProps}
                authenticationRequired={true}
              >
                <Account /> 
              </AuthCodeProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
