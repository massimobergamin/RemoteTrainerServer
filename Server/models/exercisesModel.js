const { Workout, Exercise, User } = require('../db');

exports.getWorkoutsModel = async (trainer_uid) => {

 //find workout by trainer uid include exercises
let workout = await Workout.findAll({ where: {trainer_uid}, include: Exercise })

return workout
  // const workouts = await Workouts.findAll({
  //   where: {
  //     trainer_uid
  //   }
  // });
  // let returnValue = []

  // for (let i = 0; i < workouts.length; i++) {
  //   returnValue.push(workouts[i].dataValues);
  // }

  // let exercises = [];

  // for (let i = 0; i < workouts.length; i++) {
  //   const workoutEx = await WorkoutExercises.findAll({
  //     where: {
  //       workout_id: workouts[i].dataValues.id.toString()
  //     }
  //   });
  //   exercises.push(workoutEx);
  // }

  // let check = [];

  // for (let i = 0; i < exercises.length; i++) {
  //   check.push(exercises[i]);
  // }

  
  // let nextCheck = [];
  // for (let i = 0; i < check.length; i++) {
  //   nextCheck.push([]);
  // }
  // for (let i = 0; i < check.length; i++) {
  //   for (let j = 0; j < check[i].length; j++) {
  //     nextCheck[i].push(check[i][j].dataValues.exercise_id);
  //   }
  // }
  // //console.log(nextCheck);
 
  // let exerciseObjects = [];
  // exerciseObjects.length = nextCheck.length;
  // for (let i = 0; i < nextCheck.length; i++) {
  //   for (let j = 0; j < nextCheck[i].length; j++) {
  //     console.log(nextCheck.length)
  //     if (nextCheck[i].length) {
  //       console.log(nextCheck[i][j])
  //       const exerciseInfo = await Exercises.findAll({
  //         where: {
  //           id: nextCheck[i][j],
  //         }
  //       })
  //       //left off here - for some reason can't get exerciseInfo[0].dataValues
  //       console.log(exerciseInfo[0]);
  //       if (exerciseInfo.length) {
  //         exerciseObjects[i].push(exerciseInfo);
  //       }
  //     }
  //   }
  // }

  // for (let i = 1; i < returnValue.length; i++) {
  //   returnValue[i].exerciseList = returnValue[i].exerciseList || [];
  //   returnValue[i].exerciseList.push(exercises[i]);
  // }
  
  // return returnValue;
};

exports.getExercisesModel = async (trainer_uid) => {
  const exercises = await Exercise.findAll({
    where: {
      trainer_uid
    }
  });
  return exercises;
};

exports.postWorkoutsModel = async (trainer_uid, body) => {
  console.log(Object.values(body))
  const workout = await Workout.create({
    title: body.title,
    trainer_uid
  });
  const trainer = await User.findOne({ where: { user_uid: trainer_uid } })
  //await trainer.addWorkout(workout)
  await workout.setUser(trainer)
  
  for (let i = 1; i < Object.values(body).length; i++) {
    const exercise = await Exercise.findOne({ where: { id: Object.values(body)[i] }});
    console.log(exercise);
    await workout.addExercise(exercise);
  }
  return workout;
};



// for (let i = 1; i < Object.values(body).length; i++) {
//   const workoutEx = await WorkoutExercises.create({
//     workout_id: workout.id,
//     exercise_id: Object.values(body)[i]
//   })
//   await workout.setWorkoutExercises(workoutEx);
// }

exports.postExercisesModel = async (trainer_uid, exerciseInfo) => {
  const exercise = await Exercise.create({
    ...exerciseInfo
  });
  let trainer = await User.findOne({ where: { user_uid: trainer_uid}})
  await exercise.setUser(trainer);
  
  return exercise;
}

exports.storeExercisesModel = async (exerciseInfo) => {
  const exercise = await Exercise.create({
    ...exerciseInfo
  });
  return exercise;
}