// controllers/jobController.js
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// POST /api/jobs
export const postJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
};

// GET /api/jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// POST /api/jobs/:jobId/apply
export const applyToJob = async (req, res) => {
  try {
    const application = new Application({ ...req.body, jobId: req.params.jobId });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply' });
  }
};

// GET /api/jobs/:jobId/applications
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get applications' });
  }
};

// POST /api/jobs/:jobId/interview
export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, interviewDate, interviewLink } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, {
      interviewDate,
      interviewLink,
      status: 'Interview Scheduled',
    }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule interview' });
  }
};

// POST /api/jobs/:jobId/feedback
export const submitFeedback = async (req, res) => {
  try {
    const { applicationId, feedback } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, {
      feedback,
      status: 'Interview Completed',
    }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};
// PUT /api/jobs/:applicationId/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

