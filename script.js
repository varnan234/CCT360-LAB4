// CCT360 Lab 4 - Plant Sitter
// keep the plant alive for 7 days. what you pick each day changes
// the water and sun levels, and if statements decide how the plant is doing

// ---------- variables ----------

var plantName = "";
var day = 1;
var lastDay = 7;
var water = 5;      // 0 to 10
var sun = 5;        // 0 to 10
var health = 3;     // 0 to 5 hearts
var happyDays = 0;  // how many days the plant was happy
var weather = "";   // today's weather
var plantStatus = "";  // happy, thirsty, drowning, droopy or scorched

// stuff saved from last time (localStorage)
var plantsGrown = Number(localStorage.getItem("plantsGrown"));
var lastName = localStorage.getItem("lastName");
var lastResult = localStorage.getItem("lastResult");

// getting stuff from the html
var startScreen = document.getElementById("startScreen");
var gameScreen = document.getElementById("gameScreen");
var endScreen = document.getElementById("endScreen");
var welcome = document.getElementById("welcome");
var nameInput = document.getElementById("nameInput");
var nameMsg = document.getElementById("nameMsg");
var dayText = document.getElementById("dayText");
var weatherText = document.getElementById("weatherText");
var plantPic = document.getElementById("plantPic");
var statusText = document.getElementById("statusText");
var hintText = document.getElementById("hintText");
var waterBar = document.getElementById("waterBar");
var sunBar = document.getElementById("sunBar");
var waterNum = document.getElementById("waterNum");
var sunNum = document.getElementById("sunNum");
var hearts = document.getElementById("hearts");
var log = document.getElementById("log");


// ---------- start screen ----------

// the welcome message changes depending on what happened last time
function showWelcome() {
  if (plantsGrown == 0) {
    welcome.innerHTML = "First time here? Give the plant a name to get started.";
  } else if (lastResult == "bloomed") {
    welcome.innerHTML = "Welcome back! Last time " + lastName + " actually bloomed. Can you do it again?";
  } else if (lastResult == "dead") {
    welcome.innerHTML = "Welcome back. RIP " + lastName + ". Let's try to do better this time.";
  } else {
    welcome.innerHTML = "Welcome back! " + lastName + " made it last time, but no flowers. Go for the bloom.";
  }

  if (plantsGrown > 0) {
    welcome.innerHTML = welcome.innerHTML + " (Plants looked after so far: " + plantsGrown + ")";
  }
}

function startGame() {
  plantName = nameInput.value.trim();

  // check the name
  if (plantName == "") {
    plantName = "Fern";
  }

  if (plantName.toLowerCase() == "groot") {
    alert("I am Groot. (Good name.)");
  } else if (plantName == lastName && lastResult == "dead") {
    alert(plantName + " the Second. Let's hope this one goes better.");
  }

  // reset everything
  day = 1;
  water = 5;
  sun = 5;
  health = 3;
  happyDays = 0;
  plantStatus = "happy";
  log.innerHTML = "";

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  pickWeather();
  showDay();
}


// ---------- each day ----------

// random weather for the day, so you have to plan around it
function pickWeather() {
  var roll = Math.random();

  if (roll < 0.25) {
    weather = "heatwave";
    weatherText.innerHTML = "Forecast: heatwave. The soil will dry out faster today.";
  } else if (roll < 0.5) {
    weather = "cloudy";
    weatherText.innerHTML = "Forecast: cloudy and grey. Not much light coming in.";
  } else {
    weather = "normal";
    weatherText.innerHTML = "Forecast: a normal day.";
  }
}

function doAction(action) {
  var message = "";

  // 1. what the player picked
  if (action == "water") {
    water = water + 4;
    message = "You watered " + plantName + ".";
  } else if (action == "sun") {
    sun = sun + 3;
    message = "You moved " + plantName + " to the window.";
  } else {
    message = "You left " + plantName + " alone.";
  }

  // 2. the plant uses up water and light every day
  water = water - 2;
  sun = sun - 1;

  // 3. weather makes it worse
  if (weather == "heatwave") {
    water = water - 1;
    sun = sun + 1;
  } else if (weather == "cloudy") {
    sun = sun - 1;
  }

  // keep the numbers between 0 and 10
  if (water > 10) water = 10;
  if (water < 0) water = 0;
  if (sun > 10) sun = 10;
  if (sun < 0) sun = 0;

  // 4. decide how the plant is doing
  checkStatus();

  // 5. happy plant gets a heart back, unhappy plant loses one
  if (plantStatus == "happy") {
    happyDays = happyDays + 1;
    if (health < 5) {
      health = health + 1;
    }
  } else {
    health = health - 1;
  }

  addToLog("Day " + day + ": " + message + " " + plantName + " is " + plantStatus + ".");

  // 6. dead, finished, or on to the next day
  if (health <= 0) {
    endGame();
  } else if (day == lastDay) {
    endGame();
  } else {
    day = day + 1;
    pickWeather();
    showDay();
  }
}

