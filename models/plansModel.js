const { User, Plan } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.postPlanModel = async (trainer_uid, client_uid, body) => {
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } });
  let client = await User.findOne({ where: { user_uid: client_uid } });

  const plans = await Plan.create({
    trainer_uid,
    client_uid,
    ...body
  });
  plans.addUsers([trainer, client]);
  return plans;
};

exports.modifyPlanModel = async (plan_id, body) => {
  const modified = await Plan.update(body, {
     where: {
       id: plan_id
     }
   });
  const modifiedPlan = await Plan.findOne({
    where: {
      id: plan_id
    }
  });
  return modifiedPlan;
};

exports.getClientPlansModel = async (client_uid, start_date) => {
  let userPlans = await Plan.findAll({ where: { client_uid, start_date: { [Op.gte]: +start_date } } });
  return userPlans;
};

exports.addPlanNotesModel = async (plan_id, body) => {
  const modified = await Plan.update(body,
    {
    where: {
      id: plan_id
    }
  });
  const modifiedPlan = await Plan.findOne({
    where: {
      id: plan_id
    }
  });
  return modifiedPlan;
};