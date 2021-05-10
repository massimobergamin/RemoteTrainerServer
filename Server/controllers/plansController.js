const { postPlanModel, modifyPlanModel, getClientPlansModel, addPlanNotesModel } = require('../models/plansModel');

exports.postPlan = async (req, res) => {
  try {
    const plans = await postPlanModel(req.params.trainer_uid, req.params.client_uid, req.body);
    res.status(200).send(plans);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.modifyPlan = async (req, res) => {
  try {
    const modifiedPlan = await modifyPlanModel(req.params.plan_id, req.body);
    res.status(200).send(modifiedPlan);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClientPlans = async (req, res) => {
  try {
    const clientPlans = await getClientPlansModel(req.params.client_uid, req.params.start_date);
    res.status(200).send(clientPlans);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addPlanNotes = async (req, res) => {
  try {
    const planNotes = await addPlanNotesModel(req.params.plan_id, req.body);
    res.status(200).send(planNotes);
  } catch (error) {
    res.status(500).send(error);
  }
};