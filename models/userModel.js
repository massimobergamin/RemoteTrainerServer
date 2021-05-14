const { User, Session, Plan, TrainerToClient, Invite } = require('../db');

exports.postUserModel = async(body) => {
  let check = await User.findOne({where: { username: body.username } });
  if (check) return 'Username already in use.';
  else {
    let newUser = await User.create(body);
    return newUser;
  }
}

exports.updateUserModel = async(uid, body) => {
  let modified = await User.update(body, { where: { user_uid: uid }});
  let updatedUser = await User.findOne({ where: { user_uid: uid } });
  return updatedUser;
}

exports.getUserModel = async(uid, type) => {
  let user, trainerInfo;
   if (type === 'trainer') {
       user = await User.findOne({
         where: {user_uid: uid},
         include:{model: Session} 
      });
   }
  else {
    user = await User.findOne({
      where: {user_uid: uid}, 
      include: {model: Plan}
    });
    trainerInfo = await TrainerToClient.findOne({ where: { client_uid: uid } });
    user.dataValues.trainerInfo = trainerInfo.dataValues;
    user = user.dataValues;
  }
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
    let user = await User.findOne({
      where: { user_uid: uidArr[i] },
      include: {model:Plan}
    });
    clientInfoArr.push(user);
  }
  return clientInfoArr;
}

exports.postCodeModel = async(uid, body) => {
  let code = await Invite.create({ trainer_uid: uid, invite_code: body.invite_code });
  return code;
}

exports.getCodeModel = async(uid) => {
  let code = await Invite.findOne({ where: { trainer_uid: uid } });
  return code;
}