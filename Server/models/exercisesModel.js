const { Workout, Exercise, User } = require('../db');

exports.getWorkoutsModel = async (trainer_uid) => {
  let workout = await Workout.findAll({ where: {trainer_uid}, include: Exercise });
  return workout;
};

exports.getExercisesModel = async (trainer_uid) => {
  const exercises = await Exercise.findAll({
    where: {
      trainer_uid
    }
  });
  return exercises;
};

exports.postWorkoutModel = async (trainer_uid, body) => {
  const workout = await Workout.create({
    title: body.title,
    trainer_uid
  });
  const trainer = await User.findOne({ where: { user_uid: trainer_uid } });
  await workout.setUser(trainer);

  for (let i = 1; i < Object.values(body).length; i++) {
    const exercise = await Exercise.findOne({ where: { id: Object.values(body)[i] } });
    await workout.addExercise(exercise);
  }
  return workout;
};

exports.postExerciseModel = async (trainer_uid, exerciseInfo) => {
  const exercise = await Exercise.create({
    ...exerciseInfo
  });
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } })
  await exercise.setUser(trainer);
  return exercise;
}

exports.storeExerciseModel = async (exerciseInfo) => {
  const exercise = await Exercise.create({
    ...exerciseInfo
  });
  return exercise;
}