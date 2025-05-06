let cookieAcceptDate = localStorage.getItem('cookieAcceptDate');
let cookieNotification = document.getElementById('cookie_notification');
if (!cookieAcceptDate)
  cookieNotification.classList.add('cookie_notify');
document.getElementById('cookie_accept').addEventListener(
  'click', function() {
    localStorage.setItem('cookieAcceptDate', Date.now());
    cookieNotification.classList.remove('cookie_notify');
  }
);