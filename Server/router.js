const router = require('express').Router();
const { postUser, updateUser, getUser, postClient, getClients } = require('./controllers/userController');
const { postSession, modifySession, getSessions } = require('./controllers/sessionsController');
const { postPlan, modifyPlan, getClientPlans, addPlanNotes } = require('./controllers/plansController');
const { getWorkouts, getExercises, postWorkout, postExercise, storeExercise } = require('./controllers/exercisesController');

// re: users
router.post('/users', postUser);
router.put('/users/:uid', updateUser);
router.get('/users/:uid-:type', getUser);
router.post('/clients/:trainer_uid-:client_uid', postClient);
router.get('/clients/:uid', getClients);

// re: sessions
router.post('/users/sessions/:trainer_uid-:client_uid', postSession);
router.put('/users/sessions/:meeting_id', modifySession);
router.get('/users/sessions/:type-:uid', getSessions);

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

module.exports = router;