window.addEventListener('load', () => {
  const playBtn = document.querySelector('.player__play');
  const prevBtn = document.querySelector('.player__prev');
  const nextBtn = document.querySelector('.player__next');
  const playerAudio = document.querySelector('.player__audio');
  const playBtnIcon = playBtn.querySelector('span');
  const playerProgressWidth = document.querySelector('.player__progress-width');
  const playerProgressEl = document.querySelector('.player__progress');
  const playerImg = document.querySelector('.player__img');

  let isPlay = false;
  let idx = 0;
  const music = [
    {
      poster: 'img/clockwork.jpg',
      src: 'audio/Clockwork.mp3',
    },
    {
      poster: 'img/fire.jpg',
      src: 'audio/Fire.mp3',
    },
    {
      poster: 'img/focusing.jfif',
      src: 'audio/focusing.mp3',
    },
  ];

  playBtn.addEventListener('click', () => {
    audioToggle();
  });

  playerAudio.addEventListener('timeupdate', playerProgress);

  playerProgressEl.addEventListener('click', (e) => {
    const time = (e.offsetX / playerProgressEl.offsetWidth) * 100;
    playerProgressWidth.style.width = time + '%';
    playerAudio.currentTime = (playerAudio.duration * time) / 100;
  });

  function audioToggle() {
    if (!isPlay) {
      playerAudio.play();
      playBtnIcon.innerHTML = 'pause';
      isPlay = true;
    } else {
      playerAudio.pause();
      playBtnIcon.innerHTML = 'play_arrow';
      isPlay = false;
    }
  }

  function playerProgress() {
    playerProgressWidth.style.width =
      (playerAudio.currentTime / playerAudio.duration) * 100 + '%';
  }

  nextBtn.addEventListener('click', () => {
    nextMusic();
  });

  prevBtn.addEventListener('click', () => {
    prevMusic();
  });

  function nextMusic() {
    if (idx < music.length - 1) {
      idx++;
      musicLoad(idx);
    } else {
      idx = 0;
      musicLoad(idx);
    }
  }

  function prevMusic() {
    if (idx > 0) {
      idx--;
      musicLoad(idx);
    } else {
      idx = music.length - 1;
      musicLoad(idx);
    }
  }

  function musicLoad(idx) {
    playerImg.src = music[idx].poster;
    playerAudio.src = music[idx].src;
    isPlay = false;
    audioToggle();
  }
});
