const router = require('express').Router();
const { postUser } = require('./controller');

// re: users
router.post('/users', postUser);
router.get('/users/:uid', getUser);
router.get('/clients/:uid', getClients);

// re: appointments
router.post('/users/appointments/:trainer_uid-:client_uid', postAppointment);
router.put('/users/appointments/:trainer_uid-:client_uid', modifyAppointment);
router.get('/users/appointments/:uid', getAppointments);

// re: plans
router.post('/plans/:trainer_uid-:client_uid', postPlans);
router.put('/plans/:trainer_uid-:client_uid-:plan_id', modifyPlans);
router.get('/plans/:trainer_uid-:client_uid-:start_date', getTrainerPlans);
router.get('/plans/:client_uid-:start_date', getClientPlans);
router.put('/plans/:client_uid-:plan_id', addPlanNotes);

// re: exercises
router.get('/plans/exGroups/:trainer_uid', getExGroups);
router.get('/plans/exercises/:trainer_uid', getExercises);

module.exports = router;