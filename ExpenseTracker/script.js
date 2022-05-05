window.addEventListener('load', () => {
  const addBtn = document.querySelector('.add__btn');
  const textInput = document.querySelector('#text');
  const amountInput = document.querySelector('#amount');
  const historyCards = document.querySelector('.history__cards');
  const incomeSpan = document.querySelector('.balance__block-income-span');
  const expenseSpan = document.querySelector('.balance__block-expense-span');
  const balanceNumb = document.querySelector('.balance__numb');
  let cardsObj = [];

  if (localStorage.getItem('cards') !== null) {
    cardsObj = JSON.parse(localStorage.getItem('cards'));
    for (let i = 0; cardsObj.length > i; i++) {
      const card = document.createElement('div');
      card.classList.add('history__card');
      if (cardsObj[i].amount[0] === '+') {
        card.classList.add('history__card-income');
      } else {
        card.classList.add('history__card-expense');
      }
      card.innerHTML = `
      <span class="history__card-delete">X</span>
      <span class="history__card-title">${cardsObj[i].text} </span>
      <span class="history__card-numb">${cardsObj[i].amount}</span>
      `;
      historyCards.append(card);
    }
    incomeCount();
  }

  addBtn.addEventListener('click', () => {
    addHistoryCard();
  });

  historyCards.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('history__card-delete')) {
      removeLS(el.parentNode);
      el.parentNode.remove();
      incomeCount();
    }
  });

  function addHistoryCard() {
    const text = textInput.value;
    const amount =
      amountInput.value > 0
        ? `+$${amountInput.value}.00`
        : `-$${Math.abs(amountInput.value)}.00`;
    const historyClass =
      amountInput.value > 0 ? 'history__card-income' : 'history__card-expense';
    const card = document.createElement('div');
    card.classList.add('history__card');
    card.classList.add(historyClass);
    card.innerHTML = `
    <span class="history__card-delete">X</span>
    <span class="history__card-title">${text} </span>
    <span class="history__card-numb">${amount}</span>
    `;
    historyCards.append(card);
    reloadLS(text, amount);
    incomeCount();

    textInput.value = '';
    amountInput.value = '';
  }

  function reloadLS(text, amount) {
    incomeCount();
    cardsObj.push({
      text,
      amount,
    });
    localStorage.setItem('cards', JSON.stringify(cardsObj));
  }

  function removeLS(parent) {
    incomeCount();
    const titleEl = parent.querySelector('.history__card-title');
    const title = titleEl.textContent.trim();
    cardsObj.forEach((item, idx) => {
      if (item.text == title) {
        cardsObj.splice(idx, 1);
      }
    });
    localStorage.setItem('cards', JSON.stringify(cardsObj));
  }

  function incomeCount() {
    let income = 0;
    let expense = 0;
    let balance = 0;
    const numbers = document.querySelectorAll('.history__card-numb');
    numbers.forEach((item) => {
      const content = item.textContent;
      const numb = parseFloat(content.slice(0, -3).slice(2));
      if (content[0] === '+') {
        income += numb;
        console.log(income);
      } else {
        expense += numb;
      }
    });
    incomeSpan.textContent = `$${income}.00`;
    expenseSpan.textContent = `$${expense}.00`;
    balanceNumb.textContent = `$${income - expense}.00`;
  }
});
