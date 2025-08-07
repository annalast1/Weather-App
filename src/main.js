import { dataObject } from "./data";


export function mainPageDom() {
    const content = document.getElementById('content');
    const mainBox = document.createElement('div');
    mainBox.id = 'mainBox'; 
    // Main image
    const gifBox = document.createElement('div');
    gifBox.id = 'gifBox';
    

    // Search box
    const textBox = document.createElement('div');
    textBox.id = 'textBox';
    const mainP = document.createElement('div');
    mainP.id = 'mainPageText';
    mainP.textContent = 'Find out what the weather has in store for you';
    const searchBox = document.createElement('div');
    searchBox.id = 'searchBox';
    const searchInput = document.createElement('input');
    searchInput.id = 'location';
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter town, country (e.g. london,uk)';
    searchInput.autocomplete = 'off';
    const getForecast = document.createElement('button');
    getForecast.id = 'getForecastBtn';
    getForecast.classList.add('btnStyle');
    getForecast.textContent = 'Get Forecast';
    getForecast.addEventListener("click", () => {
        const place = searchInput.value;
        dataObject(place);
    });
    searchBox.append(searchInput, getForecast);
    textBox.append(mainP, searchBox)
    mainBox.append(gifBox, textBox);
    content.append(mainBox);
}