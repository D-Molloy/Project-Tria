const router = require("express").Router();
const jobsController = require("../../controllers/jobsController");
const crewsController = require("../../controllers/crewsController");

// Matches with "/api/jobs"
router.route("/jobs")
  .get(jobsController.findAll)
  // .get(jobsController.findOpenJobs)
  .post(jobsController.create);


//all new routes/openjobs
//update jobs controller
//one get route API backend
//add the front end API  ->utils/API axios call
//
router.route("/openjobs")
.get(jobsController.findOpenJobs)

// Matches with "/api/jobs/:id"
router
  .route("/jobs")
  .get(jobsController.findAll)

// Matches with "/api/jobs/:id"
router
  .route("/jobs/:id")
  .get(jobsController.findById)
  .put(jobsController.update)
  .delete(jobsController.remove);

  // Matches with "/api/search/:crewName"
router
  .route("/search/:crewName")
  .get(jobsController.findJobByCrewName)
  // .put(jobsController.update)
  // .delete(jobsController.remove);

  // Matches with "/api/crews"
router.route("/crews")
  .get(crewsController.findAll)
  .post(crewsController.create);

// Matches with "/api/crews/:id"
router
  .route("/crews/:id")
  .get(crewsController.findById)
  .put(crewsController.update)
  .delete(crewsController.remove);

module.exports = router;
