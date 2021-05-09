const { Sessions } = require('../db');

exports.postSessionModel = async(trainer_uid, client_uid, body) => {
  let newSession = await Sessions.create({ ...body, trainer_uid, client_uid });
  return newSession;
}

exports.modifySessionModel = async(meeting_id, body) => {
  let modifiedSession = await Sessions.update(body, { where: { meeting_id } });
  return modifiedSession;
}

exports.getSessionsModel = async(type, uid) => {
  let allSessions = type === 'trainer' ? await Sessions.findAll({ where: { trainer_uid: uid } }) :
    await Sessions.findAll({ where: { client_uid: uid } });
  return allSessions;
}