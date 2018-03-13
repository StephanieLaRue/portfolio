'use strict'
let counterTotal = 0; //days active
displayInput()
getStreak()

$(document).ready(function() {
  $('#addWorkout').on('click', function() {
    createInput();
  })
})



function displayEntry(entry) {

  let div2 = document.createElement('div');
  div2.className = "entryContainer";

  let cardioSpan = document.createElement('span')
  cardioSpan.className = "cardioSpan";
  let cardioVal = document.createTextNode(entry.cardio)
  cardioSpan.appendChild(cardioVal)

  let strengthSpan = document.createElement('span')
  strengthSpan.className = "strengthSpan";
  let strengthVal = document.createTextNode(entry.strength)
  strengthSpan.appendChild(strengthVal)

  let timeSpan = document.createElement('span')
  timeSpan.className = "timeSpan";
  let timeVal = document.createTextNode(entry.time)
  timeSpan.appendChild(timeVal)

  div2.appendChild(cardioSpan);
  div2.appendChild(strengthSpan);
  div2.appendChild(timeSpan);
  return div2;
}

function displayInput() {

  let stringObject = localStorage.getItem('inputList');
  let parsedObject = JSON.parse(stringObject);

  let ul = document.getElementById('entryList');
  if(!parsedObject) { parsedObject = []; }

  let entryList = document.getElementById('entryList');
  entryList.innerHTML = "";

  for(let ind = 0; ind < parsedObject.length; ind++) {

    let today = createDate()
    let dateDiv = document.createElement('div');
    let dateText = document.createTextNode(today);
    dateDiv.className = 'date';
    dateDiv.appendChild(dateText);

    let newEntry = document.createElement('li');
    newEntry.className = "li";
    newEntry.appendChild(dateDiv);

    let newEntryDiv = displayEntry(parsedObject[ind]);
    newEntry.appendChild(newEntryDiv);

    let removeButton = document.createElement('button');
    let removeText = document.createTextNode('Remove');
    removeButton.className = "removeButton";
    removeButton.appendChild(removeText);
    newEntry.appendChild(removeButton);

    removeButton.onclick = function () {
      parsedObject.splice(ind, 1)
      let stringObject = JSON.stringify(parsedObject)
      localStorage.setItem('inputList', stringObject)
      this.parentNode.parentNode.removeChild(this.parentNode);
      removeFromStreak()
    }

    let entryList = document.getElementById('entryList');
    entryList.prepend(newEntry);
  }
}

function createDate() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth()+1;
  let year = today.getFullYear();

  if(day < 10) {
    day = '0' + day;
  }

  if(month < 10) {
    month = '0' + month;
  }

  today = month + '/' + day + '/' + year;
  return today
}

function createInput() {

  let today = createDate()
  let dateDiv = document.createElement('div');
  let dateText = document.createTextNode(today);
  dateDiv.className = 'date';
  dateDiv.appendChild(dateText);

  let newEntry = document.createElement('li');
  newEntry.appendChild(dateDiv);
  newEntry.className = "li";

  let obj = {
    cardio: "",
    strength: "",
    time: ""
  }

  let input = document.getElementsByClassName('fitList');

  let allSelect = Array.prototype.every.call(input, function(e, index) {
    let inputVal = e.options[e.selectedIndex].text
    return inputVal === "Select";
  })

  if(allSelect) {
    alert("Please select a workout option");
    return;
  }

  Array.prototype.forEach.call(input, function(e, index) {
    let inputVal = e.options[e.selectedIndex].text

    if (index === 0 && inputVal !== "Select") {
      obj.cardio = inputVal;
    }
    if (index === 1 && inputVal !== "Select") {
      obj.strength = inputVal;
    }
    if (index === 2 && inputVal !== "Select") {
      obj.time = inputVal;
    }
  })


  let storeObject = (newInput) => {
    if(!newInput) { newInput = {}; }

    let storedArray = localStorage.getItem('inputList') // Starts as string
    if(!storedArray || !storedArray.length) { storedArray = "[]"; } // If first entry
    let parsedArray = JSON.parse(storedArray)           // Turn into array

    parsedArray.unshift(newInput)                       // Insert object into array

    let stringArray = JSON.stringify(parsedArray);      // Turn back into string to store
    localStorage.setItem('inputList', stringArray)      // Store in localStorage as string
  }

  storeObject(obj)
  // let newEntryDiv = displayEntry(obj)
  //
  // newEntry.appendChild(newEntryDiv);
  //
  // let entryList = document.getElementById('entryList');
  // entryList.prepend(newEntry);
  displayInput()
  addToStreak()
}

function getStreak() {
  let streakNum = localStorage.getItem('streakCounter');
  if(!streakNum) {
    localStorage.setItem('streakCounter', JSON.stringify(counterTotal))
    streakNum = 0;
  }
  let counter = document.getElementById('counterNum');
  counter.innerHTML = parseInt(streakNum);
  counterTotal = streakNum
}

function addToStreak() {
  counterTotal++;
  localStorage.setItem('streakCounter', JSON.stringify(counterTotal))
  updateStreak()
}

function removeFromStreak() {
  // let counter = document.getElementById('counterNum');
  // counter.innerHTML = counterTotal;
  counterTotal--;
  localStorage.setItem('streakCounter', JSON.stringify(counterTotal))
  updateStreak()
}

function updateStreak() {
  let counter = document.getElementById('counterNum');
  counter.innerHTML = counterTotal;
}

function weeklyLog() {
  let date = new Date("Sunday, December 10, 2017");
  let daysOfWeek = [];
  // for(let did = new Date)
  let day = date.getDay();
  console.log(day)
}

weeklyLog()
