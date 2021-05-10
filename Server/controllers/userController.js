const { postUserModel, updateUserModel, getUserModel, postClientModel, getClientsModel } = require('../models/userModel');

exports.postUser = async(req, res) => {
  try {
    let newUser = await postUserModel(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updateUser = async(req, res) => {
  try {
    let updated = await updateUserModel(req.params.uid, req.body);
    res.status(201).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getUser = async(req, res) => {
  try {
    let user = await getUserModel(req.params.uid, req.params.type);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.postClient = async(req, res) => {
  try {
    let newClient = await postClientModel(req.params.trainer_uid, req.params.client_uid);
    res.status(201).send(newClient);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getClients = async(req, res) => {
  try {
    let clients = await getClientsModel(req.params.uid);
    res.status(200).send(clients);
  } catch (err) {
    res.status(500).send(err);
  }
}