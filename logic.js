

 // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyD4y7L1sfCTY3DLzVcIhplEclBY_OGLC6E",
  //   authDomain: "traintime-70ae3.firebaseapp.com",
  //   databaseURL: "https://traintime-70ae3.firebaseio.com",
  //   storageBucket: "traintime-70ae3.appspot.com",
  //   messagingSenderId: "691406622709"
  // };
  // firebase.initializeApp(config);
// Initialize Firebase

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4y7L1sfCTY3DLzVcIhplEclBY_OGLC6E",
    authDomain: "traintime-70ae3.firebaseapp.com",
    databaseURL: "https://traintime-70ae3.firebaseio.com",
    storageBucket: "traintime-70ae3.appspot.com",
    messagingSenderId: "691406622709"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
var name =''; var destination = ''; var firstTrainTime = ''; var frequency = ''; var nextTrain = ''; var nextTrainFormatted = ''; var minutesAway = '';
var firstTimeConverted = ''; var currentTime = ''; var diffTime = ''; var timeRemaining = ''; var minutesTillTrain = ''; var keyHolder = '';
var getKey = '';
$(document).ready(function() {
     $("#add-train").on("click", function() {
      event.preventDefault();

      name = $('#name-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrainTime = $('#first-train-time-input').val().trim();
      frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          differentTime = moment().diff(moment(firstTimeConverted), "minutes");
          timeRemaining = diffTime % frequency;
          minutesTillTrain = frequency - timeRemaining;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");
          
      database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,  
        frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillTrain: minutesTillTrain
      });

      $('#name-input').val('');
      $('#destination-input').val('');
      $('#first-train-time-input').val('');
      $('#frequency-input').val('');

      return false;
     });

     database.ref().on("child_added", function(childSnapshot) {
    $('.train-schedule').append("<tr class='table-row' id=" + "'" + "" + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");


}, function(errorObject){
  console.log("Errors handled: " + errorObject.code)
});


$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().attr('id');
     database.ref().on(getKey).remove();
});


}); 

    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions