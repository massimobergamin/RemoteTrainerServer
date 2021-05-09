const models = require('../models/plansModel');
const { postPlansModel, modifyPlansModel, getTrainerWorkoutsModel, getClientPlansModel, addPlanNotesModel} = models;

exports.postPlans = async (req, res) => {
  try {
    const plans = await postPlansModel(req.params.trainer_uid, req.params.client_uid, req.body);
    res.status(200);
    res.send(plans);
  } catch (error) {
    res.status(500)
  }
};

exports.modifyPlans = async (req, res) => {
  try {
    const modifiedPlan = await modifyPlansModel(req.params.plan_id, req.body);
    res.status(200);
    res.send(modifiedPlan);
  } catch (error) {
    res.status(500);
  }
};

exports.getTrainerWorkouts = async (req, res) => {
  try {
    const trainerPlans = await getTrainerWorkoutsModel(req.params.trainer_uid, req.params.client_uid, req.params.start_date);
    res.status(200);
    res.send(trainerPlans);
  } catch (error) {
    res.status(500);
  }
};

exports.getClientPlans = async (req, res) => {
  try {
    const clientPlans = await getClientPlansModel(req.params.client_uid, req.params.start_date);
    res.status(200);
    res.send(clientPlans);
  } catch (error) {
    res.status(500);
  }
};

exports.addPlanNotes = async (req, res) => {
  try {
    const planNotes = await addPlanNotesModel(req.params.client_id, req.params.plan_id, req.body);
    res.status(200);
    res.send(planNotes);
  } catch (error) {
    res.status(500);
  }
};