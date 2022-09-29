const tablo = document.querySelector('.lastNumber_tablo');
const tablo2 = document.querySelector('.number_tablo');
const clearButton = document.getElementById('clearButton');
const divOperators = document.querySelectorAll('.operators');
const divSumbols = document.querySelectorAll('.sumbols');
let lastInputNumber = '';
let operatorType;
let inputNumber = 0;
tablo.textContent = 0;
tablo2.textContent = 0;
let rez;
let RezultNumber;

/**************************СЛОЖНИЕ***********************************/
function add(number1, number2) {
    rez = Number(number1) + Number(number2);
    return (rez);
};
/********************************************************************/

/**************************ВЧИТАНИЕ**********************************/
function subtract(number1, number2) {
    rez = Number(number1) - Number(number2);
    return (rez);
};
/********************************************************************/

/**************************УМНОЖЕНИЕ*********************************/
function multiply(number1, number2) {
    rez = (Number(number1) * Number(number2));
    return (rez);
};
/********************************************************************/

/**************************ДЕЛЕНИЕ***********************************/
function divide(number1, number2) {
    rez = (Number(number1) / Number(number2));
    return (rez);
};
/********************************************************************/

/**************************ПРОЦЕНТ***********************************/
function percent(number1, number2) {
    rez = ((Number(number1) / 100) * Number(number2));
    console.log(rez);
    tablo.textContent = rez;
};
/********************************************************************/

/**************************ВЫЗОВ ОПЕРАТОРА ВЫЧИСЛЕНИЯ***************************/
function operate(operate, number1, number2) {

    if (operate == '+') { add(number1, number2) };
    if (operate == '-') { subtract(number1, number2) }
    if (operate == '*') { multiply(number1, number2) }
    if (operate == '/') { divide(number1, number2) }
    console.log(number1);
    console.log(operatorType);
    console.log(number2);
    console.log(rez);
    console.log('');
};
/**********************************************************************/

/*******Сброс табло или вывод результата***************************/
function returnTablo() {
    tablo2.textContent = tablo.textContent;
    if (rez) { tablo2.textContent = rez };
    tablo.textContent = 0;
};
/*****************************************************************/

/**********Записываем введеное число и оператор текущий***********/
function rec(event) { 
    operatorType = event;
    /**Записываем в переменную ввод******************/
    inputNumber = lastInputNumber;
    /************************************************/
    /**Сброс переменой вводимого числа*/
    lastInputNumber = '';
    /***********************************/
    console.log(operatorType);
};
/*************************************************************************/

/*****Вычисление промедуточного результата и запись его в переменную*****************/
function promezRezult() {
/*****если промежуточный результат уже есть то**************************/
    if (RezultNumber) {
        console.log('');
        console.log("----------");
        console.log(operatorType);
        operate(operatorType, RezultNumber, lastInputNumber);
        RezultNumber = rez;
        console.log('------');
        console.log('');
    };
/*****если промежуточного результата нет то***********************************/
    if (!RezultNumber) {
        console.log('');
        console.log("----------");
        operate(operatorType, inputNumber, lastInputNumber);
        RezultNumber = rez;
        console.log('------');
        console.log('');
    };
  
};
/************************************************************************/

/**************************ОТСЛЕЖИВАНИЕ ВВОДА ЧИСЕЛ В БРАУЗЕРЕ******************/
divSumbols.forEach((element) => {
    tablo.focus();
    element.addEventListener('click', () => {
        tablo.focus();
        addNumber(element.textContent);
        console.log(element.textContent);
    });
});
/*******************************************************************************/

/**************************ОТСЛЕЖИВАНИЕ ввода ОПЕРАТОРОВ В БРАУЗЕРЕ*****************/
divOperators.forEach(element => {
    element.addEventListener('click', () => {
        if (element.textContent == 'C') { clearInput() };
        /**Если нажимаем оператор***************************************************/
        if (element.textContent == '+') { promezRezult(); rec(element.textContent); returnTablo() };
        /*****************************************************************************/
        if (element.textContent == '-') { promezRezult(); rec(element.textContent); returnTablo() };
        /****************************************************************************/
        if (element.textContent == '*') { promezRezult(); rec(element.textContent); returnTablo() };
        /****************************************************************************/
        if (element.textContent == '/') { promezRezult(); rec(element.textContent); returnTablo() };
        /***************************************************************************/
        if (element.textContent == '%') { 
            if (operatorType == '*') { percent(inputNumber, lastInputNumber); rec(element.textContent) } 
        };
        /***************************************************************************/
        if (element.textContent == '=') { promezRezult(); returnTablo() };
        /****************************************************************************/
        if (element.textContent == '<') { delNumber() };
        /****************************************************************************/
    });
});
/*******************************************************************************/

/*************************ОТСЛЕЖИВАНИЕ ОПЕРАТОРОВ КЛАВИАТУРА************************/
document.addEventListener('keyup', function(event) {
    tablo.focus();
    if (event.key >= 0 && event.key <= 9) {
        addNumber(event.key);
        console.log(event.key);
    };
    if (event.key == "Delete") { clearInput() };  
    if (event.key == 'Enter') { operate(operatorType, inputNumber, lastInputNumber) };
    if (event.key == '+') { rec(event.key) };
    if (event.key == '-') { rec(event.key) };
});
/*********************************************************************************/

/***********************Ввод Цифр************************************************/
function addNumber(event) {
    lastInputNumber = lastInputNumber + event;
    tablo.textContent = lastInputNumber;
};
/*****************************************************************************/

/***********************Удаление последней цыфры числа****************************/
function delNumber() {
    console.log(lastInputNumber);
    let arrInputNumber = Array.from(lastInputNumber);
    arrInputNumber.pop();
    lastInputNumber = arrInputNumber.join('');
    tablo.textContent = lastInputNumber;
};
/*******************************************************************************/

/**************************ОТСЛЕЖИВАНИЕ НАЖАТИЯ КНОПКИ СБРОСА И СБРОС***********/
function clearInput() {
    lastInputNumber = '';
    inputNumber = 0;
    tablo.textContent = 0;
    tablo2.textContent = 0;
    RezultNumber = false;
    rez = 0;
    operatorType = '';
    tablo.focus();
  };
/*******************************************************************************/

console.log(tablo);
