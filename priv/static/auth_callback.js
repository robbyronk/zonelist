function setSession(authResult) {
  // Set the time that the access token will expire at
  var expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);

  redirectToApp()
}

function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}

function redirectToApp() {
// redirect back to app
  console.log('authenticated')
  window.location = '/'
}

if (isAuthenticated()) {
  redirectToApp();
}

var webAuth = new auth0.WebAuth({
  domain: 'zone.au.auth0.com',
  clientID: '82kNzX6k7c28Fbs7lDRCnP60Q1YoQ7Rx',
  redirectUri: window.location.href,
  audience: 'https://zone.au.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
});

webAuth.parseHash(function(err, authResult) {
  if (authResult && authResult.accessToken && authResult.idToken) {
    window.location.hash = '';
    setSession(authResult);
  } else if (err) {
    console.log(err);
    alert(
      'Error: ' + err.error + '. Check the console for further details.'
    );
  }
  // send err to sentry
  // redirect back to app
});
