// var db = require("../models");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Schedule.findAll({}).then(function(dbSchedule) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbSchedule
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/schedule/:id", function(req, res) {
//     db.Schedule.findOne({ where: { id: req.params.id } }).then(function(dbSchedule) {
//       res.render("example", {
//         example: dbSchedule
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../beta/CoverPage.html"));
  });

  app.get("/contacts", function(req, res) {
    res.sendFile(path.join(__dirname, "../beta/contactpage.html"));
  });

  app.get("/calendar", function(req, res){
    res.sendFile(path.join(__dirname, "../beta/fullcalendar.html"));
  });
};