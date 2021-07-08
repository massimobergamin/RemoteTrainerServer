require('dotenv').config();
const DB_URI = process.env.DB_URI;
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(DB_URI,
{
  ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
})

try {
  sequelize.authenticate().then(console.log('Connection has been established successfully.'));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('user', {
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
  birthday: {
    type: DataTypes.DATEONLY,
  },
  sex: {
    type: DataTypes.STRING
  }
});

const Invite = sequelize.define('invite', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invite_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const Workout = sequelize.define('workout', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const Exercise = sequelize.define('exercise', {
  trainer_uid: {
    type: DataTypes.STRING,
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

const Measurement = sequelize.define('measurement', {
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainer_uid: {
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

const Session = sequelize.define('session', {
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  in_use: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

const Plan = sequelize.define('plan', {
  trainer_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_uid: {
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

const Tracker = sequelize.define('tracker', {
  client_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trainer_uid: {
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

const TrainerToClient = sequelize.define('trainertoclient', {
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
    defaultValue: Date.now
  },
});

User.hasMany(Workout);
Workout.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Workout.belongsToMany(Exercise, { through: 'workout_exercise', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Exercise.belongsToMany(Workout, { through: 'workout_exercise', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });

User.hasMany(Exercise);
Exercise.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

User.hasMany(Measurement);
Measurement.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

User.belongsToMany(Plan, { through: 'user_plan', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Plan.belongsToMany(User, { through: 'user_plan', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.belongsToMany(Session, { through: 'user_session', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Session.belongsToMany(User, { through: 'user_session', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasOne(Tracker);
Tracker.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

sequelize.sync();

module.exports = { User, Invite, Workout, Measurement, Exercise, Session, Plan, Tracker, TrainerToClient };