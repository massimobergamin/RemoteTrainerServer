const { Users, Sessions, ClientPlans, Plans, TrainerClients } = require('../db');

exports.postUserModel = async(body) => {
  console.log(body);
  let newUser = await Users.create(body);
  console.log("new user", newUser);
  return newUser;
}

exports.getUserModel = async(uid) => {
  let user;
  user = await Users.findAll({ where: { user_uid: uid } });
  if (user.type === 'trainer') {
    let sessions = await Sessions.findAll({ where: { trainer_uid: uid } });
    user.sessions = sessions;
  }
  else {
    let clientPlans = await ClientPlans.findAll({ where: { client_uid: uid } });
    clientPlans.forEach(async (clientPlan) => {
      let plan = await Plans.findAll({ where: { id: clientPlan.id } });
      user.plans.push(plan);
    })
  }
  return user;
}

exports.postClientModel = async(trainer_uid, client_uid) => {
  let newRelationship = await TrainerClients.create({ trainer_uid, client_uid });
  return newRelationship;
}

exports.getClientsModel = async(uid) => {
  console.log('here in MODELL')
  let trainerClients = await TrainerClients.findAll({ where: { trainer_uid: uid } });
  console.log('after trainerClients')

  let uidArr = [];
  trainerClients.forEach((clientMatch) => uidArr.push(clientMatch.client_uid));
  let clientInfoArr = [];
  uidArr.forEach(async (uid, i) => {
    let user = await Users.findAll({ where: { user_uid: uid } });
    console.log('after users')

    clientInfoArr.push(user[0]);
    let clientPlans = await ClientPlans.findAll({ where: { client_uid: uid } });
    console.log('after clientplans')
    console.log('clientplans', clientPlans.length)

    clientPlans.forEach(async (clientPlan) => {
      console.log('after plans')
      let plan = await Plans.findAll({ where: { id: clientPlan.id } });

      clientInfoArr[i].plans.push(plan);
    })
    return clientInfoArr;
  })
}