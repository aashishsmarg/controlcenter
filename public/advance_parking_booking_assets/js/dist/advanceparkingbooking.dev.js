"use strict";

$(function () {
  $('#datetimepicker1').datetimepicker({
    minDate: moment(),
    format: 'YYYY-MM-DD HH:mm:ss' //format: 'DD-MM-YYYY HH:mm'

  }); //-------------------------------------------------------------------------------------------------------------
  //console.log("date11111111")

  $('#datetimepicker2').datetimepicker({
    minDate: moment(),
    format: 'YYYY-MM-DD HH:mm:ss' //format: 'DD-MM-YYYY HH:mm'

  });
}); //---------------------------------------------------------------------------------------------------------------

function calculateParkingAmount() {
  paymentPlanRS = 10;
  var fromDate = new Date($("#datetimepicker1").data().date);
  var toDate = new Date($("#datetimepicker2").data().date);
  var diff = toDate.getTime() - fromDate.getTime();

  if (diff < 0 || isNaN(fromDate)) {
    alert("Start date should not less then end date.");
  } else {
    parkingHr = diff / 3600000;
    parkingDay = Math.round(parkingHr / 24);

    if (parkingDay == 0) {
      parkingAmount = paymentPlanRS;
    } else {
      parkingAmount = parkingDay * paymentPlanRS;
    }

    $("#parkingAmt").val(parkingAmount);
  }
} //-----------------------------------------------------------------------------------------------------------  


function mobilecheck() {
  var mobile = document.getElementById("mobilenumber").value;
  var err1 = document.getElementById("err1"); //console.log(mobile);

  if (mobile.length == 0) {
    err1.innerHTML = "**Plz Enter Number**";
    err1.style.color = "red";
  } else if (isNaN(mobile)) {
    err1.innerHTML = "**Plz Enter Only Number**";
    err1.style.color = "red";
  } else if (mobile.length < 10 || mobile.length > 10) {
    err1.innerHTML = "**Enter 10 Digit Number**";
    err1.style.color = "red";
  } else {
    err1.innerHTML = "";
  }
}

function vehiclenumber_check() {
  var err2 = document.getElementById("err2");
  var veh_num_result = /^([A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{3,4})$/i.test($('#vehiclenumber').val());

  if (veh_num_result.length == 0) {
    err2.innerHTML = "**Enter vehicle number**";
    err2.style.color = "red";
  } else if (veh_num_result) {
    //console.log("1233444444444")
    err2.innerHTML = "";
  } else {
    //console.log("987654321")
    err2.innerHTML = "****Enter valid vehicle number****";
    err2.style.color = "red";
  }
} //------------------------------------------------------------------------------------------------------------------------------------------------

/*$(document).ready(function(){
  $("#button").click(function(){
    alert("1111111111111");
  
   
      
     
   
});
});*/