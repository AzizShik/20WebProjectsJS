window.addEventListener('load', () => {
  const url = 'https://api.lyrics.ovh/suggest/';
  const urlLyric = 'https://api.lyrics.ovh/v1/artist/title';
  const resultsContainer = document.querySelector('.results__container');
  const resultsInner = document.querySelector('.results__inner');
  const form = document.querySelector('.header__form');
  const searchInput = document.querySelector('.header__form-input');
  const resultsPag = document.querySelector('.results__pag');
  const pagNextBtn = document.querySelector('.results__pag-next');
  const pagPrevBtn = document.querySelector('.results__pag-prev');

  let inputValue;
  let idx = 0;
  let musicsData;

  async function getLyrics(value) {
    const res = await fetch(`${url}${value}`);
    const data = await res.json();
    showLyrics(data);
    musicsData = data;
  }

  function showLyrics(data) {
    console.log(data);
    const dataArr = data.data;
    resultsContainer.innerHTML = '';
    dataArr.forEach((item) => {
      const {cover_small} = item.album;
      const {name} = item.artist;
      const previewMp3 = item.preview;
      const musicName = item.title;
      const lyricItem = document.createElement('div');
      lyricItem.classList.add('results__item');
      lyricItem.innerHTML = `
      <div class="results__item-block">
        <button class="btn results__item-btn">
          <svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485 485"
            style="enable-background:new 0 0 485 485;" xml:space="preserve">
            <g>
              <path d="M0,0v485h485V0H0z M455,455H30V30h425V455z" />
              <polygon points="181.062,148.425 181.062,336.575 343.938,242.5 	" />
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
          </svg>
        </button>
        <audio src="${previewMp3}"></audio>
      </div>
      <div class="results__item-info">
        <div class="results__item-info-block">
          <img
            src="${cover_small}"
            alt="Cover" class="results__item-cover">
          <div class="results__item-music">
            <div class="results__item-artist">${name}</div>
            <div class="results__item-album">${musicName}</div>
          </div>
        </div>
          <button class="results__item-info-btn btn">Get Lyrics</button>
      </div>`;
      resultsContainer.append(lyricItem);
    });
    resultsPag.style.display = 'block';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputValue = searchInput.value;
    searchInput.value = '';
    getLyrics(inputValue);
  });

  resultsContainer.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('results__item-btn')) {
      const item = el.parentNode;
      const audio = item.querySelector('audio');
      musicPlay(audio, el);
      musicProgress(audio);
    }

    if (el.classList.contains('results__item-info-btn')) {
      getLyricsDOM(el);
    }
  });

  function musicPlay(audio, el) {
    const audioPrev = el.parentNode.querySelector('audio');
    const btn = audio.parentNode.querySelector('.results__item-btn');
    const btns = document.querySelectorAll('.results__item-btn');
    const allMusics = document.querySelectorAll('.results__item audio');
    for (let i = 0; i < allMusics.length; i++) {
      if (!allMusics[i].paused && !(allMusics[i] == audioPrev)) {
        allMusics[i].pause();
        btns.forEach((btn) => {
          btn.innerHTML = `<svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485 485"
        style="enable-background:new 0 0 485 485;" xml:space="preserve">
        <g>
          <path d="M0,0v485h485V0H0z M455,455H30V30h425V455z" />
          <polygon points="181.062,148.425 181.062,336.575 343.938,242.5 	" />
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>`;
        });
      }
    }
    if (audio.paused) {
      audio.play();
      btn.innerHTML = `    <svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
      <g id="XMLID_450_">
        <path id="XMLID_451_" d="M315,0H15C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V15
          C330,6.716,323.284,0,315,0z M300,300H30V30h270V300z"/>
        <path id="XMLID_454_" d="M104.25,240.75h121.5c8.284,0,15-6.716,15-15v-121.5c0-8.284-6.716-15-15-15h-121.5
          c-8.284,0-15,6.716-15,15v121.5C89.25,234.034,95.966,240.75,104.25,240.75z"/>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>`;
    } else {
      audio.pause();
      btn.innerHTML = `<svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485 485"
      style="enable-background:new 0 0 485 485;" xml:space="preserve">
      <g>
        <path d="M0,0v485h485V0H0z M455,455H30V30h425V455z" />
        <polygon points="181.062,148.425 181.062,336.575 343.938,242.5 	" />
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
    </svg>`;
    }
  }

  function getLyricsDOM(el) {
    const itemEl = el.closest('.results__item-info');
    const itemClone = itemEl.closest('.results__item').cloneNode(true);
    const artist = itemEl.querySelector('.results__item-artist').innerText;
    const album = itemEl.querySelector('.results__item-album').innerText;
    console.log(artist, album);

    fetch(`https://api.lyrics.ovh/v1/${artist}/${album}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.lyrics);
        if (data.lyrics) {
          resultsContainer.innerHTML = `${data.lyrics.replace(
            /\r\n|\r|\n/g,
            '<br>'
          )}`;
        } else {
          resultsContainer.innerHTML = '';
        }
        resultsContainer.prepend(itemClone);
      });
  }
});
