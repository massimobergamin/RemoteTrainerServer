const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres://pkxgtjwuztfiwc:d47be1eb7435e73c1d1b02177fa7ba64214a5f8766de8d07415def5f5f273fce@ec2-35-174-35-242.compute-1.amazonaws.com:5432/defckmt2cf9m5i') // input heroku connection string

const sequelize = new Sequelize('postgres://MassimoBergamin@127.0.0.1:5432/RemoteTrainer2') // input heroku connection string

try {
  sequelize.authenticate().then(console.log('Connection has been established successfully.'));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

exports.Users = sequelize.define('User', {
  user_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: false
  },
  weight: {
    type: DataTypes.DOUBLE,
  },
  height: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: { //changed from age to birthday
    type: DataTypes.DATEONLY,
  },
});

exports.Invites = sequelize.define('Invite', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invite_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

exports.WorkoutExercises = sequelize.define('Workout_Exercise', {
  workout_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exercise_id: { //save auto-gen exercise id
    type: DataTypes.STRING,
    allowNull: false
  },
});

exports.Workouts = sequelize.define('Workout', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

exports.Exercises = sequelize.define('Exercise', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  media: {
    type: DataTypes.STRING,
  },
  muscle_group: {
    type: DataTypes.STRING,
    allowNull: false
  },
  benefits: {
    type: DataTypes.STRING,
  },
});

exports.Measurements = sequelize.define('Measurement', {
  user_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  shoulders: {
    type: DataTypes.INTEGER
  },
  back: {
    type: DataTypes.INTEGER
  },
  chest: {
    type: DataTypes.INTEGER
  },
  bicep: {
    type: DataTypes.INTEGER
  },
  tricep: {
    type: DataTypes.INTEGER
  },
  waist: {
    type: DataTypes.INTEGER
  },
  hips: {
    type: DataTypes.INTEGER
  },
  quad: {
    type: DataTypes.INTEGER
  },
  calf: {
    type: DataTypes.INTEGER
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

exports.Sessions = sequelize.define('Session', {
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

exports.Plans = sequelize.define('Plan', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
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

exports.Tracker = sequelize.define('Tracker', {
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

exports.TrainerClients = sequelize.define('Trainer_Client', {
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
    allowNull: false,
    defaultValue: Date.now // ADDED THISSSSS
  },
});

sequelize.sync();