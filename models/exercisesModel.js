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
  console.log(exercises);
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
    ...exerciseInfo,
    trainer_uid
  });
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } })
  await exercise.setUser(trainer);
  return exercise;
};

exports.storeExerciseModel = async (exerciseInfo) => {
  const exercise = await Exercise.create({
    ...exerciseInfo
  });
  return exercise;
};

exports.getSessionModel = async(meeting_id) => {
  let session = await Session.findOne({ where: { meeting_id } });
  return session;
};