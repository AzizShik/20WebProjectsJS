window.addEventListener('load', () => {
  const menuBurger = document.querySelector('.menu-burger');
  const menuEl = document.querySelector('.menu');
  const wrapper = document.querySelector('.wrapper');
  const modalOpen = document.querySelector('.header__btn');
  const modalClose = document.querySelector('.modal__content-close');
  const modalEl = document.querySelector('.modal');

  menuBurger.addEventListener('click', () => {
    wrapper.classList.toggle('menu--active');
  });

  menuEl.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('menu__body')) {
      wrapper.classList.remove('menu--active');
    }
  })

  modalOpen.addEventListener('click', () => {
    modalEl.classList.add('modal--active');
  });

  modalClose.addEventListener('click', () => {
    modalEl.classList.remove('modal--active');
  });

  modalEl.addEventListener('click', (e) => {
    const el = e.target;
    if(el.classList.contains('modal__body')) {
      modalEl.classList.remove('modal--active');
    }
  });

});
