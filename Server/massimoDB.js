const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://pkxgtjwuztfiwc:d47be1eb7435e73c1d1b02177fa7ba64214a5f8766de8d07415def5f5f273fce@ec2-35-174-35-242.compute-1.amazonaws.com:5432/defckmt2cf9m5i') // input heroku connection string

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// placeholder
exports.Measurement = sequelize.define('Measurement', {
  user_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  shoulders: {
    type: DateTypes.INTEGER
  },
  back: {
    type: DateTypes.INTEGER
  },
  chest: {
    type: DateTypes.INTEGER
  },
  bicep: {
    type: DateTypes.INTEGER
  },
  tricep: {
    type: DateTypes.INTEGER
  },
  waist: {
    type: DateTypes.INTEGER
  },
  hips: {
    type: DateTypes.INTEGER
  },
  quad: {
    type: DateTypes.INTEGER
  },
  calf: {
    type: DateTypes.INTEGER
  },
});

exports.ClientPlans = sequelize.define('Client_Plan', {
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

exports.Appointments = sequelize.define('Appointment', {
  meeting_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

exports.Plans = define('Plan', {
  details: {
    type: DataTypes.JSON,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
});


exports.Tracker = define('Tracker', {
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workout: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reps: {
    type: DataTypes.JSON,
    allowNull: false
  },
  sets: {
    type: DataTypes.JSON,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

exports.TrainerClients = define('Trainer_Client', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
});
