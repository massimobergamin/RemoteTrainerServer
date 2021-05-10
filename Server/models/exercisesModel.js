const { Workouts, Exercises, WorkoutExercises } = require('../db');

exports.getWorkoutsModel = async (trainer_uid) => {
  const workouts = await Workouts.findAll({
    where: {
      trainer_uid
    }
  });

  let returnValue = []

  for (let i = 0; i < workouts.length; i++) {
    returnValue.push(workouts[i].dataValues);
  }

  let exercises = [];

  for (let i = 0; i < workouts.length; i++) {
    const workoutEx = await WorkoutExercises.findAll({
      where: {
        workout_id: workouts[i].dataValues.id//.toString()
      }
    });
    exercises.push(workoutEx);
  }
  //console.log(returnValue);

  for (let i = 0; i < returnValue.length; i++) {
    console.log(exercises[i])
    returnValue[i].exerciseList = returnValue[i].exerciseList || [];
    returnValue[i].exerciseList.push(exercises[i]);
  }
  return returnValue;

};

exports.getExercisesModel = async (trainer_uid) => {

  const exercises = await Exercises.findAll({
    where: {
      trainer_uid
    }
  });
  return exercises;
};

exports.postWorkoutsModel = async (trainer_uid, body) => {
  console.log(body);
  const workout = await Workouts.create({
    title: body.title,
    trainer_uid
  });

  for (let i = 1; i < Object.values(body).length; i++) {
    const workoutEx = await WorkoutExercises.create({
      workout_id: workout.id,
      exercise_id: Object.values(body)[i]
    })
  }
  return workout;
};

exports.postExercisesModel = async (exerciseInfo) => {
  const exercise = await Exercises.create({
    ...exerciseInfo
  });
  return exercise;
}