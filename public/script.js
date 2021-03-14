/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

/*Changes the images on mouseover*/
$('#Left1').mouseover(function() {
  if ($('#Left1').attr('src') == 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2F00-story-little-mermaid.jpg?v=1615742267632') {
    $('#Left1').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2F1_p_lNGPNqhHw2pP6G-L1WSA.jpg?v=1615742265801');
  }
  else {
    $('#Left1').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2F00-story-little-mermaid.jpg?v=1615742267632');
  }
   });

$('#Left2').mouseover(function() {
  if ($('#Left2').attr('src') == 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2Faladdin-2000.jpg?v=1615742280013') {
    $('#Left2').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2F44b1d7897dda0a44c97fb7570d6419b39e99a04b.jpg?v=1615742274544');
  }
  else {
    $('#Left2').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2Faladdin-2000.jpg?v=1615742280013');
  }
   });

$('#Left3').mouseover(function() {
  if ($('#Left3').attr('src') == 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2Fdisney-e2-80-a2pixar-s-coco-celebrates-a-host-of-brands-in-far-reaching-promotional-campaign.jpg?v=1615742298001') {
    $('#Left3').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2FMoanaPortrait.jpg?v=1615742308049');
  }
  else {
    $('#Left3').attr('src', 'https://cdn.glitch.com/d2abf87c-5b55-4b85-a313-c94daaba6a2c%2Fdisney-e2-80-a2pixar-s-coco-celebrates-a-host-of-brands-in-far-reaching-promotional-campaign.jpg?v=1615742298001');
  }
   });

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
    arrow.className = "arrow circle down icon";
  } else {
    readMoreDiv.style.display = "block";
    arrow.className = "arrow circle up icon";
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

function getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{
    $("#rating").html("You gave a rating of: ");
    for (let i=0; i < userRating; i++){
        $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}

$(".delsong").click(() => confirm('Really delete this song?'))

$(".delplaylist").click(() => confirm('Really delete this playlist?'))