// auth.js (usando window)
window.getUserToken = function () {
  return localStorage.getItem('token');
};

window.getUserPermissions = function () {
  const token = window.getUserToken();
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.permissions || [];
  } catch {
    return [];
  }
};

window.isLoggedIn = function () {
  return !!window.getUserToken();
};

window.logout = function () {
  localStorage.removeItem('token');
  window.location.href = '/login4w.html';
};