// the order matters here, too much water gets checked first
function checkStatus() {
  if (water >= 9) {
    plantStatus = "drowning";
  } else if (water <= 1) {
    plantStatus = "thirsty";
  } else if (sun <= 1) {
    plantStatus = "droopy";
  } else if (sun >= 9) {
    plantStatus = "scorched";
  } else {
    plantStatus = "happy";
  }
}

function showDay() {
  dayText.innerHTML = "Day " + day + " of " + lastDay;

  // picture and text for each plantStatus
  if (plantStatus == "happy") {
    plantPic.src = "happy.svg";
    statusText.innerHTML = plantName + " looks happy.";
  } else if (plantStatus == "thirsty") {
    plantPic.src = "thirsty.svg";
    statusText.innerHTML = plantName + " is thirsty. The leaves are going yellow.";
  } else if (plantStatus == "drowning") {
    plantPic.src = "drowning.svg";
    statusText.innerHTML = plantName + " is drowning. There's water all over the floor.";
  } else if (plantStatus == "droopy") {
    plantPic.src = "droopy.svg";
    statusText.innerHTML = plantName + " is pale and leaning, looking for light.";
  } else if (plantStatus == "scorched") {
    plantPic.src = "thirsty.svg";
    statusText.innerHTML = plantName + " has been in the sun way too long. The leaves are crispy.";
  }

  // hint depending on the numbers
  if (water <= 3) {
    hintText.innerHTML = "The soil feels dry.";
  } else if (water >= 8) {
    hintText.innerHTML = "The soil is soggy. Maybe hold off on watering.";
  } else if (sun <= 2) {
    hintText.innerHTML = "It's pretty dark in this corner.";
  } else if (sun >= 8) {
    hintText.innerHTML = "It's getting a lot of sun right now.";
  } else {
    hintText.innerHTML = "Everything seems fine for now.";
  }

  // meters
  waterBar.style.width = (water * 10) + "%";
  sunBar.style.width = (sun * 10) + "%";
  waterNum.innerHTML = water;
  sunNum.innerHTML = sun;

  // bars go red when they're in the danger zone
  if (water <= 1 || water >= 9) {
    waterBar.classList.add("danger");
  } else {
    waterBar.classList.remove("danger");
  }
  if (sun <= 1 || sun >= 9) {
    sunBar.classList.add("danger");
  } else {
    sunBar.classList.remove("danger");
  }

  // hearts
  var heartText = "";
  for (var i = 0; i < 5; i++) {
    if (i < health) {
      heartText = heartText + "&#9829; ";
    } else {
      heartText = heartText + "&#9825; ";
    }
  }
  hearts.innerHTML = heartText;
}

function addToLog(text) {
  var li = document.createElement("li");
  li.innerHTML = text;
  log.appendChild(li);
}


// ---------- the end ----------

function endGame() {
  var endTitle = document.getElementById("endTitle");
  var endPic = document.getElementById("endPic");
  var endText = document.getElementById("endText");
  var statsText = document.getElementById("statsText");
  var result = "";

  // four possible endings
  if (health <= 0) {
    result = "dead";
    endTitle.innerHTML = plantName + " didn't make it";
    endPic.src = "dead.svg";
    endText.innerHTML = "On day " + day + ", " + plantName + " gave up. Your friend is going to have questions.";
  } else if (health == 5 && happyDays >= 5) {
    result = "bloomed";
    endTitle.innerHTML = plantName + " bloomed!";
    endPic.src = "bloom.svg";
    endText.innerHTML = "Your friend comes home and " + plantName + " is covered in flowers. They ask if you can plant sit again next month.";
  } else if (health >= 3) {
    result = "healthy";
    endTitle.innerHTML = plantName + " made it";
    endPic.src = "happy.svg";
    endText.innerHTML = plantName + " is alive and green. No flowers, but your friend is happy.";
  } else {
    result = "barely";
    endTitle.innerHTML = plantName + " barely made it";
    endPic.src = "droopy.svg";
    endText.innerHTML = plantName + " is still alive, technically. Your friend says thanks, but doesn't look that convinced.";
  }

  statsText.innerHTML = "Happy days: " + happyDays + " out of " + day + ". Hearts left: " + health + ".";

  // save it for next time
  plantsGrown = plantsGrown + 1;
  lastName = plantName;
  lastResult = result;
  localStorage.setItem("plantsGrown", plantsGrown);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("lastResult", lastResult);

  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
}

function playAgain() {
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  nameInput.value = "";
  showWelcome();
}


// ---------- event listeners ----------

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("againBtn").addEventListener("click", playAgain);

document.getElementById("waterBtn").addEventListener("click", function () {
  doAction("water");
});
document.getElementById("sunBtn").addEventListener("click", function () {
  doAction("sun");
});
document.getElementById("restBtn").addEventListener("click", function () {
  doAction("rest");
});

// pressing enter in the name box starts the game too
nameInput.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    startGame();
  }
});

// show the welcome message when the page loads
showWelcome();
