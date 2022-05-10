window.addEventListener('load', () => {
  const slider = document.querySelector('.slider');
  let sliderItems = document.querySelectorAll('.slider__item');
  const sliderBtnPrev = document.querySelector('.slider__prev');
  const sliderBtnNext = document.querySelector('.slider__next');
  const sliderCurrent = document.querySelector('.slider__slides-current');
  const sliderTotalCards = document.querySelector('.slider__slides-total');
  const sliderFlips = document.querySelectorAll('.slider__item-flip');
  const addCardBtn = document.querySelector('.header__btn');
  const modalEl = document.querySelector('.modal');
  const textQuestionEl = document.querySelectorAll('.modal__form-text')[0];
  const modalTextareas = document.querySelectorAll('.modal__form-text');
  const modalFormBtn = document.querySelector('.modal__form-btn');
  const modalFormEl = document.querySelector('.modal__form');
  const sliderItemsContainer = document.querySelector('.slider__items');
  const clearCardsBtn = document.querySelector('.clear-btn');

  let idx = 0;
  let data = [];

  if (localStorage.getItem('cards') !== null) {
    data = JSON.parse(localStorage.getItem('cards'));
    data.forEach((item) => {
      addNewCard(item.question, item.answer);
    });
  }

  function sliderToggle(idx, dir = 'next') {
    sliderItems.forEach((item) => {
      item.classList.remove('slider__item--active');
    });
    sliderItems[idx].classList.add('slider__item--active');
    if (dir === 'next') {
      sliderItems[idx].animate(
        [
          getStartKeyFramesAnim(),
          {
            opacity: 1,
            transform: 'translateX(50px)',
          },
        ],
        getOptionsFromAnim()
      );
    } else if (dir === 'prev') {
      sliderItems[idx].animate(
        [
          getStartKeyFramesAnim(),
          {
            opacity: 1,
            transform: 'translateX(-50px)',
          },
        ],
        getOptionsFromAnim()
      );
    }

    sliderCurrent.innerHTML = idx + 1;
  }

  function getStartKeyFramesAnim() {
    return {
      opacity: 0,
      transform: 'translateX(0%)',
    };
  }

  function getOptionsFromAnim() {
    return {
      easing: 'ease',
      duration: 500,
    };
  }

  function nextSlider() {
    if (idx >= sliderItems.length - 1) {
      idx = 0;
      sliderToggle(idx, 'next');
    } else {
      idx++;
      sliderToggle(idx, 'next');
    }
  }

  function prevSlider() {
    if (idx <= 0) {
      idx = sliderItems.length - 1;
      sliderToggle(idx, 'prev');
    } else {
      idx--;
      sliderToggle(idx, 'prev');
    }
  }

  function showModal() {
    modalEl.classList.add('modal--active');
    setTimeout(function () {
      textQuestionEl.focus();
    }, 100);
  }

  function closeModal() {
    modalEl.classList.remove('modal--active');
  }

  function addNewCard(quest, answer) {
    const card = document.createElement('div');
    if (sliderItems.length === 0) {
      card.classList.add('slider__item--active');
      sliderCurrent.innerHTML = idx + 1;
    }
    card.classList.add('slider__item');
    card.innerHTML = `
      <div class="slider__item-flip">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.59 14.6201H32C32.3316 14.6201 32.6495 14.4884 32.8839 14.254C33.1183 14.0196 33.25 13.7016 33.25 13.3701C33.25 13.0386 33.1183 12.7207 32.8839 12.4862C32.6495 12.2518 32.3316 12.1201 32 12.1201H28.59C24.2288 12.1254 20.0478 13.8602 16.964 16.9441C13.8801 20.0279 12.1453 24.2089 12.14 28.5701V47.5701L6.88004 42.2701C6.64075 42.0943 6.34671 42.0095 6.05057 42.0307C5.75442 42.052 5.47551 42.1779 5.26376 42.3861C5.05202 42.5942 4.92128 42.8709 4.89494 43.1667C4.86861 43.4624 4.9484 43.7578 5.12004 44.0001L12.6 51.4801C12.7158 51.5951 12.8532 51.686 13.0042 51.7478C13.1552 51.8096 13.3169 51.841 13.48 51.8401C13.8122 51.8401 14.1313 51.711 14.37 51.4801L21.85 44.0001C22.0848 43.7654 22.2166 43.4471 22.2166 43.1151C22.2166 42.7832 22.0848 42.4648 21.85 42.2301C21.6153 41.9954 21.297 41.8635 20.965 41.8635C20.6331 41.8635 20.3148 41.9954 20.08 42.2301L14.64 47.6701V28.5701C14.6532 24.8744 16.1272 21.3338 18.7405 18.7205C21.3537 16.1073 24.8943 14.6333 28.59 14.6201V14.6201Z"
            fill="black" />
          <path
            d="M58.88 20L51.4 12.48C51.2839 12.3636 51.1459 12.2713 50.9941 12.2082C50.8422 12.1452 50.6794 12.1128 50.515 12.1128C50.3506 12.1128 50.1878 12.1452 50.0359 12.2082C49.8841 12.2713 49.7461 12.3636 49.63 12.48L42.15 20C41.9153 20.2347 41.7834 20.5531 41.7834 20.885C41.7834 21.217 41.9153 21.5353 42.15 21.77C42.3847 22.0047 42.7031 22.1366 43.035 22.1366C43.3669 22.1366 43.6853 22.0047 43.92 21.77L49.36 16.33V35.43C49.36 39.1431 47.885 42.704 45.2595 45.3295C42.634 47.955 39.073 49.43 35.36 49.43H32C31.6685 49.43 31.3505 49.5617 31.1161 49.7961C30.8817 50.0306 30.75 50.3485 30.75 50.68C30.75 51.0115 30.8817 51.3295 31.1161 51.5639C31.3505 51.7983 31.6685 51.93 32 51.93H35.39C37.5554 51.93 39.6995 51.503 41.6997 50.6735C43.6999 49.8439 45.5169 48.628 47.0467 47.0955C48.5764 45.5629 49.789 43.7437 50.6149 41.742C51.4408 39.7403 51.8639 37.5954 51.86 35.43V16.48L57.12 21.73C57.3593 21.9058 57.6533 21.9907 57.9495 21.9694C58.2456 21.9482 58.5245 21.8222 58.7363 21.6141C58.948 21.4059 59.0788 21.1292 59.1051 20.8335C59.1314 20.5378 59.0516 20.2423 58.88 20V20Z"
            fill="black" />
        </svg> Flip</div>
      <div class="slider__item-front">${quest}</div>
      <div class="slider__item-back">${answer}</div>
    `;
    sliderItemsContainer.append(card);
    sliderItems = document.querySelectorAll('.slider__item');
    sliderTotalCards.innerHTML = sliderItems.length;
  }

  function addLS(data, quest, answer) {
    const newCard = {
      question: quest,
      answer: answer,
    };
    data.push(newCard);
    localStorage.setItem('cards', JSON.stringify(data));
  }

  modalEl.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('modal__body')) {
      closeModal();
    }
    if (el.classList.contains('modal__close')) {
      closeModal();
    }
  });

  slider.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('slider__prev')) {
      prevSlider();
    }
    if (el.classList.contains('slider__next')) {
      nextSlider();
    }
    if (el.classList.contains('slider__item-flip')) {
      const slideItem = el.parentNode;
      const slideFront = slideItem.querySelector('.slider__item-front');
      const slideBack = slideItem.querySelector('.slider__item-back');
      slideFront.classList.toggle('flip--disabled');
      slideBack.classList.toggle('flip--active');

      slideItem.animate(
        [
          {transform: 'rotateX(0deg)', opacity: 0},
          {transform: 'rotateX(360deg)', opacity: 1},
        ],
        {duration: 500}
      );
    }
  });

  addCardBtn.addEventListener('click', () => {
    showModal();
  });

  modalFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const el = e.target;
    const questValue = modalTextareas[0].value;
    const answerValue = modalTextareas[1].value;
    modalTextareas.forEach((item) => {
      item.classList.remove('not-valid');
      if (item.value === '' || item.value == null) {
        item.classList.add('not-valid');
        item.focus();
      }
    });

    if (answerValue !== '' && questValue != '') {
      modalTextareas[0].value = '';
      modalTextareas[1].value = '';
      addNewCard(questValue, answerValue);
      addLS(data, questValue, answerValue);
      closeModal();
    }
  });

  clearCardsBtn.addEventListener('click', clearCards);

  function clearCards() {
    localStorage.clear();
    sliderItemsContainer.innerHTML = '';
    sliderCurrent.innerHTML = '0';
    sliderTotalCards.innerHTML = '0';
  }

  sliderTotalCards.innerHTML = sliderItems.length;
});
