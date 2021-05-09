const { Plans, ClientPlans} = require('../db');

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

exports.getTrainerWorkoutsModel = async (trainer_uid, client_uid, start_date) => {
  const trainerPlans = await Plans.findAll({
    where: {
      trainer_uid,
      start_date
    }
  });

  //why client_uid?
  return trainerPlans;
};

exports.getClientPlansModel = async (client_uid, start_date) => {
  const clientPlans = await Plans.findAll({
    where: {
      client_uid,
      start_date
    }
  });

  return clientPlans;
};

exports.addPlanNotesModel = async (client_uid, plan_id, body) => {
  const updatedPlanNotes = await Plans.update({details: body}, 
    {
      where: {
        client_uid,
        plan_id
      }
  });

  return updatedPlanNotes;
};