const tokenName = 'groovy-token'

export const setToken = (token) => {
    localStorage.setItem('groovy-token', token)
    console.log('token set:, token')
}

export const getToken = () => {
    return localStorage.getItem(tokenName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
}

export const getUserFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);

    const payloadAsObject = JSON.parse(atob(padded));

    const timeNow = Date.now() / 1000;
    if (payloadAsObject.exp < timeNow) {
      removeToken();
      console.log('Token expired, removed');
      return null;
    }

    // If no .user key, return whole payload
    return payloadAsObject.user || payloadAsObject;
  } catch (error) {
    console.error('Invalid token format:', error);
    removeToken();
    return null;
  }
};