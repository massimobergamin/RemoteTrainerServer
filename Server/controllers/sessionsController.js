const { postSessionModel, modifySessionModel, getSessionsModel } = require('../models/sessionsModel');

exports.postSession = async(req, res) => {
  try {
    let newSession = await postSessionModel(req.params.trainer_uid, req.params.client_uid, req.body);
    newSession.id ? res.status(201).send(newSession) : res.status(404).send(newSession);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.modifySession = async(req, res) => {
  try {
    let modifiedSession = await modifySessionModel(req.params.meeting_id, req.body);
    modifiedSession.nModified ? res.status(201).send(modifiedSession) : res.status(404).send(modifiedSession);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getSessions = async(req, res) => {
  try {
    let allSessions = await getSessionsModel(req.params.type, req.params.uid);
    allSessions.nModified ? res.status(200).send(allSessions) : res.status(404).send(allSessions);
  } catch (err) {
    res.status(500).send(err);
  }
}