$(function(){
  //id currentDay is set to show current date using dayjs library
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  //all classes with saveBtn have a click event, which calls saveInput function
  $('.saveBtn').on('click', saveInput);

//define function saveInput saves the parents of id, and value of second siblings(textarea)
  function saveInput(){
    localStorage.setItem($(this).parents().attr('id'), $(this).siblings().eq(1).val());
  }

//define function to start getting timeblock colors
  function timeBlockColor(){
    //get current hour using dayjs
    var timeNow = dayjs().hour();

    //selecting each class time-block and starting the function and using if else statements to determine what color they get, and adding CSS class together
    $('.time-block').each(function(){
      var secTime = $(this).attr('id');
      if (secTime < timeNow){
        $(this).addClass('past');
      } else if (secTime == timeNow){
        $(this).addClass('present');
      } else{
        $(this).addClass('future');
      }
    })
  }
  //calls timeBlockColor function
  timeBlockColor();

//defines function allDataInput and retrieves data from localstorage and shows in textarea with class description
  function allDataInput(){
    $('.description').each(function(){
      $(this).val(localStorage.getItem($(this).parents().attr('id')));
    })
  }
  //calls allDataInput function
  allDataInput();

})