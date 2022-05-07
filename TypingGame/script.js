window.addEventListener('load', () => {
  const wordEl = document.querySelector('.game__follow-span');
  const wordInput = document.querySelector('.game__input');
  const settingsSelect = document.querySelector('.settings__select');
  const settingsBtn = document.querySelector('.settings-btn');
  const settingsContainer = document.querySelector('.settings');
  const timeSpan = document.querySelector('.game__time-span');
  const gameEl = document.querySelector('.game');
  const gameContainer = document.querySelector('.game__container');
  const gameEnd = document.querySelector('.game__end');
  const scoreEndSpan = document.querySelector('.game__end-score');
  const gameTimeSpan = document.querySelector('.game__time-span');
  const gameWordSpan = document.querySelector('.game__follow-span');
  const gameScoreSpan = document.querySelector('.game__score-span');

  let score = 0;
  let time = 10;

  const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    'programming',
    'javascript',
    'code',
    'web',
  ];

  settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('hide-settings');
    if (settingsContainer.classList.contains('hide-settings')) {
      settingsBtn
        .querySelector('svg')
        .animate(
          [
            {transform: 'rotate(0deg)'},
            {transform: 'rotate(90deg)'},
            {transform: 'rotate(180deg)'},
          ],
          {
            duration: 400,
          }
        );
    } else {
      settingsBtn
        .querySelector('svg')
        .animate(
          [
            {transform: 'rotate(180deg)'},
            {transform: 'rotate(90deg)'},
            {transform: 'rotate(0deg)'},
          ],
          {
            duration: 400,
          }
        );
    }
  });

  function showRandomNumber() {
    gameWordSpan.innerHTML = getRandomWord();
  }

  showRandomNumber();

  function getRandomWord() {
    return words[getRandomNumber()];
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * words.length);
  }

  function typeTimer() {
    let interval = setInterval(function () {
      if (time > 0) {
        time--;
        timeSpan.innerHTML = time < 10 ? `0${time}s` : `${time}s`;
      } else {
        showEnd();
        clearInterval(interval);
      }
    }, 1000);
  }

  function showEnd() {
    gameEnd.classList.add('show');
    gameContainer.style.display = 'none';
    scoreEndSpan.innerHTML = score;
  }

  function typeReload() {
    gameEnd.classList.remove('show');
    gameContainer.style.display = 'block';
    time = 10;
    score = 0;
    gameTimeSpan.textContent = '10s';
    gameScoreSpan.textContent = '0';
    wordInput.value = '';
    typeTimer();
  }

  function settingsTimeIncrease() {
    switch (settingsSelect.value) {
      case 'easy':
        return 3;
      case 'medium':
        return 2;
      case 'hard':
        return 1;
    }
  }


  function wordTyping() {
    const inputValue = wordInput.value;
    if (gameWordSpan.innerText === inputValue) {
      score++;
      gameScoreSpan.innerHTML = score;
      wordInput.value = '';
      showRandomNumber();
      time = time + settingsTimeIncrease();
    }
  }

  wordInput.focus();
  wordInput.addEventListener('input', wordTyping);
  gameEl.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('game__reload')) {
      typeReload();
    }
  });

  typeTimer();
});
