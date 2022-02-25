window.addEventListener('load', () => {
  const movieSelect = document.getElementById('movieSelect'),
    movieContainer = document.querySelector('.movie__container'),
    movieSeats = document.querySelectorAll('.movie__container-seat'),
    movieInfoSeat = document.querySelector('.movie__info-seats'),
    movieInfoPrice = document.querySelector('.movie__info-price');


  function updateMoviePick() {
    const moviePriceLS = Number(localStorage.getItem('moviePrice'));
    if (moviePriceLS !== null) {
      movieSelect.value = moviePriceLS;
    }
  }

  function updatePrice() {
    const selectedLength = document.querySelectorAll('.selected').length;
    movieInfoPrice.textContent = movieSelect.value * selectedLength;
    movieInfoSeat.textContent = selectedLength;
  }

  let selectedSeatsIdx = [];

  function updateLS() {
    const selectedSeatsLS = JSON.parse(localStorage.getItem('seatsIdx'));
    movieSeats.forEach((item, idx) => {
      if (selectedSeatsLS.indexOf(idx) > -1) {
        item.classList.add('selected');
      }
    });
  }

  movieContainer.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('movie__container-seat') && !(el.classList.contains('occupied'))) {
      el.classList.toggle('selected');
      const selectedSeats = document.querySelectorAll('.selected');
      selectedSeatsIdx = [...selectedSeats].map(seat => [...movieSeats].indexOf(seat));
      localStorage.setItem('seatsIdx', JSON.stringify(selectedSeatsIdx));
      updatePrice();
    }
  });

  movieSelect.addEventListener('change', () => {
    updatePrice();
    localStorage.setItem('moviePrice', movieSelect.value);
  });



  updateLS();
  updateMoviePick();
  updatePrice();



});