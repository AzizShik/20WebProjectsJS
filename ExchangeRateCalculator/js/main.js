window.addEventListener('load', () => {
  const api =
    'https://v6.exchangerate-api.com/v6/458ff757c1e490624f8671c3/latest/';
  const calculatorEl = document.querySelector('.calculator');
  const inputs = document.querySelectorAll('.input');
  const topInput = document.querySelector('#topInput');
  const bottomInput = document.querySelector('#bottomInput');
  const calcRate = document.querySelector('.calculator-rate');
  const selects = document.querySelectorAll('select');
  const topSelect = document.getElementById('topSelect');
  const bottomSelect = document.getElementById('bottomSelect');
  const swapBtn = document.querySelector('#swap');

  inputs.forEach((item) => {
    item.addEventListener('input', (e) => {
      const el = e.target;
      el.value = el.value.replace(/[^0-9.]/g, '');
    });
  });

  function getExchangeApi() {
    fetch(api + 'USD')
      .then((res) => res.json())
      .then((data) => {
        const convData = data.conversion_rates;
        console.log(data);
        selectOptions(convData, '#topSelect', 'USD');
        selectOptions(convData, '#bottomSelect', 'EUR');
        calculator(convData);
      });
  }

  calculatorEl.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('plus-btn')) {
      const parent = el.closest('.incrementer');
      const input = parent.querySelector('.input');
      input.value = Number(input.value) + 1;

      rateCalc(selects[0].value);
    }

    if (el.classList.contains('minus-btn')) {
      const parent = el.closest('.incrementer');
      const input = parent.querySelector('.input');

      rateCalc(selects[0].value);
      if (input.value <= 0) {
        input.value = 0;
      } else {
        input.value = Number(input.value) - 1;
      }
    }

    if (el.classList.contains('calculator-swap')) {
      const temp = selects[0].value;
      selects[0].value = selects[1].value;
      selects[1].value = temp;

      rateCalc(selects[0].value);
    }
  });

  function selectOptions(data, element, selected) {
    const arr = Object.keys(data);
    arr.forEach((item) => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      const parent = document.querySelector(element);
      if (item === selected) {
        option.selected = true;
      }
      parent.append(option);
    });
  }

  selects[0].addEventListener('input', () => {
    rateCalc(selects[0].value);
  });
  selects[1].addEventListener('input', () => {
    rateCalc(selects[0].value);
  });

  function calculator(data) {
    topInput.value = topInput.value * data[selects[0].value];
    bottomInput.value = (data[selects[1].value] * topInput.value).toFixed(3);

    calcRate.textContent = `1 ${selects[0].value} = ${data[
      selects[1].value
    ].toFixed(3)} ${selects[1].value}`;
  }

  function rateCalc(data) {
    fetch(api + data)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        calculator(data.conversion_rates);
      });
  }

  getExchangeApi();
});
