const { getWorkoutsModel, getExercisesModel, postExercisesModel, postWorkoutsModel } = require('../models/exercisesModel');

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

exports.postWorkouts = async (req, res) => {
  try {
    const workouts = await postWorkoutsModel(req.params.trainer_uid, req.body);
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postExercises = async (req, res) => {
  try {
    const exercise = await postExercisesModel(req.params.trainer_uid, req.body);
    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
};