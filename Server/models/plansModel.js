const { User, Plan } = require('../db');

exports.postPlansModel = async (trainer_uid, client_uid, body) => {
  console.log("plans");
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } });
  let client = await User.findOne({ where: { user_uid: client_uid } });

  const plans = await Plan.create({
    trainer_uid,
    client_uid,
    ...body
  });
  plans.addUsers([trainer, client]);
  // const check = ClientPlans.create({
  //   client_uid,
  //   trainer_uid,
  //   plan_id: plans.dataValues.id
  // });

  return plans;
};

exports.modifyPlansModel = async (plan_id, body) => {
  const plan =  await Plan.update(body, {
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

  // const clientPlans = await ClientPlans.findOne({
  //   where: {
  //     client_uid,
  //   }
  // });

  // const plan_id = clientPlans.dataValues.plan_id;

  // const plan = await Plans.findAll({
  //   where: {
  //     id: plan_id
  //   }
  // });

  let userPlans = await Plan.findAll({ where: { client_uid } }); // need to figure out start_date

  return userPlans;
};

exports.addPlanNotesModel = async (plan_id, body) => {
  // we don't need client_uid because plan_id is unique
  const updatedPlanNotes = await Plan.update(body,
    {
    where: {
      id: plan_id
    }
  });

  return updatedPlanNotes;
};