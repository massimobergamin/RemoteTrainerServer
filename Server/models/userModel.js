const { Users, Sessions, ClientPlans, Plans, TrainerClients } = require('../db');

exports.postUserModel = async(body) => {
  console.log(body);
  let newUser = await Users.create(body);
  return newUser;
}

exports.updateUserModel = async(uid, body) => {
  let modified = await Users.update(body, { where: { user_uid: uid }});
  return modified;
}

exports.getUserModel = async(uid) => {
  let user = await Users.findOne({ where: { user_uid: uid } });
  user = user.dataValues;

  if (user.type === 'trainer') {
    let sessions = await Sessions.findAll({ where: { trainer_uid: uid } });
    user.sessions = sessions;
  }
  else {
    let clientPlans = await ClientPlans.findAll({ where: { client_uid: uid } });
    for (let i = 0; i < clientPlans.length; i++) {
      let plan = await Plans.findAll({ where: { id: clientPlans[i].id } });
      user.plans = user.plans || [];
      user.plans.push(plan[0].dataValues);
    }
  }
  return user;
}

exports.postClientModel = async(trainer_uid, client_uid) => {
  let newRelationship = await TrainerClients.create({ trainer_uid, client_uid });
  return newRelationship;
}

exports.getClientsModel = async(uid) => {
  let trainerClients = await TrainerClients.findAll({ where: { trainer_uid: uid } });
  let uidArr = [];
  for (let i = 0; i < trainerClients.length; i++) {
    uidArr.push(trainerClients[i].dataValues.client_uid)
  }
  let clientInfoArr = [];

  for (let i = 0; i < uidArr.length; i++) {
    let user = await Users.findOne({ where: { user_uid: uidArr[i] } });

    clientInfoArr.push(user.dataValues);
    let clientPlans = await ClientPlans.findAll({ where: { client_uid: uidArr[i] } });

    for (let j = 0; j < clientPlans.length; j++) {
      let plan = await Plans.findOne({ where: { id: clientPlans[j].dataValues.plan_id } });
      clientInfoArr[i].plans = clientInfoArr[i].plans || [];
      clientInfoArr[i].plans.push(plan.dataValues);
    }
  }
  return clientInfoArr;
}