window.addEventListener('load', () => {
  const addUserBtn = document.getElementById('add-user');
  const doublemoneyBtn = document.getElementById('double-money');
  const millionairesBtn = document.getElementById('show-millionaires');
  const sortRichestBtn = document.getElementById('richest');
  const calculateBtn = document.getElementById('calculate');
  const mainBottomEl = document.querySelector('.main__bottom');

  let usersData = [];

  function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  async function getUser() {
    const resp = await fetch('https://randomuser.me/api/');
    const data = await resp.json();

    const firstName = data.results[0].name.first;
    const lastName = data.results[0].name.last;

    const userData = {
      name: `${firstName}  ${lastName}`,
      money: Math.floor(Math.random() * 1500000),
    };

    addData(userData);
  }

  getUser();
  getUser();
  getUser();

  function addData(obj) {
    usersData.push(obj);

    updateDOM(usersData);
  }

  function updateDOM(obj) {
    mainBottomEl.innerHTML = '';

    obj.forEach((item) => {
      const userEl = document.createElement('div');
      userEl.classList.add('main__user');
      userEl.innerHTML = `
      <span class="main__user-name">${item.name}</span>
      <span class="main__user-cash">${formatMoney(item.money)}</span>
      `;
      mainBottomEl.append(userEl);
    });
  }

  function doubleMoney() {
    usersData = usersData.map((user) => {
      return {...user, money: user.money * 2};
    });
    updateDOM(usersData);
  }

  function showMillionaries() {
    usersData = usersData.filter((user) => user.money > 1000000);
    updateDOM(usersData);
  }

  function sortRichest() {
    usersData.sort((a, b) => b.money - a.money);
    updateDOM(usersData);
  }

  function calculateTotal() {
    const total = usersData.reduce((sum, cur) => {
      return (sum += cur.money);
    }, 0);

    const totalEl = document.createElement('div');
    totalEl.classList.add('main__bottom-total');

    totalEl.innerHTML = `<strong>Total Wealth:</strong> <span>${formatMoney(total)}</span>`;
    mainBottomEl.append(totalEl);
  }

  addUserBtn.addEventListener('click', getUser);
  doublemoneyBtn.addEventListener('click', doubleMoney);
  millionairesBtn.addEventListener('click', showMillionaries);
  sortRichestBtn.addEventListener('click', sortRichest);
  calculateBtn.addEventListener('click', calculateTotal);
});
