const { postPlansModel, modifyPlansModel, getTrainerPlansModel, getClientPlansModel, addPlanNotesModel} = require('../models/plansModel');

exports.postPlans = async (req, res) => {
  try {

    const plans = await postPlansModel(req.params.trainer_uid, req.params.client_uid, req.body);
    res.status(200).send(plans);
  } catch (error) {
    console.log("inController", error);
    res.status(500).send(error);
  }
};

exports.modifyPlans = async (req, res) => {
  try {
    const modifiedPlan = await modifyPlansModel(req.params.plan_id, req.body);
    res.status(200).send(modifiedPlan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.getTrainerPlans = async (req, res) => {
//   try {
//     const trainerPlans = await getTrainerPlansModel(req.params.trainer_uid, req.params.client_uid, req.params.start_date);
//     res.status(200).send(trainerPlans);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

exports.getClientPlans = async (req, res) => {
  try {
    const clientPlans = await getClientPlansModel(req.params.client_uid, req.params.start_date);
    res.status(200).send(clientPlans);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addPlanNotes = async (req, res) => {
  console.log(req.params);
  try {
    const planNotes = await addPlanNotesModel(req.params.plan_id, req.body);
    res.status(200).send(planNotes);
  } catch (error) {
    res.status(500).send(error);
  }
};