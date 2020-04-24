// Endpoint
const endpoint =
    'https://api.openweathermap.org/data/2.5/weather?q=Levoca&appid=e8fc4741e6b8855cf1da758b4308c5df';

// Setting variables for all data
[ temp, feelTemp, maxTemp, pressure, humidity, wind, weatherId ] = [ 0 ];
[ weatherStatus ] = '';

// Getting the DOM itmes
[ DOMtemp, DOMfeelTemp, DOMmaxTemp, DOMpressure, DOMhumidity, DOMwind, DOMweatherStatus, DOMicon, DOMupdate ] = [
	document.getElementById('temp'),
	document.getElementById('feelTemp'),
	document.getElementById('maxTemp'),
	document.getElementById('pressure'),
	document.getElementById('humidity'),
	document.getElementById('wind'),
	document.getElementById('weatherStatus'),
    document.querySelector('.imgholder'),
    document.querySelector('.last-update')
];

// Function for getting weather
async function getWeather() {
    // Getting endpoint
	await fetch(endpoint)
		.then((data) => data.json())
		.then((data) => {
            // If status == 200, getting all the data and doing some unit transfer on it
            if(data.cod == 200){
			temp = Math.floor((data.main.temp - 273.15) * 100) / 100; //From Kelvin to Celsium and floor to 2 decimal
			feelTemp = Math.floor((data.main.feels_like - 273.15) * 100) / 100; // K to C and floor for feel temp
			maxTemp = Math.floor((data.main.temp_max - 273.15) * 100) / 100; // K to C and floor for feel temp
			pressure = Math.floor(data.main.pressure * 100) / 100; //Pressure and floor
			humidity = Math.floor(data.main.humidity * 100) / 100;
			wind = data.wind.speed;
			weatherStatus = data.weather[0].main;
            weatherId = data.weather[0].id;
        }else { // If fetch doesnt work, status == 400 or whatsoever render error status and error message on page
            DOMfeelTemp.innerHTML = `<span class='err'>${data.cod}</span>`;
            DOMmaxTemp.innerHTML = `Error message: \xa0 ${data.message}`;
        }
		})

	// Calling icons
	let id = weatherId;
	getIcon(id);
	let link = `http://openweathermap.org/img/wn/${code}@2x.png`;

    // Setting tge date for last update
    const date2 = new Date();
    [hoursUpdate, minutes] = [(date2.getUTCHours() + 1), date2.getUTCMinutes()]

    DOMupdate.innerHTML = `Last updated: \xa0 ${hoursUpdate}:${minutes}`;

	//Rendering DOM Elements
	DOMicon.innerHTML = `<img class='icon' src='${link}' alt="${code}">`;
	DOMtemp.innerHTML = `${temp}<span class='highlight'>°C</span>`;
	DOMfeelTemp.innerHTML = `<i>Feel temperature:</i> \xa0 <span class='high'>${feelTemp}</span><span class='celsius'>°C</span>`;
	DOMmaxTemp.innerHTML = `<i>Today's Maximum Temperature:</i> \xa0 <span class='high'>${maxTemp}</span><span class='celsius'>°C</span>`;
	DOMpressure.innerHTML = `<i>Atmospheric pressure: </i> \xa0 <span class='high'>${pressure}</span>hPa`;
	DOMhumidity.innerHTML = `<i>Humidity: </i> \xa0 <span class='high'>${humidity}</span>%`;
	DOMwind.innerHTML = `<i>Wind:</i> \xa0 <span class='high'>${wind}</span>km/h`;
    DOMweatherStatus.innerHTML = weatherStatus;
        
    // Updating the weather status every 15 minutes
    setInterval(getWeather, 15 * 60 * 1000);
}


// Function for getting icons
function getIcon(id) {

    // Preparation for check if its day or night
	let date = new Date();
	let hours = date.getUTCHours() + 1;
	const dayHours = [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ];
	const nightHours = [ 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6 ];

    //Taking the id of weather and then making code for that will be passed into icon url for right img
	if (id >= 200 && id < 300) {
		//Thunderstorm
		code = '11d';
	} else if ((id >= 300 && id < 400) || (id >= 520 && id <= 531)) {
		//Drizzle.
		code = '09d';
	} else if (id >= 500 && id <= 504) {
		//Rain - 10d
		code = '10d';
	} else if (id == 511) {
		//Snow 13d
		code = '13d';
	} else if (id >= 600 && id <= 622) {
		code = '13d';
	} else if (id >= 700 && id <= 781) {
		//Mist - 50d
		code = '50d';
	} else if (id == 800) {
        // Checking if it is day or night
		if (dayHours.includes(hours)) {
			//Day icon - 01d
			code = '01d';
		} else if (nightHours.includes(hours)) {
			//Night icon - 01n
			code = '01n';
		} else {
			console.error('Invalid time: ', hours);
		}
	} else if (id == 801) {
		if (dayHours.includes(hours)) {
			//Day icon - 02d
			code = '02d';
		} else if (nightHours.includes(hours)) {
			//Night icon - 02n
			code = '02n';
		} else {
			console.error('Invalid time: ', hours);
		}
	} else if (id == 802) {
		if (dayHours.includes(hours)) {
			//Day icon - 03d
			code = '03d';
		} else if (nightHours.includes(hours)) {
			//Night icon - 03n
			code = '03n';
		} else {
			console.error('Invalid time: ', hours);
		}
	} else if (id == 803 || id == 804) {
		// 04d
		code = '04d';
	} else {
		console.error('Invalid Id');
	}
}


function callingCalls () {
    calls++;
    console.clear();
    console.log(calls);
    setTimeout(callingCalls, 3000);
}


// Calling the function
getWeather();
