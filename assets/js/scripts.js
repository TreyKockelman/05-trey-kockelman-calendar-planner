// Global variables
var currDate = moment().format('MMMM Do YYYY');
var currTime = moment().format('h:mm:ss a');

var saveBtn = $('.saveBtn');

var events = JSON.parse(localStorage.getItem("eventsSaved")); //gets the events saved or just sets to empty object if no objects are saved

var rowEl = $('<div class="row">');
var hourDisplayEl = $('<div class="col-1 hour">');
var inputEl = $('<input class="col-10 test-block">');
var buttonEl = $('<button class="col-1 saveBtn">');

var hour = moment().startOf('day').add(8, 'hours');
var currHour = moment().format('h:mm:ss a');
var endHour = moment().endOf('day').subtract(6, 'hours').add(1, 'seconds');

// Functions

// Saves event in calendar to time
function saveEvent() {
  localStorage.setItem("eventsSaved", JSON.stringify(events));

}


//displays current Date
$(`#currentDay`).append(currDate);

console.log(hour);
console.log(endHour);

// generates Hours and slots of calendar
if (hour < endHour) {

  //inserts row dynamically
  $('.container').append(rowEl);

  //inserts elements into rows dynamically
  $('.row').append(hourDisplayEl, inputEl, buttonEl);

  hour++;

}


// Logs current real time
setInterval(function() {
  currTime = moment().format('h:mm:ss a');
}, 1000);

saveBtn.on('click', function() {
  saveEvent();
});