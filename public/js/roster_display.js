// VARIABLES

// FUNCTIONS

// function that makes the api get request to /api/owners/roster
function getRoster() {
  // calling getWeeks function here for a test, need to figure out where it will work best
  getWeeks();

  $.ajax({ url: "/api/owners/roster", method: "GET" }).then(function(data) {
    // console.log(data);
    // call the display roster function
    displayRoster(data);

    // roster button listener
    $("#roster-submit").on("click", function(event) {
      event.preventDefault();
      console.log("Clicked!");

      // grab the id again, turn it into a number
      var id = $(this).attr("data-id");
      id = parseInt(id);

      // grab the modpos again, turn it into a number, add 4
      var modPos = $(this).attr("data-modpos");
      modPos = parseInt(modPos);
      modPos += 4;

      // grab selecting again, turn it into a boolean
      var selecting = $(this).attr("data-selecting");
      if (selecting === "true") {
        selecting = true;
      } else {
        selecting = false;
      }
      // turn selecting into false to pass to the api route
      if (selecting === true) {
        selecting = false;
      }

      // grab the email again
      var email = $(this).attr("data-email");

      // grab the name again
      var name = $(this).attr("data-name");

      // grab the initial position again, turn it into a number
      var initPos = $(this).attr("data-initpos");
      initPos = parseInt(initPos);

      // creating the dataObject that will get passed to the put route
      var dataObject = {
        id: id,
        modPos: modPos,
        selecting: selecting,
        email: email,
        name: name,
        initPos: initPos
      };

      // call updateRoster, which is where the PUT request is actually made
      updateRoster(dataObject);
    });
  });
}

// function that takes in the ajax data and builds the roster on the page
function displayRoster(data) {
  // capture the parameter, store it as rawData
  var rawData = data;
  // console.log(rawData.length);

  // select the roster-display hook
  var rosterDislay = $("#roster-list");

  // for loop that's going to build the roster
  for (var i = 0; i < rawData.length; i++) {
    var id = rawData[i].id;
    var name = rawData[i].ownername;
    var initPos = rawData[i].position;
    var modPos = rawData[i].modifiedPos;
    var selecting = rawData[i].selecting;
    var email = rawData[i].email;
    // console.log(id + " " + name + " " + modPos + " " + selecting);

    // builds the individual list item and gives it a class
    var temp = $("<li>" + " " + name + " " + "</li>");
    temp.addClass("list-item");

    // builds the button and gives it some data attributes
    var button = $("<button id='roster-submit'>Submit</button>");
    button.attr("data-id", id);
    button.attr("data-modpos", modPos);
    button.attr("data-selecting", selecting);
    button.attr("data-name", name);
    button.attr("data-email", email);
    button.attr("data-initpos", initPos);

    // I will probably comment this out
    temp.attr("data-id", id);
    temp.attr("data-modpos", modPos);
    temp.attr("data-selecting", selecting);

    // if the selecting is true, the button will appear next to the name
    if (selecting === true) {
      temp.append(button);
    }

    // puts the temp onto the page
    rosterDislay.append(temp);
  }
}

// function that makes the api put request to /api/owners/roster/
function updateRoster(data) {
  $.ajax("/api/owners/roster/selector", {
    type: "PUT",
    data: data
  }).then(function() {
    // reload the page to get the updated list
    // HERE IS WHERE I'M GOING TO NEED ANOTHER AJAX CALL
    location.reload();
  });
}

// function that will get available weeks
function getWeeks() {
  // eslint-disable-next-line prettier/prettier
  $.ajax({url: "/api/weeks/available", method: "GET"}
  ).then(function(dataWeeks){
    dropDownWeeks(dataWeeks);
  });
}

// function that will display available weeks as a dropdown
function dropDownWeeks(data) {
  var rawData = data;
  // console.log(rawData.length)
  // select the weeks-dropdown hook
  var weeksDropdown = $("#weeks-dropdown");

  // builds the selection parent
  var dropDown = $("<select id='weeks'>");

  // for loop to build each selection option for weeks where availabe=true
  for (var i = 0; i < rawData.length; i++) {
    // grabs the data, stores it so it can be used
    var weekId = rawData[i].id;
    var startdate = rawData[i].StartDate;
    var enddate = rawData[i].EndDate;

    // builds the selection
    var option = $("<option>");
    option.text(startdate + " to " + enddate);
    option.attr("value", weekId);
    dropDown.append(option);
  }

  // appends the object to the webpage
  weeksDropdown.append(dropDown);
}

// MAIN PROCESSES

$(document).ready(function() {
  // console.log("roster_display.js connected");
  getRoster();
});
