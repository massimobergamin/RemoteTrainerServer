const { postSessionModel, getFilteredSessionsModel, modifySessionModel, getSessionsModel, getSessionModel } = require('../models/sessionsModel');

exports.postSession = async(req, res) => {
  try {
    let newSession = await postSessionModel(req.params.trainer_uid, req.params.client_uid, req.body);
    res.status(201).send(newSession);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.modifySession = async(req, res) => {
  try {
    let modifiedSession = await modifySessionModel(req.params.meeting_id, req.body);
    res.status(201).send(modifiedSession);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSessions = async(req, res) => {
  try {
    let allSessions = await getSessionsModel(req.params.type, req.params.uid);
    res.status(200).send(allSessions);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSession = async(req, res) => {
  try {
    let session = await getSessionModel(req.params.meeting_id);
    res.status(200).send(session);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getFilteredSessions = async(req,res) => {
  try {
    let filteredSessions = await getFilteredSessionsModel(req.params.uid);
    res.status(200).send(filteredSessions)
  } catch(err) {
    res.status(500).send(err);
  }
}
