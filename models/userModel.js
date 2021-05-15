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
   } else {
    user = await User.findOne({
      where: {user_uid: uid}, 
      include: {model: Plan}
    });
    // console.log(user);
    trainerInfo = await TrainerToClient.findOne({ where: { client_uid: uid } });
    // console.log(trainerInfo);
    user.dataValues.trainerInfo = trainerInfo ? trainerInfo.dataValues : {};
    user = user.dataValues;
  }
  return user;
}

exports.postClientModel = async(trainer_uid, client_uid) => {
  let newRelationship = await TrainerToClient.create({ trainer_uid, client_uid });
  return newRelationship;
}

exports.getAllUsersModel = async () => {
  const users = await User.findAll();
  return users;
}

exports.getClientsModel = async(uid) => {
  let trainerClients = await TrainerToClient.findAll({ where: { trainer_uid: uid } });
  console.log(trainerClients)
  let uidArr = trainerClients.map((relationship) => relationship=relationship.dataValues.client_uid);
  
  let results = await Promise.all(uidArr.map(async (client) => {
     let info = await User.findOne({
          where: { user_uid: client},
          include: {model:Plan}
        })
      return info.dataValues
  }))

  return results;
}

exports.postCodeModel = async(uid, body) => {
  let code = await Invite.create({ trainer_uid: uid, invite_code: body.invite_code });
  return code;
}

exports.getCodeModel = async(uid) => {
  let code = await Invite.findOne({ where: { trainer_uid: uid } });
  return code;
}

exports.getTrainerByCodeModel = async(code) => {
  let trainer = await Invite.findOne({ where: { invite_code: code }});
  console.log('getTrainerByCodeModel: ', trainer);
  return trainer;
}

