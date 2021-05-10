const { User, Session, Plan, TrainerToClient } = require('../db');

exports.postUserModel = async(body) => {
  let newUser = await User.create(body);
  return newUser;
}

exports.updateUserModel = async(uid, body) => {
  let modified = await User.update(body, { where: { user_uid: uid }});
  return modified;
}

// const amidala = await User.create({
//   username: 'p4dm3',
//   points: 1000,
//   profiles: [{
//     name: 'Queen',
//     User_Profile: {
//       selfGranted: true
//     }
//   }]
// }, {
//   include: Profile
// });

// const result = await User.findOne({
//   where: { username: 'p4dm3' },
//   include: Profile
// });

exports.getUserModel = async(uid, type) => {
  // let user = await Users.findOne({ where: { user_uid: uid } });
  // user = user.dataValues;
  let user;

  if (type === 'trainer')
    user = await User.findOne({ where: { user_uid: uid }, include: Session });
    // let sessions = await Sessions.findAll({ where: { trainer_uid: uid } });
    // user.sessions = sessions;
  else
    user = await User.findOne({ where: { user_uid: uid }, include: Plan });
    // let clientPlans = await ClientPlans.findAll({ where: { client_uid: uid } });
    // for (let i = 0; i < clientPlans.length; i++) {
    //   let plan = await Plans.findAll({ where: { id: clientPlans[i].id } });
    //   user.plans = user.plans || [];
    //   user.plans.push(plan[0].dataValues);
  return user;
}

exports.postClientModel = async(trainer_uid, client_uid) => {
  let newRelationship = await TrainerToClient.create({ trainer_uid, client_uid });
  return newRelationship;
}

exports.getClientsModel = async(uid) => {
  let trainerClients = await TrainerToClient.findAll({ where: { trainer_uid: uid } });
  let uidArr = [];
  for (let i = 0; i < trainerClients.length; i++) {
    uidArr.push(trainerClients[i].dataValues.client_uid)
  }
  let clientInfoArr = [];

  for (let i = 0; i < uidArr.length; i++) {
    // let user = await Users.findOne({ where: { user_uid: uidArr[i] } });
    let user = await User.findOne({ where: { user_uid: uidArr[i] }, include: Plan });
    clientInfoArr.push(user);

    // clientInfoArr.push(user.dataValues);
    // let clientPlans = await ClientPlans.findAll({ where: { client_uid: uidArr[i] } });

    // for (let j = 0; j < clientPlans.length; j++) {
    //   let plan = await Plans.findOne({ where: { id: clientPlans[j].dataValues.plan_id } });
    //   clientInfoArr[i].plans = clientInfoArr[i].plans || [];
    //   clientInfoArr[i].plans.push(plan.dataValues);
    // }
  }
  return clientInfoArr;
}