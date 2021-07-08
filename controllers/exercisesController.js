const { getWorkoutsModel, getExercisesModel, postExerciseModel, postWorkoutModel, storeExerciseModel } = require('../models/exercisesModel');

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await getWorkoutsModel(req.params.trainer_uid);
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await getExercisesModel(req.params.trainer_uid);
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postWorkout = async (req, res) => {
  try {
    const workouts = await postWorkoutModel(req.params.trainer_uid, req.body);
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postExercise = async (req, res) => {
  try {
    const exercise = await postExerciseModel(req.params.trainer_uid, req.body);
    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.storeExercise = async (req, res) => {
  try {
    const exercise = await storeExerciseModel(req.body);
    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
};