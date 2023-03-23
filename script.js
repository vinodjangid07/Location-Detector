// preloader script
let preloader = document.getElementById('preloader');
window.addEventListener('load',()=>{
    preloader.style.display = "none";
});

// location script
const button = document.getElementById('button');
const Location = document.getElementById('location')
button.addEventListener("click", ()=>{
    if(navigator.geoLocation){
        Location.innerText = "Allow to detect Location";
        navigator.geoLocation.getCurrentPosition(onSuccess, onError);
    }else{
        Location.innerText = "Your browser not support :(";
    }
});
function onSuccess(position){
    Location.innerText = "Detecting your Location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {county, postcode, country} = allDetails;
        Location.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        Location.innerText = "Something went wrong";
    });
}
function onError(error){
    if(error.code == 1){
        Location.innerText = "You denied the request";
    }else if(error.code == 2){
        Location.innerText = "Location is unavailable";
    }else{
        Location.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}