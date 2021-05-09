const { Workouts, Exercises } = require('../db');

exports.getWorkoutsModel = async (trainer_uid) => {
  const workouts = await Workouts.findAll({
    where: {
      trainer_uid
    }
  });
  return workouts;
};

exports.getExercisesModel = async (trainer_uid) => {
  const exercises = await Exercises.findAll({
    where: {
      trainer_uid
    }
  });
  return exercises;
};

exports.postWorkoutsModel = async (body) => {
  console.log(body);
//   const workout = await db.Workouts.create({
//     title
//   });
//   return workout
};

exports.postExercisesModel = async (exerciseInfo) => {
  const exercise = await Exercises.create({ exerciseInfo });
  return exercise;
}