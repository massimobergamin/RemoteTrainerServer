const { Session, User, Measurement } = require('../db');

exports.postSessionModel = async (trainer_uid, client_uid, body) => {
  let trainer = await User.findOne({ where: { user_uid: trainer_uid } });
  let client = await User.findOne({ where: { user_uid: client_uid } });
  let newSession = await Session.create({ ...body, trainer_uid, client_uid });
  await newSession.addUsers([trainer, client]);
  return newSession;
}

exports.modifySessionModel = async (meeting_id, body) => {
  let modified = await Session.update(body, { where: { meeting_id } });
  let modifiedSession = await Session.findOne({ where: { meeting_id } });
  return modifiedSession;
}

exports.getSessionsModel = async (type, uid) => {
  let allSessions = type === 'trainer' ? await Session.findAll({ where: { trainer_uid: uid } }) :
    await Session.findAll({ where: { client_uid: uid } });
  return allSessions;
}

exports.getFilteredSessionsModel = async (uid, type) => {
  let sessions;
  if (type === "trainer") {
    sessions= await Session.findAll({
      where: {
        trainer_uid: uid,
      },
      include: { model: User}
    });
  } else {
    sessions= await Session.findAll({
      where: {
        client_uid: uid,
      },
      include: { model: User}
    });
  }
  let filteredSessions = sessions.filter((session)=> {
    return +new Date(session.dataValues.endDate) >= +new Date()
  });

  let sorted = filteredSessions.sort((a,b) => {
    return new Date(a.dataValues.startDate) - new Date(b.dataValues.startDate)
  });
  return sorted;
}

exports.deleteSessionModel = async (meetingid, uid, type) => {
  await Session.destroy({
    where: {
      meeting_id: meetingid
    }
  });

  return exports.getFilteredSessionsModel(uid, type);
}