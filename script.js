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
  readMoreDiv.style.color = "green";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}
