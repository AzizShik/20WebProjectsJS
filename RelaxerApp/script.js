window.addEventListener('load', () => {
  const relaxerTilte = document.querySelector('.relaxer__regime');
  const circleContainer = document.querySelector('.container');

  const totalTime = 7500;
  const breatheTime = 3000;
  const holdTime = 1500;

  function breatheAnim() {
    relaxerTilte.textContent = 'Breathe In!';
    circleContainer.classList.remove('shrink');
    circleContainer.classList.add('grow');

    setTimeout(function () {
      relaxerTilte.textContent = 'Hold !';
      circleContainer.classList.remove('grow');
      circleContainer.style.transform = 'scale(1.25)';

      setTimeout(function () {
        relaxerTilte.textContent = 'Breathe Out!';
        circleContainer.classList.add('shrink');
        circleContainer.style.transform = 'scale(1)';
      }, holdTime);
    }, breatheTime);
  }

  breatheAnim();
  setInterval(breatheAnim, totalTime);
});
