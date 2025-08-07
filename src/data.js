import { displayForecast } from "./forecastPage";

// Get data from server
export async function getWeatherData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next4days?key=KPWFCQ47FJW7Z7SKFGXPM963B`, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        alert("error");
    } 
};

export const myArrayObjects = [];

export async function dataObject(place) {
    const x = await getWeatherData(place);
    x.days.forEach(day => {        
        const obj = {   
        datetime: day.datetime,
        min: day.tempmin,
        max: day.tempmax,
        conditions: day.conditions,
        icon: day.icon
        }
    myArrayObjects.push(obj);  
    })  
    console.log(x.resolvedAddress);
    const address = await x.resolvedAddress;
    displayForecast(address);
};






