import express from 'express';
import {
  postJob,
  getAllJobs,
  applyToJob,
  getApplicationsByJob,
  scheduleInterview,
  submitFeedback,
  updateApplicationStatus, // ✅ Now imported
} from '../controllers/jobController.js';

const router = express.Router();

// Job-related routes
router.post('/create', postJob);
router.post('/', postJob);
router.get('/', getAllJobs);
router.post('/:jobId/apply', applyToJob);
router.get('/:jobId/applications', getApplicationsByJob);
router.post('/:jobId/interview', scheduleInterview);
router.post('/:jobId/feedback', submitFeedback);

// ✅ Application status update route
router.put('/jobs/:applicationId/status', updateApplicationStatus);

export default router;
