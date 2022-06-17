window.addEventListener('load', () => {
  const daysEl = document.querySelector('.days');
  const hoursEl = document.querySelector('.hours');
  const minutesEl = document.querySelector('.minutes');
  const secondsEl = document.querySelector('.seconds');

  const currentYear = new Date().getFullYear();
  const newYearDate = new Date(`January 01 ${currentYear + 1} 00:00:00`);

  function getNewYear() {
    const currentTime = new Date();
    const diff = newYearDate - currentTime;

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.innerHTML = days < 10 ? '0' + days : days;
    hoursEl.innerHTML = hours < 10 ? '0' + hours : days;
    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;

    console.log(days);
    setTimeout(function () {
      getNewYear();
    }, 1000);
  }

  getNewYear();
});
