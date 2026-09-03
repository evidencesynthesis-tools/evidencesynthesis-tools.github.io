

(function () {
  'use strict';

  const screen = document.getElementById('security-screen');
  if (!screen) return;

  if (!localStorage.getItem('security_verified')) {
    localStorage.setItem('security_verified', 'true');

    const messages = [
      'Initializing...',
      'Verifying...',
      'Loading...',
      'Finalizing...'
    ];

    let index = 0;
    const textElement = document.getElementById('progress-text');

    const interval = setInterval(() => {
      index++;
      if (index < messages.length) {
        textElement.innerText = messages[index];
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      screen.style.display = 'none';
    }, 3000);
  } else {
    screen.style.display = 'none';
  }
})();
