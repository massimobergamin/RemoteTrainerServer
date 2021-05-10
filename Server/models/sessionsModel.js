const { Session, User } = require('../db');

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

exports.postSessionModel = async(trainer_uid, client_uid, body) => {
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } });
  let client = await User.findOne({ where: { user_uid: client_uid } });
  let newSession = await Session.create({ ...body, trainer_uid, client_uid });
  await newSession.addUsers([trainer, client]);
  return newSession;
}

exports.modifySessionModel = async(meeting_id, body) => {
  let modifiedSession = await Session.update(body, { where: { meeting_id } });
  return modifiedSession;
}

exports.getSessionsModel = async(type, uid) => {
  let allSessions = type === 'trainer' ? await Session.findAll({ where: { trainer_uid: uid } }) :
    await Session.findAll({ where: { client_uid: uid } });
  return allSessions;
}