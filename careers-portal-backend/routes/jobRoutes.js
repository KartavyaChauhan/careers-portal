import express from 'express';
import {
  postJob,
  getAllJobs,
  applyToJob,
  getApplicationsByJob,
  scheduleInterview,
  submitFeedback,
  updateApplicationStatus,
  deleteJob,
  getAllJobsWithApplications,
  getJob,
  getAllApplications
} from '../controllers/jobController.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

const router = express.Router();

// Test route
router.get('/test/db', async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
    const applicationsCount = await Application.countDocuments();
    res.json({
      dbConnected: true,
      jobsCount,
      applicationsCount,
      message: 'Database connection successful'
    });
  } catch (error) {
    res.status(500).json({
      dbConnected: false,
      error: error.message
    });
  }
});

// Base routes
router.post('/', postJob);
router.get('/', getAllJobs);
router.get('/debug/all', getAllJobsWithApplications);
router.get('/debug/applications', getAllApplications);

// Job-specific routes
router.get('/:id', getJob);
router.delete('/:id', deleteJob);

// Application routes
router.get('/:jobId/applications', getApplicationsByJob);
router.post('/:jobId/apply', applyToJob);
router.put('/:applicationId/status', updateApplicationStatus);
router.post('/:jobId/interview', scheduleInterview);
router.post('/:jobId/feedback', submitFeedback);

export default router;
