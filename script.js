/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "Hello from the Web App Dev 1 lab!" in the browser's dev tools console
console.log('Hello from the Web App Dev 1 lab!');

function likeIt() {
  alert("Thanks! You're okay too");
}

const showHide = _ => 
{
  let readMoreDiv = document.getElementById("readmore");
  let arrow = document.getElementById("arrowicon");
  readMoreDiv.style.color = "green";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
    arrow.className = "arrow circle right icon";
  } else {
    readMoreDiv.style.display = "block";
    arrow.className = "arrow circle left icon";
  }
}

function welcomeUser() {
  let username = prompt("What's your name?");
  let welcomeUserDiv = document.getElementById("welcomeuser");
  welcomeUserDiv.style.display = "block";
  document.getElementById('welcomeuser').innerHTML = '<p> Hello, ' + username + ', looking forward to hearing your playlists! <em> Click this message to hide it </em> </p>';
  welcomeUserDiv.style.cursor = "pointer";
}

function hideWelcome() {
  let welcome = document.getElementById("welcomeuser");
  welcome.style.display = "none";
}
