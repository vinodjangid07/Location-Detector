// preloader script
let preloader = document.getElementById('preloader');
window.addEventListener('load',()=>{
    preloader.style.display = "none";
});

// LocationHeading script
const button = document.getElementById("button");
const Heading = document.getElementById("locationHeading");
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        Heading.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        Heading.innerText = "Your browser not support";
    }
});
function onSuccess(position){
    Heading.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5e70e8753b3546f39c7d4b82e13989ec`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {county, postcode, country} = allDetails;
        Heading.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        Heading.innerText = "Something went wrong";
    });
}
function onError(error){
    if(error.code == 1){
        Heading.innerText = "You denied the request";
    }else if(error.code == 2){
        Heading.innerText = "Location is unavailable";
    }else{
        Heading.innerText = "Something went wrong";
    }
    // button.setAttribute("disabled", "true");
}