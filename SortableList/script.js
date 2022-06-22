window.addEventListener('load', () => {
  const listEl = document.querySelector('.list');
  const checkBtn = document.querySelector('.check-btn');

  const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page',
  ];

  const listItems = [];
  let dragStartIndex;

  function createList() {
    [...richestPeople]
      .map((a) => ({value: a, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .forEach((item, idx) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', idx);
        listItem.classList.add('list__item');
        listItem.innerHTML = `
        <span class="number">${idx + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${item}</p>
        </div>
      `;
        listItems.push(listItem);
        listEl.append(listItem);
      });

    addEventListeners();
  }

  createList();

  function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.list__item');

    draggables.forEach((item) => {
      item.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragleave', dragLeave);
      item.addEventListener('dragenter', dragEnter);
    });
  }

  function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }

  function dragDrop() {
    this.classList.remove('over');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);
  }

  function dragEnter() {}

  function dragOver(e) {
    e.preventDefault();
    this.classList.add('over');
  }

  function dragLeave() {
    this.classList.remove('over');
  }

  function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].append(itemTwo);
    listItems[toIndex].append(itemOne);
  }

  checkBtn.addEventListener('click', checkOrder);

  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const personName = listItem.querySelector('.draggable').innerText.trim();

      if (personName !== richestPeople[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }
});
