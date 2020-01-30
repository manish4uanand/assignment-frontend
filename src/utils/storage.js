
export function loadState() {
  try {
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    const accessTokenState = localStorage.getItem('access-token');
    if(client === null || uid === null || accessTokenState === null) {
      return undefined;
    }
    return {
      "access-token": JSON.parse(accessTokenState),
      "client": JSON.parse(client),
      "uid": JSON.parse(uid)
    }
  } catch (err) {
    console.info('Session storage cannot be accessed!')
    return undefined;
  }
}

export function saveState(accessToken) {
  try {
    const client = JSON.stringify(accessToken.client);
    const uid = JSON.stringify(accessToken.uid);
    const accessTokenState = JSON.stringify(accessToken["access-token"]);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
    localStorage.setItem('access-token', accessTokenState);
  } catch(err) {
    console.info('Saving state to session storage failed');
  }
}

export function saveCurrentUser(currentUser) {
  try {
    localStorage.setItem('current_user', JSON.stringify(currentUser));
  } catch(err) {
    console.info('Saving state to session storage failed');
  }
}

export function loadCurrentUser() {
  try {
    const currentUser = localStorage.getItem('current_user');
    if(currentUser === null) {
      return undefined;
    }
    return JSON.parse(currentUser)
  } catch (err) {
    console.info('Session storage cannot be accessed!')
    return undefined;
  }
}