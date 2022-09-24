// Global variables
var currDate = moment().format('MMMM Do YYYY');
var currTime = moment().format('h:mm:ss a');

var events = JSON.parse(localStorage.getItem("eventsSaved")) || {}; //gets the events saved or just sets to empty object if no objects are saved

var hour = moment().startOf('day').add(8, 'hours');
var currHour = moment().format('h:mm:ss a');
var endHour = moment().endOf('day').subtract(6, 'hours').add(1, 'seconds');

var saveBtn = $('button');

// Functions


// Generates elements on HTML page
function generateElements(hourFormat) {
  var rowEl = $('<div class="row">');
  var hourDisplayEl = $('<div class="col-1 hour">').text(hourFormat);
  var inputEl = $('<input class="col-10">').val(events[hourFormat]);
  var buttonEl = $('<button class="col-1 saveBtn">');
  
  //inserts elements into rows dynamically
  rowEl.append(hourDisplayEl, inputEl, buttonEl);
  
  return rowEl;
}

// Styles time for time past
function styleTime(displayEl, displayedTime) {
  var now = moment();
  var children = displayEl.children();

  if (now.isSame(displayedTime, "hour")) {
    children.addClass("present")
  } else if (now.isBefore(displayedTime, "hour")) {
    children.addClass("future")
  } else if (now.isAfter(displayedTime, "hour")) {
    children.addClass("past")
  }
}

// Saves event in calendar to time
function saveEvent(input, eventHour) {
  events[eventHour] = input;
  localStorage.setItem("eventsSaved", JSON.stringify(events));
  console.log(input, eventHour);

}

//displays current Date
$(`#currentDay`).append(currDate);

// generates Hours and slots of calendar
for ( ; hour < endHour; hour = moment(hour).add(1, 'hours')) {
  var genEl = generateElements(hour.format(`h a`));
  
  styleTime(genEl , hour);
  
  $('#element-container').append(genEl);

}

// generateElements(hour.format('h a')); the (hour.format('h a') is setting the parameter which is being passed to generateElements function above

// Logs current real time
setInterval(function() {
  currTime = moment().format('h:mm:ss a');
}, 1000);

$('.saveBtn').on('click', function() {
  var eventHour = $(this).parent().children().eq(0).text();
  var input = $(this).parent().children().eq(1).val();
  saveEvent(input, eventHour);
  console.log(events);
});
