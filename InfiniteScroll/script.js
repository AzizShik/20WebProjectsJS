window.addEventListener('load', () => {
  const postsEl = document.querySelector('.posts');
  const circleInner = document.querySelector('.circle__inner');
  const filter = document.querySelector('.filter__input');

  let limit = 5;
  let page = 1;

  async function getPosts() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();
    showPosts(data);
  }

  function showPosts(data) {
    data.forEach((item) => {
      const post = document.createElement('div');
      post.classList.add('post');
      post.innerHTML = `
        <div class="post__numb">${item.id}</div>
        <div class="post__title">${item.title}</div>
        <div class="post__descr">${item.body}</div>`;
      postsEl.append(post);
    });
  }

  function showAnim() {
    const {clientHeight, scrollTop, scrollHeight} = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight) {
      circleInner.classList.add('show');

      setTimeout(() => {
        circleInner.classList.remove('show');
        setTimeout(() => {
          page++;
          getPosts();
        }, 500);
      }, 1000);
    }
  }

  function filterPosts() {
    const value = filter.value.toLowerCase();
    console.log(value);
    const postsTitles = document.querySelectorAll('.post__title');

    postsTitles.forEach((item) => {
      if (item.innerText.indexOf(value) > -1) {
        item.parentNode.style.display = 'block';
      } else {
        item.parentNode.style.display = 'none';
      }
    });
  }

  window.addEventListener('scroll', showAnim);
  filter.addEventListener('input', filterPosts);
  getPosts();
});
