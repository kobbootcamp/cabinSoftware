module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("schedule", {
    weekID: DataTypes.INTEGER,
    ownerID: DataTypes.INTEGER
  });
  return Schedule;
};




