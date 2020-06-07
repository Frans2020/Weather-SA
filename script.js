let city = "Johannesburg";
const button = document.querySelector('.btn');
const input = document.querySelector('#search')
button.addEventListener('click',search);

const request = new XMLHttpRequest();
request.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=df72bc4f64d8ca49470dca561bf8bc86&units=metric',true);

request.onload = function(){
    let weather = JSON.parse(request.responseText)
    let temperature = weather.main.temp;
    document.getElementById('temp').innerHTML = temperature.toFixed(0) + '&deg';
    document.getElementById('description').innerHTML = weather.weather[0].description;
    document.getElementById('location').innerHTML = weather.name;
    let pressure = document.createElement('p');
    pressure.textContent = 'Pressure : '+weather.main.pressure; 
    pressure.id = "pressure"; 
    document.querySelector('.side').appendChild(pressure); 

    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity : '+weather.main.humidity;
    humidity.id = 'humidity';
    document.querySelector('.side').appendChild(humidity);

    let temp_max = document.createElement('p');
    temp_max.innerHTML = 'Maximum Temperauture : '+weather.main.temp_max.toFixed(0) + '&deg';
    temp_max.id = 'temp_max';
    document.querySelector('.side').appendChild(temp_max);

    let temp_min = document.createElement('p');
    temp_min.innerHTML = 'Minimum Temperauture : '+weather.main.temp_min.toFixed(0) + '&deg';
    temp_min.id = 'temp_min';
    document.querySelector('.side').appendChild(temp_min);
    
    let image = document.createElement('img');
    image.src = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    image.id = 'icon';
    document.querySelector('.info').appendChild(image);
}
request.send(null); 



function search(event){
    event.preventDefault(); 
    if(input.value == ""){
        alert('Search field cannot be empty');
    }
    else{
        const request = new XMLHttpRequest();
        request.open('GET','https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=df72bc4f64d8ca49470dca561bf8bc86&units=metric',true);  
        
        request.onreadystatechange = function(){  
            if(request.readyState == 4 && request.status == 200){
                let weather = JSON.parse(request.responseText)
                let temperature = weather.main.temp;
                document.getElementById('temp').innerHTML = temperature.toFixed(0) + '&deg';
                document.getElementById('description').innerHTML = weather.weather[0].description;
                document.getElementById('location').innerHTML = weather.name; 
    
                document.getElementById('pressure').innerHTML = 'Pressure : '+ weather.main.pressure;  
    
                document.getElementById('humidity').innerHTML = 'Humidity : '+weather.main.humidity; 
             
                document.getElementById('temp_max').innerHTML ='Maximum Temperauture : '+weather.main.temp_max.toFixed(0) + '&deg';
    
                document.getElementById('temp_min').innerHTML ='Minimum Temperauture : '+weather.main.temp_min.toFixed(0) + '&deg'; 
                 
                document.getElementById('icon').src ="http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
                input.value = "";
            } 
            if (request.readyState == 4 && request.status == 404) {
                alert('Location doesn\'t exist verify and try again....');
            }
        } 
                request.send(null);
    }
       
}

