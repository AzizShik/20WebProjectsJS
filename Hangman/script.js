window.addEventListener('load', () => {
  const playAgainBtn = document.querySelector('.popup__btn'),
    notification = document.querySelector('.notification-container'),
    popup = document.querySelector('.popup-container'),
    finalMessage = document.querySelector('.popup__title'),
    popupWordEl = document.querySelector('.popup__word-span'),
    figureParts = document.querySelectorAll('.figure-part'),
    wordEl = document.querySelector('.word');
  const wrongLetterEls = document.querySelectorAll('.wrong-letters__span');

  const words = [
    'application',
    'programming',
    'interface',
    'wizard',
    'design',
    'web',
    'code',
  ];

  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let wordLetters = selectedWord.split('');
  let correctLetters = [];
  let wrongLetters = [];

  function loadWord() {
    wordEl.innerHTML = `
    ${wordLetters.map((item) => `<span class="letters"></span>`).join('')}`;
  }

  function writeLetter() {
    const lettersEl = document.querySelectorAll('.letters');
    correctLetters.forEach((letter) => {
      wordLetters.forEach((item, idx) => {
        if (item === letter) {
          lettersEl[idx].innerHTML = `${item}`;
        }
      });
    });

    if (wrongLetters.length <= 6) {
      for (let i = 0; i < wrongLetters.length; i++) {
        wrongLetterEls[i].textContent = wrongLetters[i];
        figureParts[i].style.display = 'block';
      }
    }
  }

  function handleResult() {
    const uniqueArray = wordLetters.filter(function (item, pos) {
      return wordLetters.indexOf(item) == pos;
    });
    if (wrongLetters.length === 6) {
      finalMessage.textContent = 'You Lose 👎';
      popupWordEl.textContent = selectedWord;
      popup.classList.add('show');
    }
    if (uniqueArray.length === correctLetters.length) {
      finalMessage.textContent = 'You Have Won 👍';
      popupWordEl.textContent = selectedWord;
      popup.classList.add('show');
    }
  }

  function checkLetters(letter) {
    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      notification.classList.add('show');
    }

    setTimeout(() => {
      notification.classList.remove('show');
    }, 1000);
  }

  loadWord();

  window.addEventListener('keydown', (e) => {
    const letter = e.key;
    checkLetters(letter);

    if (e.keyCode <= 90 && e.keyCode >= 65) {
      if (!correctLetters.includes(letter) && !wrongLetters.includes(letter)) {
        wordLetters.includes(letter) === true
          ? correctLetters.push(letter)
          : wrongLetters.push(letter);

        writeLetter();
        handleResult();
      }
    }
  });

  function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    wordLetters = selectedWord.split('');
    correctLetters = [];
    wrongLetters = [];

    figureParts.forEach((item) => {
      item.style.display = 'none';
    });

    wrongLetterEls.forEach((item) => {
      item.textContent = '';
    });

    popup.classList.remove('show');
    loadWord();
  }

  playAgainBtn.addEventListener('click', () => {
    resetGame();
  });
});
