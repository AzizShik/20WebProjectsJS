window.addEventListener('load', () => {
  const btnPlayBig = document.querySelector('.player__play-big'),
    btnPlaySmall = document.querySelector('.player__play-small'),
    progressBar = document.querySelector('.player__progress-bar'),
    progressBarLine = document.querySelector('.player__progress-bar-line'),
    player = document.querySelector('.player'),
    playerVideo = document.querySelector('.player__video'),
    playerVolume = document.querySelector('.player__volume'),
    progressTime = document.querySelector('.player__progress-time'),
    progressTimeCurrent = document.querySelector('.player__progress-time-current'),
    progressTimeVolume = document.querySelector('.player__progress-time-volume'),
    progressTimeValue = document.querySelector('.player__progress-time-value'),
    progressTimeAll = document.querySelector('.player__progress-time-all'),
    videoFullscreenBtn = document.querySelector('.player__fullscreen'),
    videoSettings = document.querySelector('.player__settings'),
    videoSettingsWheel = document.querySelector('.player__settings svg'),
    videoAllSeconds = document.querySelector('.player__progress-all-seconds'),
    videoAllMinutes = document.querySelector('.player__progress-all-minutes'),
    videoCurrentSeconds = document.querySelector('.player__progress-current-seconds'),
    videoCurrentMinutes = document.querySelector('.player__progress-current-minutes');

  let isPlay = false;
  let isMuted = false;
  let isMousedown = false;
  let isFullscreen = false;

  player.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('player__video')) {
      videoToggle();
    }

    if (el.classList.contains('player__play-big')) {
      videoToggle();
    }

    if (el.classList.contains('player__play-small')) {
      videoToggle();
    }

    if (el.classList.contains('player__progress-bar')) {
      videoProgressTime(e);
    }

    if (el.classList.contains('player__volume')) {
      videoVolumeToggle();
    }

    if (el.classList.contains('player__progress-time-volume')) {
      if (Number(progressTimeVolume.value) === 0) {
        playerVolume.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>`;
      } else {
        playerVolume.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
    </svg>`;
      }
    }

    if (el.classList.contains('player__fullscreen')) {
      videoFullscreen();
    }

    if (el.classList.contains('player__settings-label')) {
      const value = parseFloat(el.textContent);
      if (isNaN(value)) {
        playerVideo.playbackRate = 1;
      } else {
        playerVideo.playbackRate = value;
      }
    }

    playerVideo.volume = (progressTimeVolume.value / 100);
    videoVolume();



  });

  playerVideo.addEventListener('timeupdate', () => {
    videoProgressBar();
  });

  progressTimeVolume.addEventListener('mousemove', () => {
    playerVideo.volume = (progressTimeVolume.value / 100);
    videoVolume();
  });

  videoSettings.addEventListener('mouseleave', () => {
    videoSettingsWheel.animate(
      [{
          transform: `rotate(180deg)`
        },
        {
          transform: `rotate(0deg)`
        }
      ], {
        duration: 500,
      });
  });

  window.addEventListener('mousedown', (e) => isMousedown = true);
  window.addEventListener('mouseup', () => isMousedown = false);
  progressBar.addEventListener('mousemove', (e) => isMousedown && videoProgressTime(e));


  function videoFullscreen() {
    if (!isFullscreen) {
      isFullscreen = true;
      player.requestFullscreen();
      videoFullscreenBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M22,3.41l-5.29,5.29L20,12h-8V4l3.29,3.29L20.59,2L22,3.41z M3.41,22l5.29-5.29L12,20v-8H4l3.29,3.29L2,20.59L3.41,22z"/></svg>`;
    } else {
      isFullscreen = false;
      document.exitFullscreen();
      videoFullscreenBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>`;
    }
  }

  function videoToggle() {
    videoProgressBar();
    if (!isPlay) {
      playerVideo.play();
      btnPlayBig.classList.add('hide');
      btnPlaySmall.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      isPlay = true;
    } else {
      playerVideo.pause();
      btnPlayBig.classList.remove('hide');
      btnPlaySmall.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
    </svg>`;
      isPlay = false;
    }
  }

  function videoProgressBar() {
    const minutesDuration = Math.floor(playerVideo.duration / 60);
    const secondsDuration = Math.floor(playerVideo.duration % 60);
    const currentTime = Math.floor(playerVideo.currentTime);
    const currentTimeSeconds = currentTime % 60 < 10 ? "0" + currentTime % 60 : currentTime % 60;

    if (currentTime > 60) {
      const currentTimeMinutes = Math.floor(currentTime / 60) < 10 ? "0" + Math.floor(currentTime / 60) : Math.floor(currentTime / 60);
      videoCurrentMinutes.textContent = currentTimeMinutes;
    } else {
      videoCurrentMinutes.textContent = '00';
    }

    progressBarLine.style.width = ((playerVideo.currentTime / playerVideo.duration) * 100).toFixed(2) + '%';
    const videoMinutesDuration = minutesDuration < 10 ? '0' + minutesDuration : minutesDuration;
    const videoSecondsDuration = secondsDuration < 10 ? '0' + secondsDuration : secondsDuration;

    videoAllSeconds.textContent = videoSecondsDuration;
    videoAllMinutes.textContent = videoMinutesDuration;

    videoCurrentSeconds.textContent = currentTimeSeconds;
  }


  let firstVideoVolume = 0.25;

  function videoVolumeToggle() {
    if (!isMuted) {
      firstVideoVolume = (progressTimeVolume.value / 100);
      playerVideo.volume = 0;
      playerVolume.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>`;
      isMuted = true;
      videoVolume();
    } else {
      playerVideo.volume = firstVideoVolume;
      playerVolume.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
    </svg>`;
      isMuted = false;
      videoVolume();
    }
  }

  function videoVolume() {
    progressTimeValue.textContent = Math.floor((playerVideo.volume * 100)) + '%';
    progressTimeValue.style.left = (playerVideo.volume * 100) + '%';
    progressTimeVolume.value = (playerVideo.volume * 100);
  }

  function videoProgressTime(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * playerVideo.duration;
    playerVideo.currentTime = scrubTime;
  }





});