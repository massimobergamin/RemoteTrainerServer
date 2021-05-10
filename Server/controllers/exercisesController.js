const models = require('../models/exercisesModel');
const {getWorkoutsModel, getExercisesModel, postExercisesModel, postWorkoutsModel} = models;

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await getWorkoutsModel(req.params.trainer_uid);
    res.status(200);
    res.send(workouts);
  } catch (error) {
    res.status(500);
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await getExercisesModel(req.params.trainer_uid);
    res.status(200);
    res.send(exercises);
  } catch (error) {
    res.status(500);
  }
};

exports.postWorkouts = async (req, res) => {
  try {
    const workouts = await postWorkoutsModel(req.params.trainer_uid, req.body);
    res.status(200);
    res.send(workouts);
  } catch (error) {
    res.status(500);
  }
};

exports.postExercises = async (req, res) => {
  try {
    const exercise = await postExercisesModel(req.body);
    res.status(200);
    res.send(exercise);
  } catch (error) {
    res.status(500);
  }
};