const { postUserModel, updateUserModel, getUserModel, postClientModel, getClientsModel } = require('../models/userModel');

exports.postUser = async(req, res) => {
  try {
    let newUser = await postUserModel(req.body);
    newUser.id ? res.status(201).send(newUser) : res.status(404).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updateUser = async(req, res) => {
  try {
    let updated = await updateUserModel(req.params.uid, req.body);
    updated.nModified ? res.status(201).send(updated) : res.status(404).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getUser = async(req, res) => {
  try {
    let user = await getUserModel(req.params.uid);
    user.id ? res.status(200).send(user) : res.status(404).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.postClient = async(req, res) => {
  try {
    let newClient = await postClientModel(req.params.trainer_uid, req.params.client_uid);
    newClient.id ? res.status(201).send(newClient) : res.status(404).send(newClient);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getClients = async(req, res) => {
  try {
    let clients = await getClientsModel(req.params.uid);
    clients.id ? res.status(200).send(clients) : res.status(404).send(clients);
  } catch (err) {
    res.status(500).send(err);
  }
}