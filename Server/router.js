const router = require('express').Router();
const { postUser, updateUser, getUser, postClient, getClients } = require('./controllers/userController');
const { postSession, modifySession, getSessions } = require('./controllers/sessionsController');
const { postPlans, modifyPlans, getTrainerPlans, getClientPlans, addPlanNotes } = require('./controllers/plansController');
const { getWorkouts, getExercises, postWorkouts, postExercises, storeExercises } = require('./controllers/exercisesController');

// re: users
router.post('/users', postUser);
router.put('/users/:uid', updateUser); // new route
router.get('/users/:uid-:type', getUser);
router.post('/clients/:trainer_uid-:client_uid', postClient);
router.get('/clients/:uid', getClients);

// re: sessions
router.post('/users/sessions/:trainer_uid-:client_uid', postSession);
router.put('/users/sessions/:meeting_id', modifySession);
router.get('/users/sessions/:type-:uid', getSessions);

// re: plans
router.post('/plans/:trainer_uid-:client_uid', postPlans);
router.put('/plans/:plan_id', modifyPlans);
// router.get('/plans/:trainer_uid-:client_uid-:start_date', getTrainerPlans);
router.get('/plans/:client_uid-:start_date', getClientPlans);
router.put('/planNotes/:plan_id', addPlanNotes);

// re: exercises
router.get('/plans/exGroups/:trainer_uid', getWorkouts);
router.get('/plans/exercises/:trainer_uid', getExercises);

// workouts
router.post('/workouts/:trainer_uid', postWorkouts);
router.post('/exercises/:trainer_uid', postExercises);

//for us to store into our DB
router.post('/defaultexercises', storeExercises);

module.exports = router;