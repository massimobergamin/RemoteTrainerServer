const { Plans, ClientPlans } = require('../db');
const { Op } = require('sequelize');

exports.postPlansModel = async (trainer_uid, client_uid, body) => {

  const plans = await Plans.create({
    trainer_uid,
    ...body
  });

  const check = ClientPlans.create({
    client_uid,
    trainer_uid,
    plan_id: plans.dataValues.id
  });

  return plans;
};

exports.modifyPlansModel = async (plan_id, { details, start_date, end_date }) => {
  const plan =  await Plans.update({
     details: details,
     start_date: start_date,
     end_date: end_date
   }, {
     where: {
       id: plan_id
     }
   });
 return plan;
};

// exports.getTrainerPlansModel = async (trainer_uid, client_uid, start_date) => {

//   const trainerPlans = await Plans.findAll({
//     where: {
//       trainer_uid
//     }
//   });

//   //why client_uid?
//   return trainerPlans;
// };

//test again
exports.getClientPlansModel = async (client_uid, start_date) => {

  const clientPlans = await ClientPlans.findOne({
    where: {
      client_uid,
    }
  });

  const plan_id = clientPlans.dataValues.plan_id;

  const plan = await Plans.findAll({
    where: {
      id: plan_id
    }
  });

  return plan;
};

exports.addPlanNotesModel = async (client_uid, plan_id, body) => {
// we don't need client_uid because plan_id is unique
  const updatedPlanNotes = await Plans.update({
    details: body
  },
    {
    where: {
      id: plan_id
    }
  });

  return updatedPlanNotes;
};