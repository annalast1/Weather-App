import { myArrayObjects } from "./data";
import "./forecastPageStyle.css";
import { mainPageDom } from "./main";

const myCards = [];
let unit = 'f';

export function displayForecast(arr) {
    console.log(arr);
    const content = document.getElementById('content');
    content.innerHTML = '';    
    const sideBar = document.createElement('div');
    const getMenu = menu();
    sideBar.append(getMenu);
    const fBox = document.createElement('div');
    fBox.id = 'fBox';
    content.append(fBox);
    const currentDay = document.createElement('div');
    currentDay.id = 'currentDay';
    const place = document.createElement('div');
    place.id = 'place';
    place.textContent = arr;
    const todayData = today();
    currentDay.append(place, todayData);
    const next = rest();
    const restOfDays = document.createElement('div');
    restOfDays.id = 'restOfDays';
    const otherDays = document.createElement('div');
    otherDays.id = 'otherDays';
    myCards.forEach(card => {
        otherDays.append(card);
    })
    restOfDays.append(otherDays);
    fBox.append(getMenu, currentDay, restOfDays);
    
      
}

export function dateFormat(arr) {

    const date = new Date(arr.datetime);
    const weekday = date.toLocaleString('en', { weekday: 'short' });
    const day = date.toLocaleString('en', { day: '2-digit' });
    const month = date.toLocaleString('en', { month: 'short' });
    const customDateFormat = `${weekday}, ${day} ${month}`;

    return customDateFormat;
}

function today()  {
    const pic = myArrayObjects[0].icon;
    const card = document.createElement('div');
    const now = dateFormat(myArrayObjects[0]);
    const date = document.createElement('p');
    date.id = 'todayDate';
    date.innerText = now;
    const icon = document.createElement('img');
    icon.id = 'todayIcon';
    icon.src = `./icons/${pic}.svg`;
    const conditions = document.createElement('p');
    conditions.id = 'todayConditions';
    conditions.innerText = myArrayObjects[0].conditions;
    const min = document.createElement('span');
    min.id = 'todayMin';
    min.classList.add('min');
    min.innerText = "Min " + myArrayObjects[0].min + "\u00B0F";
    const max = document.createElement('span');
    max.id = 'todayMax';
    max.classList.add('max');
    max.innerText = "Max " + myArrayObjects[0].max + "\u00B0F";
    card.append(date, icon, conditions, max, min);
    return card;
}

function rest() {
    const l = myArrayObjects.length;
    for (let i = 1; i < l; i++) {
        const pic = myArrayObjects[i].icon;
        const card = document.createElement('div');
        const now = dateFormat(myArrayObjects[i]);
        const date = document.createElement('p');
        date.classList.add('date');
        date.innerText = now;
        const icon = document.createElement('img');
        icon.classList.add('otherIcon');
        icon.src = `./icons/${pic}.svg`;
        const conditions = document.createElement('p');
        conditions.classList.add('conditions');
        conditions.innerText = myArrayObjects[0].conditions;
        const min = document.createElement('span');
        min.classList.add('min');
        min.innerText = "Min " + myArrayObjects[0].min + "\u00B0F";
        const max = document.createElement('span');
        max.classList.add('max');
        max.innerText = "Max " + myArrayObjects[0].max + "\u00B0F";
        card.append(date, icon, conditions, max, min);
        myCards.push(card);
    }
}

function menu() {
    const menuBox = document.createElement('div');
    menuBox.id = 'menuBox';
    const newSearch = document.createElement('button');
    newSearch.id = 'newSearch';
    newSearch.classList.add('btnStyle');
    newSearch.innerText = 'New Search';
    newSearch.addEventListener("click", () => {
        const content = document.getElementById('content');
        content.innerHTML = '';  
        mainPageDom(); 
    })

    const celsius = document.createElement('button');
    celsius.classList.add('btnStyle');
    celsius.id = 'celsius';
    celsius.innerText = '\u00B0C';
    celsius.addEventListener("click", fToC);
    const farenheit = document.createElement('button');
    farenheit.id = 'farenheit';
    farenheit.classList.add('btnStyle');
    farenheit.innerText = '\u00B0F';
    farenheit.addEventListener("click", cToF);
    menuBox.append(newSearch, celsius, farenheit);
    return menuBox;
}

function fToC() {
    if (unit == 'f') {
        // get min/max
        myArrayObjects.forEach(obj => {
            const x = obj.min;
            const c = ((x - 32) * 5/9);
            obj.min = Math.round(c*10)/10;
            const a = obj.max;
            const b = ((a - 32) * 5/9);
            obj.max = Math.round(b*10)/10;
        }) 
        unit = 'c'
        updateDisplay();    
    } else {
        return;
    } 
}

function cToF() {
    if (unit == 'c') {
        // get min/max
        myArrayObjects.forEach(obj => {
            const x = obj.min;
            const c = (x * 9/5) + 32;
            obj.min = Math.round(c*10)/10
            const a = obj.max;
            const b = (a * 9/5) + 32;
            obj.max = Math.round(b*10)/10
        })
        unit = 'f'; 
        updateDisplay(); 
    } else {
        return;
    }          
}

function updateDisplay() {
    let temp = '';
    if (unit == 'f') {
        temp = "\u00B0F"
    } else {
        temp = "\u00B0C"
    }

    const l = myArrayObjects.length;
    const minTemps = document.querySelectorAll('.min');
    const maxTemps = document.querySelectorAll('.max');
    
    // update display with new temp and unit
    for (let i = 0; i < l; i++) {
        minTemps[i].innerText = "Min " + myArrayObjects[i].min + temp;
        maxTemps[i].innerText = "Max " + myArrayObjects[i].max + temp;
    }
}