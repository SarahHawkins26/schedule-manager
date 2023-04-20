// // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// // the code isn't run until the browser has finished rendering all the elements
// // in the html.
// $(function () {
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });
$(function (){
  //SETS CURRENT DAY AT TOP OF CALENDER
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // var timeblock = document.querySelectorAll('.time-block');


//get stored events from localstorage or initialize empty object
  var storeEvents = JSON.parse(localStorage.getItem('events')) || {};
  //show stored events in corresponding time blocks
  $.each(storeEvents, function (time, event){
    $('#' + time + ' textarea').val(event);
  });


//sets colors of the time blocks based on current time
function setTimeBlockColor() {
    //get the current hour
    var currentHour = dayjs().hour();

//looks through time blocks and sets color on current hour
  $('.time-block').each(function (){
    //gets hour from id attribute
    var hour = $(this).attr('id')

// adds the right class based on current hour
    if (hour < currentHour){
      $(this).addClass('past');
    } else if (hour === currentHour){
      $(this).addClass('present');
    } else{
      $(this).addClass('future');
    }
  });
}
  //calls setTimeBlockColor function 
setTimeBlockColor();

//when save button is clicked user input saves to localstorage
$('.saveBtn').on('click', function (){
  //gets hour from id attribute of timeblock containing button
  var hour = $(this).parent('.time-block').attr('id');
  //gets the user input from textarea of timeblock
  var event = $(this).siblings('.description').val();
  //update storedevents object with new event
  storeEvents[hour] = event;
  //saves updated storeevents to localstorage
  localStorage.setItem('events', JSON.stringify(storeEvents));
});


});
