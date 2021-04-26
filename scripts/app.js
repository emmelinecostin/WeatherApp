const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time'); 
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    // //make local variables 
    // const cityDeets = data.cityDeets;
    // const weather = data.weather;

    //destructure properties (same thing as lines 7-8)
    const {cityDeets, weather } = data; 

    //update details template 
    details.innerHTML = `
    <h5 class="class my-3">${cityDeets.EnglishName}</h5>
        <div class="class my-3">${weather.WeatherText}</div>
        <div class="class dislay-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    //update the day/night and icon images 

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`; 
    icon.setAttribute('src', iconSrc); 

    // Using Ternary Operator (This does the same thing as lines 33-38 )
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'; 

    // let timeSrc = null; 
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'; 
    // } else {
    //     timeSrc = 'img/night.svg'; 
    // }
    time.setAttribute('src', timeSrc); 

    // remove the d-none class if present 
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none'); 
    }

};


const updateCity = async (city) => {

    const cityDeets = await getCity(city);
    const weather = await getWeather(cityDeets.Key);
 
    return {
        cityDeets: cityDeets,
        weather: weather
    }
}

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with the new city 
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    
    // set local storage 
    localStorage.setItem('city', city); 
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err)); 
}
