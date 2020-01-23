/*
Вариант с выбором цен с обьекта.
Отрабатывает просчет на событие Submit.
*/
let cost = document.querySelectorAll('.cost');
let inputCost = document.querySelectorAll('input');
let form = document.forms['window'];
let totalAmount = document.querySelector('.total-amount');
let submit = document.querySelector('.submit');
let costAmount;
let sum = 0, getSum, tempSum = 0;
let regI = /^[1-9]?[0-9]{1,100}$/;


let econom = {
    onesingle: 100,
    twosingle: 100,
    threesingle: 100,
    balkoni: 100,
    delivery: 100,
    reinstall: 100,
    instal: 100,
    windowsill: 100,
    slope: 100,
    tide: 100,
    mosquitoes: 100
}

let standart = {
    onesingle: 200,
    twosingle: 200,
    threesingle: 200,
    balkoni: 200,
    delivery: 200,
    reinstall: 200,
    instal: 200,
    windowsill: 200,
    slope: 200,
    tide: 200,
    mosquitoes: 200
}

let premium = {
    onesingle: 300,
    twosingle: 300,
    threesingle: 300,
    balkoni: 300,
    delivery: 300,
    reinstall: 300,
    instal: 300,
    windowsill: 300,
    slope: 300,
    tide: 300,
    mosquitoes: 300
}



fillCost(econom);       //заполннеие цен на сайте

form.addEventListener('change', (e) => {        //изминение тарифного плана
    if (e.target.checked) {
        if (e.target.value == 'econom') {
            fillCost(econom);
        } else if (e.target.value == 'standart') {
            fillCost(standart);
        } else if (e.target.value == 'premium') {
            fillCost(premium);
        }
    }
});

form.addEventListener('input', (e) => {       //проверка правильности заполнения количества окон

    if (!regI.test(e.target.value) && e.target.type == "text" && e.target.value != 0) {
        e.target.style.color = 'red';
        form.totalAmount.setAttribute('disabled', 'disabled');
    } else {
        e.target.style.color = 'rgb(47, 47, 47)';
        form.totalAmount.removeAttribute('disabled');
    }
});

form.addEventListener('input', (e) => {
    e.preventDefault();
    sum = 0;
    inputCost.forEach((input) => {
        if (input.type == "text" && input.value != 0) {
            sum += +((input.getAttribute('data-price')) * (input.value));
        }
        if (input.type == "checkbox" && input.checked) {
            sum += +((input.getAttribute('data-price')));
        }
    });
    // submit.setAttribute('value', 'Посчитать');
    submit.style.boxShadow = 'none';
    totalAmount.innerHTML = sum;
});

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     sum = 0;
//     inputCost.forEach((input) => {
//         if (input.type == "text" && input.value != 0 ) {
//             sum += +((input.getAttribute('data-price')) * (input.value));
//         }
//         if (input.type == "checkbox" && input.checked) {
//             sum += +((input.getAttribute('data-price')));
//         }
//     });
//     // submit.setAttribute('value', 'Посчитать');
//     submit.style.boxShadow = 'none';
//     totalAmount.innerHTML = sum;
// });

function fillCost(costAmount) {      //обновление цен на сайте
    inputCost.forEach((prices) => {     //перебираем все инпуты и устаавливаем им цену
        let index = prices.getAttribute('id');
        cost.forEach((input) => {       //перебираем страницу и обновляем цены для пользователя
            if (input.classList.contains(index)) {
                input.innerHTML = costAmount[index];
                input.setAttribute('data-price', costAmount[index])
            }
        });
        prices.setAttribute('data-price', costAmount[index])
    });
    sum = 0;
    inputCost.forEach((input) => {
        if (input.type == "text" && input.value != 0) {
            sum += +((input.getAttribute('data-price')) * (input.value));
        }
        if (input.type == "checkbox" && input.checked) {
            sum += +((input.getAttribute('data-price')));
        }
    });
    totalAmount.innerHTML = sum;
}



