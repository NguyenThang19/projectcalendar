$(document).ready(function(){
  //Get Current Date, Month, Year and day
  let date = new Date();
  let arrDateTime = [];
  // Month Array
  const arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arrWeeks = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  // Function Generate Calendar
  const generateCalendar = () => {
       // Get Last Day of Current Month
      const lastDayCurrent = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
      // Get First Day of Current Month
      const firstDayCurrent = new Date(date.getFullYear(),date.getMonth(),1).getDay();
      // Get Last Day Prev Month
      const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
      // Get next Day of Next Month
      const currLastDayOfWeek = new Date(date.getFullYear(), date.getMonth()+1,0).getDay();
      let nextDayOfNextMonth = 7 - currLastDayOfWeek - 1;
      $('.month').html(arrMonth[date.getMonth()]);
      $('.year').html(date.getFullYear());
      let days = "";

      // Prev Days of Prev Month
      for(let x = firstDayCurrent - 1; x > 0; x--){
          days += `<div class="prev-days">${prevLastDay - x + 1}</div>`;
      }
      
      if( firstDayCurrent === 0){
          for( let k = 6; k > 0; k--){
              days +=`<div class="prev-days">${prevLastDay - k}</div>`
          }
      }

      // Days of Current Month
      for(let i = 1; i <= lastDayCurrent; i++){
         
          if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
              days += `<div class="to-day curr-Day">${i}</div>`;
         }else{
          days += `<div>${i}</div>`;
         }
      }

      // Days of Next Day 
      for(j=1; j <= nextDayOfNextMonth + 1; j ++ ){
          days += `<div class = "next-days">${j}</div>`;
          $('.calendar-days').html(days);
      };

      // Choise Day
      $('.calendar-days div').click( function () {
        $('.calendar-days > div.to-day').removeClass("to-day");
        $(this).addClass('to-day');
      })
  };
  
  // To Prev Month
  $('.prev-month').click( () => {
      date.setMonth(date.getMonth()-1);
      generateCalendar();
  });

  // To Next Month
  $('.next-month').click( () => {
      date.setMonth(date.getMonth()+1);
      generateCalendar();
  });
  generateCalendar();

  // Function TIME PICKER SECTION
  const timPicker = () => {
      let hours = "";
      let minutes = "";
      let setHours = [];
      let setMinutes = [];
  
      // Set time 
      function setHour (){
        for(let i = 0; i < 24; i++){
          setHours.push(i);
        }
      };

      function setMinute(){
        for(let i = 0; i < 60; i++){
          if(i < 10)
          {
            i = "0"+i;
          }
          setMinutes.push(i);
        }
      };
  
      setHour();
      setMinute();
      const updateTime = () => {
        // Current hour
      let curHour = date.getHours();

      // Current Minutes
      let curMinute=date.getMinutes();
      // Pick Time
      // Hour
      $("#example-picker").picker({
          data: setHours,
          lineHeight: 30,
          selected: curHour
        }, function (s) {
          hours = `${s}`;
          arrDateTime[0] = hours;
          $(".example-picker").data("value", s);
          let getContentHours = $(`#example-picker > .picker-scroller > .option:nth(${s})`).html();
          let getElementsHour = $(`#example-picker > .picker-scroller > .option:nth(${s})`);
          let getElementHours = $(`#example-picker > .picker-scroller > .option`);
          if(getContentHours === s){
            getElementHours.removeClass('font-style-timepicker');
            getElementHours.removeClass('f-14');
            getElementHours.css('opacity', '0.5');
            getElementsHour.addClass('font-style-timepicker');
            $(`#example-picker .picker-scroller > .option:nth(${s-2})`).addClass('f-14');
          }
        });    
        
      //   Minute
        $("#example-pickers").picker({
          data: setMinutes,
          lineHeight: 30,
          selected: curMinute
        }, function (s) {
          minutes = `${s}`;
          arrDateTime[1] = minutes;
          $(".example-pickers").data("value", s);
          let getContentHours = $(`#example-pickers .picker-scroller > .option:nth(${s})`).html();
          let getElementsHour = $(`#example-pickers .picker-scroller > .option:nth(${s})`);
          let getElementHours = $(`#example-pickers .picker-scroller > .option`);
          if(getContentHours === s){
            getElementHours.removeClass('font-style-timepicker');
            getElementHours.removeClass('f-14');
            getElementHours.css('opacity', '0.5');
            getElementsHour.addClass('font-style-timepicker');
            $(`#example-pickers .picker-scroller > .option:nth(${s-2})`).addClass('f-14');
          }
        });
      }
      updateTime();
    }

  // Reset Calendar
  function resetCalendar(){
    $('.calendar-days > div.to-day').removeClass("to-day");
    $('.calendar-days').find(".curr-Day").addClass("to-day");
  }

  timPicker();

  // Choise Day
  function choiseDate(){
    let dayChoise = $('.calendar-days > .to-day').html();
    let monthChoise = $('.calendar-month-years > .month').html();
    let yearChoise = $('.calendar-month-years > .year').html();
    let weekDayChoise = arrWeeks[new Date(yearChoise, monthChoise - 1, dayChoise).getDay()];
    arrDateTime[2] = weekDayChoise;
    arrDateTime[3] = dayChoise;
    arrDateTime[4] = monthChoise;
    arrDateTime[5] = yearChoise;
  }

  // Form Input Click
  $("#input-date").click( function (event){
    $("#input-date").val("");
    $('.container-calendar').css('display','block');
    $('.calendar-section').css('animation', 'moveshowcalendarsection 0.4s ease');
    resetCalendar();
    generateCalendar();
    timPicker();
  });
  // Event Button Save
  $(".btn-save").click( () => {
    choiseDate();
    $('#input-date').val(`${arrDateTime[0]} : ${arrDateTime[1]} - ${arrDateTime[2]} / ${arrDateTime[3]} / ${arrDateTime[4]} / ${arrDateTime[5]}`);
    $('.container-calendar').css('display', 'none');
  });



  // Bullbing Events
  $('.container-calendar').click( () => {
    $('.container-calendar').css('display', 'none');
  } );

  $('.calendar-section').click( (event) => {
    event.stopPropagation();
  });
})