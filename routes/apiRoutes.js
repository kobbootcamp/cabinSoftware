/* eslint-disable prettier/prettier */
var db = require("../models");

// require the mailer object
var mailer = require("./mailer");

// next-to-select helper function
function emailNextHelper(nextPerson) {
  db.owners.findOne({
    where: {
      position: nextPerson
    }
  }).then(function (data) {
    var email = data.email;
    var name = data.ownername;
    mailer.sendMessageToNext(email, name);
  });
}




module.exports = function (app) {
  // Get all examples
  app.get("/api/schedule", function (req, res) {
    db.schedule.findAll({}).then(function (dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // Create a new example
  app.post("/api/schedule", function (req, res) {
    db.schedule.create(req.body
      //need to correlate the req.body.?? and the key in the object that is created on the front ed js post for creating a new post
    ).then(function (dbSchedule) {
      res.json(dbSchedule);
    });
  });

  // Delete an example by id
  app.delete("/api/schedule/:id", function (req, res) {
    db.schedule.destroy({ where: { id: req.params.id } }).then(function (dbSchedule) {
      res.json(dbSchedule);
    });
  });

  app.get("/api/weeks", function (req, res) {
    db.owners.findAll({
      include: [db.weeks]
    }).then(function (dbWeeks) {
      res.json(dbWeeks);
    });
  });


  app.post("/api/weeks", function (req, res) {
    db.weeks.create(req.body).then(function (dbWeeks) {
      res.json(dbWeeks);
    });
  });

  app.delete("/api/weeks/ :id", function (req, res) {
    app.weeks.destroy({ where: { id: req.params.id } }).then(function (dbWeeks) {
      res.json(dbWeeks);
    });
  });

  app.get("/api/owners", function (req, res) {
    db.owners.findAll({}).then(function (dbOwners) {
      res.json(dbOwners);
    });
  });

  app.post("/api/owners", function (req, res) {
    db.owners.create(req.body).then(function (dbOwners) {
      res.json(dbOwners);
    });
  });

  app.delete("/api/owners/ :id", function (req, res) {
    db.owners.destroy({ where: { id: req.params.id } }).then(function (dbOwners) {
      res.json(dbOwners);
    });
  });

  // getting owners roster
  app.get("/api/owners/roster", function (req, res) {
    // notice the lowercase "o" on owners, name of the actual table, not the model
    // displays all owners, orders it ascending by modified position
    db.owners.findAll({
      order: [["modifiedPos", "ASC"]]
    // eslint-disable-next-line prettier/prettier
    })
      .then(function(data) {
        res.json(data);
      });
  });

  // updating owners table
  app.put("/api/owners/roster/selector", function (req, res) {
    db.owners.update({
      selecting: req.body.selecting,
      modifiedPos: req.body.modPos
    }, {
      where: {
        id: req.body.id
      }
    }
    ).then(function (data) {

      // the email to the person who just made the selection
      var email = req.body.email;
      var name = req.body.name;
      mailer.sendMessageToCurrent(email, name, "Placeholder 1", "Placeholder 2");

      // sequelize request that will update the the table so the next person's selecting will be set to true
      // if the initial position or initial roster position is anybody but the last person, do this:
      if (req.body.initPos < 4) {
        // pull in the initial position
        var newPos = req.body.initPos;
        // make sure it's a number
        newPos = parseInt(newPos);
        // add one to newPos
        newPos = newPos + 1;
        // update the next person in the roster so their selecting===true
        db.owners.update({
          selecting: true
        }, {
          where: {
            position: newPos
          }
        }
        ).then(function (data) {
          emailNextHelper(newPos);
          res.json(data);
        });
        // if it's the last person, jump back to the first person in the roster
      } else {
        newPos = 1;
        db.owners.update({
          selecting: true
        }, {
          where: {
            position: newPos
          }
        }
        ).then(function (data) {
          emailNextHelper(newPos);
          res.json(data);
        });
      }
    });
  });

  // getting available weeks
  app.get("/api/weeks/available", function (req, res) {
    db.weeks.findAll(
      {
        where: {
          Available: true
        },
        order: [
          ["StartDate", "ASC"]
        ]
      }
    ).then(function (data) {
      res.json(data);
    });
  });

};