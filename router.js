const router = require('express').Router();
const { postUser, getAllUsers, updateUser, getUser, postClient, getClients, postCode, getCode, getTrainerByCode } = require('./controllers/userController');
const { postSession, getFilteredSessions, modifySession, getSessions, getSession, deleteSession } = require('./controllers/sessionsController');
const { postPlan, modifyPlan, getClientPlans, addPlanNotes } = require('./controllers/plansController');
const { getWorkouts, getExercises, postWorkout, postExercise, storeExercise } = require('./controllers/exercisesController');

// re: users
router.post('/users', postUser);
router.get('/getallusers', getAllUsers)
router.put('/users/:uid', updateUser);
router.get('/users/:uid-:type', getUser);
router.post('/clients/:trainer_uid-:client_uid', postClient);
router.get('/clients/:uid', getClients);
router.post('/users/invite/:uid', postCode); // added
router.get('/users/invite/:uid', getCode); // added
router.get('/users/client/invite/:code', getTrainerByCode);

// re: sessions
router.post('/users/sessions/:trainer_uid-:client_uid', postSession);
router.put('/users/sessions/:meeting_id', modifySession);
router.get('/users/sessions/:type-:uid', getSessions);
router.get('/users/sessions/:meeting_id', getSession);
router.get('/users/sessions/filtered/:uid/:type', getFilteredSessions)
router.delete('/users/sessions/:meeting_id', deleteSession);

// re: plans
router.post('/plans/:trainer_uid-:client_uid', postPlan);
router.put('/plans/:plan_id', modifyPlan);
router.get('/plans/:client_uid-:start_date', getClientPlans);
router.put('/plans/notes/:plan_id', addPlanNotes);

// re: workouts and exercises
router.get('/workouts/:trainer_uid', getWorkouts);
router.get('/exercises/:trainer_uid', getExercises);
router.post('/workouts/:trainer_uid', postWorkout);
router.post('/exercises/custom/:trainer_uid', postExercise);

// for us to store exercises into our DB
router.post('/exercises/general', storeExercise);

module.exports = router