const { postUserModel, getUserModel, postClientModel, getClientsModel } = require('../models/userModel');

exports.postUser = async(req, res) => {
  try {
    let newUser = await postUserModel(req.body);
    newUser.id ? res.status(201).send(newUser) : res.status(404).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.getUser = async(req, res) => {
  try {
    let user = await getUserModel(req.params.uid);
    user[0].id ? res.status(200).send(user) : res.status(404).send(user);
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
    console.log('here after await')
    let clients = await getClientsModel(req.params.uid);
    clients.id ? res.status(200).send(clients) : res.status(404).send(clients);
  } catch (err) {
    res.status(500).send(err);
  }
}